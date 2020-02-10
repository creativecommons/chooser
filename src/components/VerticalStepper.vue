<template>
<div class="column vertical-stepper-container">
    <h2 class="vocab-h2">{{$t('select-license.heading')}}</h2>
    <p class="stepper-instructions vocab-body-bigger">{{$t('select-license.instructions')}}</p>
    <div class="steps"
        v-for="(step, idx) in enabledAndVisibleSteps"
         :key="idx">
        <div :class="['step', 'card', step.status]">
            <div :class="['card-header']"
                @click="setActiveStep(step.name)">
                <b-icon icon="circle" />
                <h5 class="vocab-h5">{{$t(headerText(step.name))}}</h5>
            </div>
            <FirstStep
                v-if="step.name==='FS'"
                :status="step.status"
                :knowLicense="knowLicense"
            />
            <transition name="slide">
                <VerticalStep
                    v-if="isLicenseAttribute(step.name)"
                    :status="step.status"
                    :stepId="step.name"
                />
            </transition>

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
import { mapGetters, mapState, mapActions } from 'vuex'
import DropdownStep from './DropdownStep'

export default {
    name: 'VerticalStepper',
    components: {
        DropdownStep,
        FirstStep,
        VerticalStep,
        AttributionDetails
    },
    methods: {
        ...mapActions(['handleNext', 'handlePrevious', 'setActiveStep']),
        headerText(stepId) {
            const prefix = `stepper.${stepId}`
            return this.status === 'current' ? `${prefix}.question` : `${prefix}.heading`
        },
        isLicenseAttribute(stepId) {
            return ['BY', 'NC', 'ND', 'SA'].indexOf(stepId) > -1
        }
    },
    computed: {
        ...mapGetters(['enabledAndVisibleSteps', 'isStepSelected']),
        ...mapState(['knowLicense'])
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
</style>
