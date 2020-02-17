<template>
<div class="column vertical-stepper-container">
    <div :class="['stepper-card', step.status, enabledQualifier(step.enabled)]"
         v-for="(step, idx) in visibleSteps()"
         :key="idx">
        <div :class="['stepper-card-header']"
            @click="setActiveStep(step.id)">
            <h5 class="vocab hb h5b stepper-header-h5">{{$t(headerText(step.name, step.status))}}</h5>
        </div>
        <div :class="['step-card-content', step.status]"
             v-if="step.status!=='inactive'">
            <FirstStep
                v-if="step.name==='FS'"
                :step-id="step.id"
                :selected="step.selected"
                @change="changeFirstStep"
                :status="step.status"
            />
            <Step
                v-if="isLicenseAttribute(step.name)"
                :step-id="step.id"
                :selected="step.selected"
                :status="step.status"
                :stepName="step.name"
                @change="changeStepSelected"
            />
            <CopyrightWaiverStep
                v-if="step.name==='CW'"
                :step-id="step.id"
            />
            <DropdownStep
                v-if="step.name==='DD'"
                :step-id="step.id"
                :status="step.status"
                />
            <AttributionDetails
                v-if="step.name==='AD'"
                :step-id="step.id"
                :status="step.status"
            />
            <nav class="step-navigation" v-if="step.status==='current'">
                <a role="button" class="pagination-previous"
                   v-if="step.name!=='FS'"
                   @click="handlePrevious(step.name)">{{$t('step.previous-label')}}</a>
                <a role="button"
                   v-if="step.name!=='AD'"
                   :class="['pagination-next', nextButtonDisabled(step.id)]"
                   @click="handleNext(step.name)"
                >{{$t('step.next-label')}}</a>
                <a role="button" class="pagination-next"
                   v-else
                   @click="handleFinish()">{{$t('step.finish')}}</a>
            </nav>
        </div>
    </div>
</div>
</template>

<script>
import Step from './Step'
import FirstStep from './FirstStep'
import AttributionDetails from './AttributionDetails'
import CopyrightWaiverStep from './CopyrightWaiverStep'
import DropdownStep from './DropdownStep'
import { disabledSetters, visibleSetters } from '../utils/license-utilities'
import { mapGetters } from 'vuex'

export default {
    name: 'Stepper',
    components: {
        CopyrightWaiverStep,
        DropdownStep,
        FirstStep,
        Step,
        AttributionDetails
    },
    props: ['value'],
    data() {
        return {
            // FS: First step, checks if user knows the license (and we need to open the dropdown)
            // CW: Copyright waiver step for CC0 if the user selects NO on BY step
            // DD: Step with Dropdown for quick license selection, opens if user knows the license
            // AD: Attribution Details step with the form
            steps: [
                // VISIBLE: Steps are shown only if visible is set to true
                // eg. When we choose BY, Copyright Waiver is not shown
                // ENABLED: Steps are shown but disabled when they cannot be chosen
                // eg. When we choose ND, SA is disabled
                { id: 0, name: 'FS', visible: true, enabled: true, status: 'current', selected: undefined },
                { id: 1, name: 'BY', visible: true, enabled: true, status: 'inactive', selected: undefined },
                { id: 2, name: 'NC', visible: true, enabled: true, status: 'inactive', selected: undefined },
                { id: 3, name: 'ND', visible: true, enabled: true, status: 'inactive', selected: undefined },
                { id: 4, name: 'SA', visible: true, enabled: true, status: 'inactive', selected: undefined },
                { id: 5, name: 'CW', visible: false, enabled: true, status: 'inactive', selected: undefined },
                { id: 6, name: 'DD', visible: false, enabled: true, status: 'inactive', selected: undefined },
                { id: 7, name: 'AD', visible: true, enabled: true, status: 'inactive', selected: undefined }
            ]
        }
    },
    methods: {
        headerText(stepId, stepStatus) {
            const prefix = `stepper.${stepId}`
            if (stepId === 'AD' || stepId === 'CW') {
                return prefix + '.heading'
            }
            return stepStatus === 'current' ? `${prefix}.question` : `${prefix}.heading`
        },
        nextButtonDisabled: function(stepId) {
            // Disable 'Next' button if on one of the first 4 steps
            if (stepId <= 4) {
                return this.steps[stepId].selected === undefined
                    ? 'disabled'
                    : ''
            } else {
                if (stepId === 6 && this.$store.state.currentLicenseAttributes.BY === undefined) {
                    return 'disabled'
                }
                return ''
            }
        },
        changeFirstStep(isSelected) {
            this.$set(this.steps, 0, { ...this.steps[0], selected: isSelected })
        },
        changeStepSelected(stepName, stepId, isSelected) {
            this.$set(this.steps, stepId, { ...this.steps[stepId], selected: isSelected })
            this.$store.commit('setSelected', { stepName, isSelected })
            console.log('Step selected changed, ', this.steps)
        },
        isLicenseAttribute(stepId) {
            return ['BY', 'NC', 'ND', 'SA'].indexOf(stepId) > -1
        },
        handleNext(stepName) {
            const stepSelected = this.steps[this.currentStepId].selected
            if (stepSelected === undefined && this.currentStepId <= 4) return
            // update steps enabled and visible properties
            // set the next enabled and visible step as current, and stepName as previous
            this.updateDisabledAndVisibleSteps(stepName, stepSelected)
            const nextStep = this.steps.slice(this.currentStepId + 1).find(step => step.visible && step.enabled).id
            this.$set(this.steps, nextStep, { ...this.steps[nextStep], status: 'current' })
            this.$set(this.steps, this.currentStepId, { ...this.steps[this.currentStepId], status: 'previous' })
            this.currentStepId = nextStep
        },
        handlePrevious(stepName) {
            const stepSelected = this.steps[this.currentStepId].selected
            console.log('Handling previous: ', this.steps[this.currentStepId], stepSelected)
            if (stepSelected === undefined && this.currentStepId <= 4) return
            this.updateDisabledAndVisibleSteps(stepName, stepSelected)
            let previousStep = this.currentStepId
            for (let i = this.currentStepId - 1; i >= 0; i--) {
                const thisStep = this.steps[i]
                if (thisStep.visible && thisStep.enabled) {
                    previousStep = this.steps[i].id
                    break
                }
            }
            this.$set(this.steps, previousStep, { ...this.steps[previousStep], status: 'current' })
            this.$set(this.steps, this.currentStepId, { ...this.steps[this.currentStepId], status: 'inactive' })
            this.currentStepId = previousStep
        },
        handleFinish() {
            // TODO: Open license use card
        },
        setActiveStep(clickedStepId) {
            if (!this.steps[clickedStepId].enabled) return
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
            // stepsToSetVisible is an array of stepNames to set Visible
            for (const step of this.steps) {
                if (stepsToSetVisible.indexOf(step.name) > -1 && !step.visible) {
                    this.$set(this.steps, step.id, { ...step, visible: true })
                } else if (stepsToSetVisible.indexOf(step.name) === -1 && step.visible) {
                    this.$set(this.steps, step.id, { ...step, visible: false })
                }
            }
        },
        setStepsDisabled(stepsToSetDisabled) {
            // Set disabled steps in the stepsToSetDisabled array
            for (const step of this.steps) {
                if (stepsToSetDisabled.indexOf(step.name) > -1 && step.enabled) {
                    this.$set(this.steps, step.id, { ...step, enabled: false })
                } else if (stepsToSetDisabled.indexOf(step.name) === -1 && !step.enabled) {
                    this.$set(this.steps, step.id, { ...step, enabled: true })
                }
            }
        },
        updateDisabledAndVisibleSteps(stepName, isStepSelected) {
            if (stepName in visibleSetters) {
                const visible = visibleSetters[stepName][isStepSelected]
                if (visible !== undefined) {
                    this.setStepsVisible(visible)
                }
            }
            if ((stepName === 'BY' && !this.isAttrSelected('BY')) || (stepName === 'ND' && this.isAttrSelected('ND'))) {
                const disabled = disabledSetters[stepName][isStepSelected]
                if (disabled !== undefined) {
                    this.setStepsDisabled(disabled)
                }
            }
        },
        enabledQualifier(isEnabled) {
            return isEnabled ? 'enabled' : 'disabled'
        },
        visibleSteps() {
            return this.steps.filter(step => {
                return step.visible
            })
        }
    },
    computed: {
        ...mapGetters(['isAttrSelected']),
        currentStepId: {
            get() { return this.$props.value },
            set(newVal) {
                this.$emit('input', newVal)
            }
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
        /*box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);*/
        border: 2px solid  #D8D8D8;
        border-bottom: none;
        border-radius: 4px;
        max-width: 100%;
        position: relative;
    }
    .stepper-card:last-of-type {
        border-bottom: 2px solid #D8D8D8;
    }
    .stepper-card-header {
        background-color: transparent;
        -webkit-box-align: stretch;
        align-items: stretch;
        box-shadow: 0 1px 2px rgba(10, 10, 10, 0.1);
        display: -webkit-box;
        display: flex;
        position:relative;
        margin: 24px 24px 8px;
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
    .inactive .stepper-header-h5::before {
        background-color: #D8D8D8;
        color: #333333;
    }
    .stepper-instructions {
        margin-bottom: 48px;
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
    .inactive .vocab.h5b {
        color: #B0B0B0;
    }
    .inactive .icon
    {
        color:  #D8D8D8;
    }
    .current .icon,
    .previous .icon {
        color: #04A635;
    }
    .step-navigation {
        margin: 13px 0 13px -4px;
    }
    .pagination-next {
        background-color: #04A635;
        color: white!important;
        font-family: Roboto Condensed;
        font-style: normal;
        font-weight: bold;
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
        animation: slide-down .5s;
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
</style>
