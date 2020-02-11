<template>
<div class="column vertical-stepper-container">
    <h2 class="vocab-h2">{{$t('select-license.heading')}}</h2>
    <p class="stepper-instructions vocab-body-bigger">{{$t('select-license.instructions')}}</p>
    <div class="steps"
        v-for="(step, idx) in visibleSteps()"
         :key="idx">
        <div :class="['step', 'card', 'tooltip', step.status, enabledQualifier(step.enabled)]">
            <span class="tooltiptext" v-if="!step.enabled">{{$t('disabled-tooltip.'+step.name)}}</span>
            <div :class="['card-header']"
                @click="setActiveStep(step.id)">
                <b-icon icon="circle" />
                <h5 class="vocab-h5">{{$t(headerText(step.name))}}</h5>
            </div>
            <FirstStep
                v-if="step.name==='FS'"
                :selected="step.selected"
                @change="changeFirstStep"
                :status="step.status"
            />
            <transition name="slide">
                <VerticalStep
                    v-if="isLicenseAttribute(step.name)"
                    :status="step.status"
                    :stepName="step.name"
                />
            </transition>
            <CopyrightWaiverStep
                v-if="step.name==='CW'" />
            <DropdownStep
                v-if="step.name==='DD'"
                :status="step.status"
                />
            <AttributionDetails
                v-if="step.name==='AD'"
                :status="step.status"
            />

            <nav class="step-navigation" v-if="step.status==='current'">
                <a
                    role="button"
                    class="pagination-previous"
                    v-if="step.name!=='FS'"
                    @click="handlePrevious(step.name)">
                    {{$t('step.previous-label')}}
                </a>
                <a
                    v-if="step.name!=='AD'"
                    role="button"
                    class="pagination-next"
                    @click="handleNext(step.name)">
                    {{$t('step.next-label')}}
                </a>
                <a
                    v-else
                    role="button"
                    class="pagination-next"
                    @click="handleFinish()">
                    {{$t('step.finish')}}
                </a>
            </nav>
        </div>
    </div>
</div>
</template>

<script>
import VerticalStep from './VerticalStep'
import FirstStep from './FirstStep'
import AttributionDetails from './AttributionDetails'
import DropdownStep from './DropdownStep'
import { disabledSetters, visibleSetters } from '../utils/license-utilities'
import { mapGetters } from 'vuex'
import CopyrightWaiverStep from './CopyrightWaiverStep'

export default {
    name: 'VerticalStepper',
    components: {
        CopyrightWaiverStep,
        DropdownStep,
        FirstStep,
        VerticalStep,
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
                { id: 0, name: 'FS', visible: true, enabled: true, status: 'current', selected: false },
                { id: 1, name: 'BY', visible: true, enabled: true, status: 'inactive', selected: true },
                { id: 2, name: 'NC', visible: true, enabled: true, status: 'inactive', selected: false },
                { id: 3, name: 'ND', visible: true, enabled: true, status: 'inactive', selected: false },
                { id: 4, name: 'SA', visible: true, enabled: true, status: 'inactive', selected: false },
                { id: 5, name: 'CW', visible: false, enabled: true, status: 'inactive', selected: false },
                { id: 6, name: 'DD', visible: false, enabled: true, status: 'inactive', selected: undefined },
                { id: 7, name: 'AD', visible: true, enabled: true, status: 'inactive', selected: undefined }
            ]
        }
    },
    methods: {
        headerText(stepId) {
            const prefix = `stepper.${stepId}`
            return this.status === 'current' ? `${prefix}.question` : `${prefix}.heading`
        },
        changeFirstStep() {
            this.$set(this.steps, 0, { ...this.steps[0], selected: !this.steps[0].selected })
        },
        isLicenseAttribute(stepId) {
            return ['BY', 'NC', 'ND', 'SA'].indexOf(stepId) > -1
        },
        handleNext() {
            const currentStepName = this.steps[this.currentStepId].name
            const stepSelected = this.currentStepId === 0
                ? this.steps[0].selected
                : this.isAttrSelected(currentStepName)
            // update steps enabled and visible properties
            // set the next enabled and visible step as current, and stepName as previous
            this.updateDisabledAndVisibleSteps(currentStepName,
                stepSelected)
            const nextStep = this.steps.slice(this.currentStepId + 1).find(step => step.visible && step.enabled).id
            this.$set(this.steps, nextStep, { ...this.steps[nextStep], status: 'current' })
            this.$set(this.steps, this.currentStepId, { ...this.steps[this.currentStepId], status: 'previous' })
            this.currentStepId = nextStep
        },
        handlePrevious() {
            // FIXME: SA step sometimes disappears. Figure out why and fix
            const currentStepName = this.steps[this.currentStepId].name
            const stepSelected = this.currentStepId === 0
                ? this.steps[0].selected
                : this.isAttrSelected(currentStepName)
            this.updateDisabledAndVisibleSteps(currentStepName,
                stepSelected)
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
        setActiveStep(clickedStepId) {
            if (!this.steps[clickedStepId].enabled) return
            if (clickedStepId > this.currentStepId) {
                for (let i = this.currentStepId; i < clickedStepId; i++) {
                    this.$set(this.steps, i, { ...this.steps[i], status: 'previous' })
                }
                // TODO: shouldn't set a disabled step current
                this.$set(this.steps, clickedStepId, { ...this.steps[clickedStepId], status: 'current' })
            } else {
                for (let i = this.currentStepId; i > clickedStepId; i--) {
                    this.$set(this.steps, i, { ...this.steps[i], status: 'inactive' })
                }
                // TODO: shouldn't set a disabled step current
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
        },
        enabledAndVisibleSteps() {
            return this.steps.filter(step => {
                return step.visible && step.enabled
            })
        }
    }
}
</script>

<style>
    .stepper-instructions {
        margin-bottom: 48px;
    }
    .step {
        padding: 24px;
    }

    .current,
    .previous {
        color: black;
    }
    .inactive {
        color: #B0B0B0;
    }
    .inactive .icon,
    .inactive .vocab-h5
    {
        color:  #B0B0B0;
    }
    .icon {
        margin-right: 16px;
        vertical-align: text-bottom;
    }
    .current .icon,
    .previous .icon {
        color: hsl(138, 95%, 33%);
    }
    .step-navigation {
        margin-left: 33px;
    }
    .previous .step-card-content {
        padding-top:8px;
        padding-bottom: 0;
        padding-left: 40px;
    }
    .card-content.step-card-content {
             padding-left: 40px;
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
    /* Tooltip container */
    .tooltip {
        position: relative;
        width: 100%;
        display: inline-block;
    }

    /* Tooltip text */
    .tooltip .tooltiptext {
        visibility: hidden;
        width: 80%;
        background-color: gray;
        color: #fff;
        text-align: center;
        padding: 5px 0;
        border-radius: 6px;

        /* Position the tooltip text - see examples below! */
        position: absolute;
        z-index: 1;
        top: -5px;
    }

    /* Show the tooltip text when you mouse over the tooltip container */
    .tooltip:hover .tooltiptext {
        visibility: visible;
    }
    .tooltip .tooltiptext::after {
        content: " ";
        position: absolute;
        top: 100%; /* At the bottom of the tooltip */
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: gray transparent transparent transparent;
    }

</style>
