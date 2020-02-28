<template>
    <div class="column vertical-stepper-container">
        <div
            v-for="(step, idx) in visibleSteps()"
            :key="idx"
            :class="['stepper-card', step.status, enabledQualifier(step.enabled)]"
        >
            <div
                :class="['stepper-card-header']"
                @click="setActiveStep(step.id)"
            >
                <h5 class="vocab hb h5b stepper-header-h5">
                    {{ $t(stepHeaderText(step.name, step.status)) }}
                </h5>
            </div>
            <div
                v-if="step.status!=='inactive'"
                :class="['step-card-content', step.status]"
            >
                <FirstStep
                    v-if="step.name==='FS'"
                    :step-id="step.id"
                    :selected="step.selected"
                    :status="step.status"
                    @change="changeStepSelected"
                />
                <Step
                    v-else-if="isLicenseAttribute(step.name)"
                    :step-id="step.id"
                    :step-name="step.name"
                    :selected="step.selected"
                    :status="step.status"
                    :reversed="isStepReversed(step.name)"
                    :enabled="step.enabled"
                    :disabled-due="step.disabledDue"
                    @change="changeStepSelected"
                />
                <CopyrightWaiverStep
                    v-if="step.name==='CW'"
                    :step-id="step.id"
                    :step-name="step.name"
                    :selected="step.selected"
                    :status="step.status"
                    @change="changeStepSelected"
                />
                <DropdownStep
                    v-else-if="step.name==='DD'"
                    :step-id="step.id"
                    :status="step.status"
                    @input="changeStepSelected"
                />
                <AttributionDetailsStep
                    v-else-if="step.name==='AD'"
                    :step-id="step.id"
                    :status="step.status"
                />
                <nav
                    v-if="step.status==='current'"
                    class="step-navigation"
                >
                    <a
                        v-if="step.name!=='FS'"
                        role="button"
                        class="pagination-previous"
                        @click="handlePrevious(step.name)"
                    >{{ $t('stepper.nav.previous-label') }}</a>
                    <a
                        v-if="step.name!=='AD'"
                        role="button"
                        :class="['pagination-next', nextButtonEnabledState(step.id)]"
                        @click="handleNext(step.name)"
                    >{{ $t('stepper.nav.next-label') }}</a>
                    <a
                        v-else
                        role="button"
                        class="pagination-next"
                        @click="handleFinish()"
                    >{{ $t('stepper.nav.finish-label') }}</a>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
import Step from './Step'
import FirstStep from './FirstStep'
import AttributionDetailsStep from './AttributionDetailsStep'
import CopyrightWaiverStep from './CopyrightWaiverStep'
import DropdownStep from './DropdownStep'
import { updateVisibleEnabledStatus } from '../utils/license-utilities'

export default {
    name: 'Stepper',
    components: {
        FirstStep,
        Step,
        AttributionDetailsStep,
        CopyrightWaiverStep,
        DropdownStep
    },
    props: {
        value: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            /** Data for 7 Stepper steps
             * FS: First step, checks if user knows the license (and we need to open the dropdown)
             * BY, NC, ND, SA: license attribute selection steps
             * DD: Step with Dropdown for quick license selection, opens if user knows the license
             * CW: Copyright waiver step for CC0 if the user selects NO on BY step
             * AD: Attribution Details step with the form
             *
             * Properties:
             * visible: sets whether the step should be shown or not. Eg. if BY is selected,
             * Copyright Waiver should not be shown, as the user will not waive copyright
             *
             * enabled: sets whether the step can be clicked/selected.
             * Eg. SA shouldn't be selectable if ND was selected
             *
             * status: can be set to 'current', 'previous', or 'inactive', to show the user's
             * progress in Stepper
             *
             * selected: set to undefined before the user interacts with a step; true/false after
             * user selects radio buttons/ checkboxes/ etc.
             */
            steps: [
                { id: 0, name: 'FS', visible: true, enabled: true, status: 'current', selected: undefined },
                { id: 1, name: 'BY', visible: true, enabled: true, status: 'inactive', selected: undefined },
                { id: 2, name: 'NC', visible: true, enabled: true, status: 'inactive', selected: undefined },
                { id: 3, name: 'ND', visible: true, enabled: true, status: 'inactive', selected: undefined },
                { id: 4, name: 'SA', visible: true, enabled: true, status: 'inactive', selected: undefined },
                { id: 5, name: 'DD', visible: false, enabled: true, status: 'inactive', selected: undefined },
                { id: 6, name: 'CW', visible: false, enabled: true, status: 'inactive', selected: undefined },
                { id: 7, name: 'AD', visible: true, enabled: true, status: 'inactive', selected: undefined }
            ]
        }
    },
    computed: {
        currentStepId: {
            get() { return this.$props.value },
            set(newVal) {
                this.$emit('input', newVal)
            }
        }
    },
    created: function() {
        /**
         * Updates the steps array when license is changed in store through dropdown selection
         */
        this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'updateAttributesFromShort') {
                for (const step in this.steps) {
                    const stepId = this.steps[step].id
                    const stepName = this.steps[step].name
                    const isStepSelected = this.steps[step].selected
                    const isAttrSelected = state.currentLicenseAttributes[stepName]
                    if (this.isLicenseAttribute(stepName) && isStepSelected !== isAttrSelected) {
                        this.$set(this.steps, stepId, { ...this.steps[stepId], selected: isAttrSelected })
                        this.updateDisabledAndVisibleSteps(stepName, isAttrSelected)
                    }
                }
            }
        })
    },
    methods: {
        /**
         * stepHeader shows step 'question' for current step, and step 'heading' for others
         * @returns {string} key for i18n message
         */
        stepHeaderText(stepId, stepStatus) {
            const prefix = `stepper.${stepId}`
            if (stepId === 'AD') {
                return prefix + '.heading'
            }
            return stepStatus === 'current' ? `${prefix}.question` : `${prefix}.heading`
        },
        enabledQualifier(isEnabled) {
            return isEnabled ? 'enabled' : 'disabled'
        },
        isLicenseAttribute(stepName) {
            return ['BY', 'NC', 'ND', 'SA'].indexOf(stepName) > -1
        },
        isStepReversed(stepName) {
            /**
             * NC, ND and SA steps are reversed: unlike BY, they are selected when the user
             * answers no, and not selected when the user answers yes
             */
            return ['NC', 'ND', 'SA'].indexOf(stepName) > -1
        },
        nextButtonEnabledState(stepId) {
            /**
             * Disables the 'Next' button before the user interacts with the step
             */
            return this.steps[stepId].selected === undefined
                ? 'disabled'
                : ''
        },
        changeStepSelected(stepName, stepId, isSelected) {
            /**
             * When a user interacts with a step, updates:
             * 1. 'selected' property for the step in steps array
             * 2. if the step is for license attribute, its value in Vuex store
             * 3. 'enabled' and 'visible' properties of other steps affected by current step selection
             */
            if (this.isLicenseAttribute(stepName)) {
                this.$store.commit('setSelected', { stepName, isSelected })
                // When the user first selects a license attribute, the dropdown step's Next button should be enabled
                // as the dropdown will be populated with the selected license from the state
                const DROPDOWNSTEP = 5
                if (this.steps[DROPDOWNSTEP].selected === undefined && stepName === 'BY') {
                    this.$set(this.steps, DROPDOWNSTEP, { ...this.steps[DROPDOWNSTEP], selected: true })
                }
            }
            this.$set(this.steps, stepId, { ...this.steps[stepId], selected: isSelected })
            this.updateDisabledAndVisibleSteps()
        },
        handleNext(stepName) {
            /**
             * Updates state when 'Next' button is clicked if current step has been interacted with
             *
             * Finds the next available enabled and visible step, sets its status to 'current',
             * and steps before that to 'previous'
             */
            const stepSelected = this.steps[this.currentStepId].selected
            if (stepSelected === undefined && this.currentStepId <= 6) return
            const nextStep = this.steps.slice(this.currentStepId + 1).find(step => step.visible && step.enabled).id
            this.$set(this.steps, this.currentStepId, { ...this.steps[this.currentStepId], status: 'previous' })
            if (nextStep - this.currentStepId > 1) {
                for (let i = this.currentStepId + 1; i < nextStep; i++) {
                    this.$set(this.steps, i, { ...this.steps[i], status: 'previous', disabledDue: stepName })
                }
            } else {
                this.$set(this.steps, this.currentStepId, { ...this.steps[this.currentStepId], status: 'previous' })
            }
            this.$set(this.steps, nextStep, { ...this.steps[nextStep], status: 'current' })
            this.currentStepId = nextStep
        },
        handlePrevious() {
            /**
             * Updates state when 'Previous' button
             *
             * Finds the previous enabled and visible step, sets its status to 'current',
             * and steps after that to 'inactive'
             */

            let previousStep = this.currentStepId
            for (let i = this.currentStepId - 1; i >= 0; i--) {
                const thisStep = this.steps[i]
                if (thisStep.visible && thisStep.enabled) {
                    previousStep = this.steps[i].id
                    break
                }
            }
            if (this.currentStepId - previousStep > 1) {
                for (let i = this.currentStepId; i > previousStep; i--) {
                    this.$set(this.steps, i, { ...this.steps[i], status: 'inactive' })
                }
            } else {
                this.$set(this.steps, this.currentStepId, { ...this.steps[this.currentStepId], status: 'inactive' })
            }
            this.$set(this.steps, previousStep, { ...this.steps[previousStep], status: 'current' })
            this.currentStepId = previousStep
        },
        handleFinish() {
            // TODO: write the method
        },
        setActiveStep(clickedStepId) {
            /**
             * Handles a click on Step header
             */
            if (!this.steps[clickedStepId].enabled) return
            if (this.steps[clickedStepId].status === 'inactive') return
            if (clickedStepId > this.currentStepId) {
                for (let i = this.currentStepId; i < clickedStepId; i++) {
                    this.$set(this.steps, i, { ...this.steps[i], status: 'previous' })
                }
                this.$set(this.steps, clickedStepId, { ...this.steps[clickedStepId], status: 'current' })
            } else {
                for (let i = this.currentStepId; i > clickedStepId; i--) {
                    this.$set(this.steps, i, { ...this.steps[i], status: 'inactive' })
                }
                this.$set(this.steps, clickedStepId, { ...this.steps[clickedStepId], status: 'current' })
            }
            this.currentStepId = clickedStepId
        },
        setStepsVisible(stepsToSetVisible) {
            // sets steps in stepsToSetVisible array visible properties to true
            this.steps.forEach((step) => {
                if (stepsToSetVisible.indexOf(step.name) > -1 && !step.visible) {
                    this.$set(this.steps, step.id, { ...step, visible: true })
                } else if (stepsToSetVisible.indexOf(step.name) === -1 && step.visible) {
                    this.$set(this.steps, step.id, { ...step, visible: false })
                }
            })
        },
        setStepsEnabled(stepsToSetEnabled, disabledDue) {
            // sets steps in stepsToSetDisabled array enabled properties to false
            this.steps.forEach((step) => {
                // step is currently enabled, but should be disabled
                if (stepsToSetEnabled.indexOf(step.name) === -1 && step.enabled) {
                    this.$set(this.steps, step.id, { ...step, enabled: false, disabledDue: disabledDue })
                } else if (stepsToSetEnabled.indexOf(step.name) > -1 && !step.enabled) {
                    // step is currently disabled, but should be set enabled
                    this.$set(this.steps, step.id, { ...step, enabled: true, disabledDue: '' })
                }
            })
        },
        updateDisabledAndVisibleSteps() {
            /**
             * Creates an array of steps that should be visible/enalbed based on data from steps array
             * and updates the steps array
             */
            const stepsStatusData = {}
            this.steps.forEach((step) => {
                stepsStatusData[step.name] = step.selected
            })
            const { visible, enabled, disabledDue } = updateVisibleEnabledStatus(stepsStatusData)
            this.setStepsVisible(visible)
            this.setStepsEnabled(enabled, disabledDue)
        },
        visibleSteps() {
            return this.steps.filter(step => {
                return step.visible
            })
        }
    }
}
</script>

<style>
    .step-navigation .pagination-previous {
        border: 2px solid #787878;
        color: #787878;
    }
    .pagination-next {
        background-color: #04a635;
        color: #fff!important;
        font-family: Roboto Condensed,sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 24px;
    }
    .stepper-card {
        background-color: white;
        border: 2px solid  #D8D8D8;
        border-bottom: none;
        border-radius: 4px;
        max-width: 100%;
        position: relative;
        padding-bottom: 8px;
    }
    .stepper-card:last-of-type {
        border-bottom: 2px solid #D8D8D8;
        margin-bottom: 15rem;
    }
    .stepper-card-header {
        background-color: transparent;
        -webkit-box-align: stretch;
        align-items: stretch;
        display: -webkit-box;
        display: flex;
        position:relative;
        margin: 24px 24px 8px;
    }
    .stepper-card-header:hover {
        cursor: pointer;
    }
    .stepper-card-header .stepper-header-h5 {
        margin-left: 45px;
    }
    .stepper-header-h5::before{
        counter-increment: step-counter;
        position: absolute;
        left: 0;
        display: inline-block;
        font-weight: 700;
        font-family: inherit;
        content: counter(step-counter);
        font-size: 16px;
        width: 30px;
        height: 30px;
        line-height: 30px;
        background: #04A635;
        border-radius: 50%;
        text-align: center;
        color: #fff;
        top: 0;
    }
    .previous.disabled .stepper-header-h5::before,
    .inactive .stepper-header-h5::before {
        background-color: #D8D8D8;
        color: #333333;
    }
    .stepper-instructions {
        margin-bottom: 14px;
    }
    .step-card-content {
        margin-left: 69px;
        padding-bottom:8px;
        padding-right: 24px;
    }
    .step-description {
        color: #333333;
    }
    .current,
    .previous {
        color: black;
    }
    .previous.disabled {
        color: #B0B0B0;
    }
    .previous.disabled .vocab-h5b,
    .inactive .vocab.h5b {
        color: #B0B0B0;
    }
    .step-navigation {
        margin: 13px 0 13px -4px;
    }
    .pagination-next {
        background-color: #04A635;
        color: white!important;
        font-family: Roboto Condensed,sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 24px;
    }
    .pagination-next.disabled {
        background-color: #D8D8D8;
    }
    .pagination-next.disabled:hover,
    .pagination-next.disabled:active {
        box-shadow: none;
        border: 1px solid transparent;
    }
    .slide-enter-active {
        /*transition: all .3s ease;*/
    animation: slide-down .3s;
}
    .slide-leave-active {
        /*transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);*/
        animation: slide-down .5s reverse;
    }
    /*.slide-enter, .slide-leave-to {*/
    /*    transform: translateY(-50px);*/
    /*    opacity: 0;*/
    /*}*/
    @keyframes slide-down {
        0% {
            opacity: 0;
            transform: translateY(-100px);
        }

        /*50% {*/
        /*    transform: scaleY(0.5);*/
        /*}*/

        100% {
            opacity: 1;
            transform: translateY(0px);
            /*transform: scaleY(1);*/
        }
    }
    @media (max-width: 860px) {
        .stepper-card:last-of-type {
            margin-bottom: 1rem;
        }
    }
</style>
