<template>
    <div class="stepper__container column">
        <div
            v-for="(step, idx) in visibleSteps()"
            :key="idx"
            :class="['step-container', step.name, step.status, { disabled: !step.enabled }]"
        >
            <div
                class="step-header"
                :class="step.status"
                tabindex="0"
                @click="setActiveStep(step.id)"
                @keyup.13="setActiveStep(step.id)"
            >
                <h5 class="step-header__title b-header">
                    {{ $t(stepHeaderText(step)) }}
                </h5>
                <div
                    v-if="step.status === 'completed'"
                    class="step-header__caption"
                >
                    {{ $t(completedStepCaption(step)) }}
                </div>
            </div>
            <div
                v-if="step.status==='active'"
                class="step-content"
            >
                <component
                    :is="stepActionComponent(step)"
                    v-if="step.status === 'active'"
                    v-bind="step"
                    @change="changeStepSelected"
                />
            </div>
            <StepNavigation
                v-if="step.status === 'active'"
                :step-name="step.name"
                :is-next-enabled="isNextEnabled(step.id)"
                @navigate="navigate"
            />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ChooserStep from './ChooserStep'
import AttributionDetailsStep from './AttributionDetailsStep'
import CopyrightWaiverStep from './CopyrightWaiverStep'
import DropdownStep from './DropdownStep'
import StepNavigation from './StepNavigation'
import { updateVisibleEnabledStatus } from '../utils/license-utilities'

export default {
    name: 'Stepper',
    components: {
        ChooserStep,
        AttributionDetailsStep,
        CopyrightWaiverStep,
        DropdownStep,
        StepNavigation
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
             * status: can be set to 'active', 'completed', or 'inactive', to show the user's
             * progress in Stepper
             *
             * selected: set to undefined before the user interacts with a step; true/false after
             * user selects radio buttons/ checkboxes/ etc.
             */
            steps: [
                { id: 0, name: 'FS', visible: true, enabled: true, status: 'active', selected: undefined },
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
        ...mapGetters(['fullName']),
        activeStepId: {
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
                    const { id, name, selected } = this.steps[step]
                    const isAttrSelected = state.currentLicenseAttributes[name]
                    if (this.isLicenseAttribute(name) && selected !== isAttrSelected) {
                        this.$set(this.steps, id, { ...this.steps[id], selected: isAttrSelected })
                        this.updateDisabledAndVisibleSteps(name, isAttrSelected)
                    }
                }
            }
        })
    },
    methods: {
        stepActionComponent({ name }) {
            switch (name) {
            case 'CW': return CopyrightWaiverStep
            case 'DD': return DropdownStep
            case 'AD': return AttributionDetailsStep
            default: return ChooserStep
            }
        },
        /**
         * stepHeader shows step 'question' for active step, and step 'heading' for others
         * @returns {string} key for i18n message
         */
        stepHeaderText({ name, status }) {
            const prefix = `stepper.${name}`
            if (name === 'AD') {
                return prefix + '.heading'
            }
            return status === 'active' ? `${prefix}.question` : `${prefix}.heading`
        },
        completedStepCaption({ id, name, enabled, selected, reversed }) {
            if (name === 'DD') {
                return this.fullName
            } else if (['FS', 'CW'].includes(name)) {
                return selected ? `stepper.${name}.selected` : `stepper.${name}.not-selected`
            } else if (enabled === false) {
                return (this.steps[id].disabledDue === 'ND')
                    ? 'stepper.disabled-text-ND'
                    : 'stepper.disabled-text'
            } else {
                const qualifier = reversed ? !selected : selected
                const prefix = `stepper.${name}.${qualifier ? '' : 'not-'}`
                return `${prefix}selected`
            }
        },
        isLicenseAttribute(stepName) {
            return ['BY', 'NC', 'ND', 'SA'].indexOf(stepName) > -1
        },
        /**
         * NC, ND and SA steps are reversed: unlike BY, they are selected when the user
         * answers no, and not selected when the user answers yes
         * @param {String} stepName
         * @returns {boolean}
         */
        isStepReversed(stepName) {
            return ['NC', 'ND', 'SA'].indexOf(stepName) > -1
        },
        /**
         * Checks if the Next button should be disabled. Next button is enabled only
         * after the user has interacted with the step (selected radio or checked a checkbox)
         * @param {number} id
         * @returns {Boolean} next button's disabled status
         */
        isNextEnabled(id) {
            return this.steps[id].selected !== undefined
        },

        navigate({ direction, name }) {
            // Back and next
            direction === 'next' ? this.handleNext(name) : this.handlePrevious()
        },
        /**
         * When a user interacts with a step, updates:
         * 1. 'selected' property for the step in steps array
         * 2. if the step is for license attribute, its value in Vuex store
         * 3. 'enabled' and 'visible' properties of other steps affected by active step selection
         * @param {String} stepName
         * @param {Number} id
         * @param {Boolean} selected
         */
        changeStepSelected({ name, id, selected }) {
            if (this.isLicenseAttribute(name)) {
                this.$store.commit('setSelected', { name, selected })
                // When the user first selects a license attribute, the dropdown step's Next button should be enabled
                // as the dropdown will be populated with the selected license from the state
                const DROPDOWN_STEP = 5
                if (this.steps[DROPDOWN_STEP].selected === undefined && name === 'BY') {
                    this.$set(this.steps, DROPDOWN_STEP, { ...this.steps[DROPDOWN_STEP], selected: true })
                }
            }
            this.$set(this.steps, id, { ...this.steps[id], selected: selected })
            this.updateDisabledAndVisibleSteps()
        },
        handleNext(name) {
            /**
             * Updates state when 'Next' button is clicked if active step has been interacted with
             *
             * Finds the next available enabled and visible step, sets its status to 'active',
             * and steps before that to 'completed'
             */
            const id = this.activeStepId
            const stepSelected = this.steps[id].selected
            if (stepSelected === undefined && id <= 6) return
            const nextStep = this.steps.slice(id + 1).find(step => step.visible && step.enabled).id
            this.$set(this.steps, id, { ...this.steps[id], status: 'completed' })
            if (nextStep - id > 1) {
                for (let i = id + 1; i < nextStep; i++) {
                    this.$set(this.steps, i, { ...this.steps[i], status: 'completed', disabledDue: name })
                }
            } else {
                this.$set(this.steps, id, { ...this.steps[id], status: 'completed' })
            }
            this.$set(this.steps, nextStep, { ...this.steps[nextStep], status: 'active' })
            this.activeStepId = nextStep
        },
        handlePrevious() {
            /**
             * Updates state when 'Previous' button
             *
             * Finds the previous enabled and visible step, sets its status to 'active',
             * and steps after that to 'inactive'
             */

            let previousStep = this.activeStepId
            for (let i = this.activeStepId - 1; i >= 0; i--) {
                const thisStep = this.steps[i]
                if (thisStep.visible && thisStep.enabled) {
                    previousStep = this.steps[i].id
                    break
                }
            }
            if (this.activeStepId - previousStep > 1) {
                for (let i = this.activeStepId; i > previousStep; i--) {
                    this.$set(this.steps, i, { ...this.steps[i], status: 'inactive' })
                }
            } else {
                this.$set(this.steps, this.activeStepId, { ...this.steps[this.activeStepId], status: 'inactive' })
            }
            this.$set(this.steps, previousStep, { ...this.steps[previousStep], status: 'active' })
            this.activeStepId = previousStep
        },
        setActiveStep(clickedStepId) {
            /**
             * Handles a click on Step header
             */
            if (!this.steps[clickedStepId].enabled) return
            if (this.steps[clickedStepId].status === 'inactive') return
            // only steps before the active one are clickable
            if (clickedStepId >= this.activeStepId) return
            for (let i = this.activeStepId; i > clickedStepId; i--) {
                this.$set(this.steps, i, { ...this.steps[i], status: 'inactive' })
            }
            this.$set(this.steps, clickedStepId, { ...this.steps[clickedStepId], status: 'active' })
            this.activeStepId = clickedStepId
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
            const shouldSetEnabled = (step) => stepsToSetEnabled.indexOf(step.name) > -1 && !step.enabled
            const shouldSetDisabled = (step) => stepsToSetEnabled.indexOf(step.name) === -1 && step.enabled
            this.steps.forEach((step) => {
                // step is currently enabled, but should be disabled
                if (shouldSetDisabled(step)) {
                    this.$set(this.steps, step.id, { ...step, enabled: false, disabledDue: disabledDue })
                } else if (shouldSetEnabled(step)) {
                    // step is currently disabled, but should be set enabled
                    this.$set(this.steps, step.id, { ...step, enabled: true, disabledDue: '' })
                }
            })
        },
        updateDisabledAndVisibleSteps() {
            /**
             * Creates an array of steps that should be visible/enabled based on data from steps array
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

<style lang="scss">
    .step-container {
        background-color: white;
        border: 0.125rem solid #d8d8d8;
        border-bottom: none;
        max-width: 100%;
        position: relative;
        --counter-size: 1.875rem;
        --h-padding: 1.5rem;
        --step-left-padding: calc(var(--h-padding) + var(--counter-size) + 1rem);
        &:last-of-type {
            border-bottom: 2px solid #d8d8d8;
            margin-bottom: 15rem;
         }
    }
    .step-container.completed:not(.disabled):hover {
        border: 0.125rem solid #b0b0b0;
        & .step-content {
            cursor: pointer;
        }
    }
    .step-container.completed:not(.disabled):hover + .step__container {
        border-top: none;
    }
    .step-header {
        background-color: transparent;
        display: flex;
        flex-direction: column;
        position:relative;
        padding: 1.5625rem 1.5rem 0.5rem var(--step-left-padding);

        &:not(.inactive):hover, &:not(.disabled):hover {
            cursor: pointer;
        }
        &.completed {
            padding-bottom: 1.5rem;
            &.completed:focus, &.completed:active {
                outline: none;
                transform: translateY(1px);
                box-shadow: 2px -2px 0 2px rgba(176, 176, 176, 0.2), -2px -2px 0 2px rgba(176, 176, 176, 0.2);
            }
        }
        &.inactive {
            padding-bottom: 1.5rem;
            &:hover {
                cursor: default;
            }
        }

    }
    .step-header__title::before{
        content: counter(step-counter);
        counter-increment: step-counter;
        position: absolute;
        left: var(--h-padding);
        top: 1.375rem;
        width: var(--counter-size);
        height: var(--counter-size);
        line-height: var(--counter-size);
        font-weight: bold;
        font-family: inherit;
        font-size: 1rem;background: #04A635;
        border-radius: 50%;
        text-align: center;
        color: #fff;
    }
    .step-header__title.completed.disabled::before,
    .step-header__title.inactive::before {
        background-color: #d8d8d8;
        color: #333333;
    }
    .step-header__caption {
        color: #333333;
        &:focus {
            outline: none;
        }
    }
    .step-content {
        padding: 0.5rem 1.5rem 0.5rem var(--step-left-padding);
    }
    .step__actions {
        &:focus {
            outline: none;
            background-color:green;
        }
    }
    .step__container.completed {
        .step-header__title {
            color: black;
            background-color: #fff;
        }
    }
    .step-header.active,
    .step-header.completed {

    }
    .inactive {
        background-color: #F5F5F5;
    }
    .completed.disabled {
        color: #b0b0b0;
    }
    .completed.disabled .step-header__title,
    .inactive .step-header__title
    {
        color: #b0b0b0;
    }
    .inactive .step-header__title::before {
        background: #d8d8d8;
        color: #333333;
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
        .step-container:last-of-type {
            margin-bottom: 1rem;
        }
    }
</style>
