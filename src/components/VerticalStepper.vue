<template>
<div class="column vertical-stepper-container">
    <h2 class="vocab-h2">{{$t('select-license.heading')}}</h2>
    <p class="stepper-instructions vocab-body-bigger">{{$t('select-license.instructions')}}</p>
    <div class="steps"
        v-for="(step, idx) in this.enabledSteps"
         :key="idx">
        <div :class="['step', 'card', stepStatus(step.name)]">
            <div :class="['card-header']"
                @click="changeStep(idx)">
                <b-icon
                icon="circle"
                />
                <h5 class="vocab-h5">{{$t(headerText(step.name))}}</h5>
            </div>
            <FirstStep
                v-if="step.type==='first'"
                :knowLicense="knowLicense"
                :status="stepStatus(step.name)"
                @knowLicenseChanged="knowLicense = !knowLicense"
            />
            <AttributionDetails
                v-if="step.name==='ad'"
                :status="stepStatus(step.name)"
                v-model="selected.attributionDetails"
        />
        <VerticalStep
            v-if="step.type==='licenseAttribute'"
            :status="stepStatus(step.name)"
            :isSelected="isAttributeSelected(step.name)"
            :stepId="step.name"
            @licenseAttrChanged="updateLicense(step.name)"
        />
            <nav class="step-navigation" v-if="stepStatus(step.name)==='current'">
                <a
                    role="button"
                    class="pagination-previous"
                    v-if="step.name!=='fs'"
                    @click="handlePrevious()">
                    {{$t('step.previous-label')}}

                </a>
                <a
                v-if="step.name!=='ad'"
                role="button"
                class="pagination-next"
                @click="handleNext()">
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

export default {
    name: 'VerticalStepper',
    components: {
        FirstStep,
        VerticalStep,
        AttributionDetails
    },
    props: ['selected'],
    data: function() {
        return {
            knowLicense: false,
            activeStep: 0,
            currentStep: 'fs',
            stepNames: ['fs', 'dd', 'by', 'nc', 'nd', 'sa', 'cw', 'ad'],
            steps: [
                {
                    name: 'fs',
                    type: 'first'
                },
                {
                    name: 'dd',
                    type: 'form'
                },
                {
                    name: 'by',
                    type: 'licenseAttribute'
                },
                {
                    name: 'cw',
                    type: 'form'
                },
                {
                    name: 'nc',
                    type: 'licenseAttribute'
                },
                {
                    name: 'nd',
                    type: 'licenseAttribute'
                },
                {
                    name: 'sa',
                    type: 'licenseAttribute'
                },
                {
                    name: 'ad',
                    type: 'form'
                }
            ]
        }
    },
    methods: {
        isEnabled(stepId) {
            if (this.knowLicense) {
                return ['fs', 'dd', 'ad'].indexOf(stepId) > -1
            } else if (this.$props.selected.shortName.includes('BY')) {
                return ['cw', 'dd'].indexOf(stepId) === -1
            } else if (this.$props.selected.shortName.includes('CC0')) {
                // TODO: Probably need to simply make other steps unclickable with tooltips
                return ['fs', 'by', 'cw', 'ad'].indexOf(stepId) > -1
            } return true
        },
        stepStatus(stepId) {
            const stepIdx = this.stepNames.indexOf(stepId)
            const currentStepIdx = this.stepNames.indexOf(this.currentStep)
            // can return current, previous, disabled or inactive
            if (!this.isEnabled(stepId)) {
                return 'disabled'
            } else if (this.currentStep === stepId) {
                return 'current'
            } else {
                return stepIdx < currentStepIdx ? 'previous' : 'inactive'
            }
        },
        isAttributeSelected(stepId) {
            return this.$props.selected.shortName.includes(stepId.toUpperCase())
        },
        handlePrevious() {
            console.log('Current step: ', this.currentStep)
        },
        handleNext() {
            console.log('Current step: ', this.currentStep, this.steps)
            // if you know license -> set current step to dd
            // if cc0 -> set current step to cw
            // if dd/cw/sa(or nd selected) -> ad
            if (this.currentStep === 'fs') {
                this.currentStep = this.knowLicense ? 'dd' : 'by'
            } else if (this.currentStep === 'by') {
                this.currentStep = this.selected.shortName.includes('CC0') ? 'cw' : 'nc'
            } else if (this.currentStep === 'dd' ||
                this.currentStep === 'cw' ||
                this.currentStep === 'sa' ||
                (this.currentStep === 'nd' && this.selected.shortName.includes('ND'))) {
                this.currentStep = 'ad'
            } else {
                console.log('Handling next for ', this.currentStep)
                this.currentStep = this.stepNames[this.stepNames.indexOf(this.currentStep) + 1]
            }
        },
        handleFinish() {
            console.log('FINISHED!')
            this.$emit('openLicenseUse')
        },
        changeStep(clickedIdx) {
            if (this.enabledSteps[clickedIdx].status === 'current') return
            if (clickedIdx > 0) { this.$emit('openLicenseCard', true) }
            this.currentStep = this.enabledSteps[clickedIdx].name
        },
        headerText(stepId) {
            const prefix = `stepper.${stepId}`
            return this.status === 'current' ? `${prefix}.question` : `${prefix}.heading`
        },
        updateLicense(stepId) {
            this.$emit('toggleLicenseAttr', stepId)
        }
    },
    computed: {
        enabledSteps() {
            return this.steps.filter((step) => {
                return this.isEnabled(step.name)
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

    .previous .step-card-content {
        padding-top:8px;
        padding-bottom: 0;
        padding-left: 40px;
    }
    .card-content.step-card-content {
             padding-left: 48px;
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
</style>
