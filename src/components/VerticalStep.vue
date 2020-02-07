<template>
    <div class="card-content step-card-content" v-if="!(this.status==='inactive')">
        <div class="step-description" v-if="this.status==='previous'">
            {{$t(cardText)}}
        </div>
        <div class="step-actions" v-else-if="this.status==='current'">
            <div class="field" :class="yesSelected">
                <b-radio v-model="radio"
                         native-value="yes">
                    <span>{{$t('yes')}}{{$t(yesText)}}</span>
                </b-radio>
            </div>
            <div class="field" :class="noSelected">
                <b-radio v-model="radio"
                         native-value="no">
                    <span>{{$t('no')}}{{$t(noText)}}</span>
                </b-radio>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'VerticalStep',
    props: {
        stepId: String,
        status: String,
        isSelected: Boolean
    },
    computed: {
        cardText() {
            const prefix = `stepper.${this.$props.stepId}.${this.$props.isSelected ? '' : 'not-'}`
            return `${prefix}selected`
        },
        radio: {
            get() {
                return this.$props.isSelected ? 'yes' : 'no'
            },
            set(newVal, oldVal) {
                if (newVal !== oldVal) {
                    this.$emit('licenseAttrChanged', this.stepId)
                }
            }
        },
        tPrefix() {
            return 'stepper.' + this.stepId
        },
        question() {
            return this.tPrefix + '.question'
        },
        yesText() {
            return this.tPrefix + '.selected'
        },
        noText() {
            return this.tPrefix + '.not-selected'
        },
        yesSelected() {
            return this.isSelected ? 'selected' : 'not-selected'
        },
        noSelected() {
            return !this.isSelected ? 'selected' : 'not-selected'
        }
    }
}
</script>

<style scoped>

</style>
