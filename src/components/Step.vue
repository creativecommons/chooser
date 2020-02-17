<template>
    <div>
        <div class="step-description vocab-body body-normal" v-if="this.status==='previous'">
            <p class="vocab-body body-normal">{{$t(cardText)}}</p>
        </div>
        <div class="step-actions" v-else-if="this.status==='current'">
            <div class="field" :class="yesSelected">
                <b-radio v-model="radio"
                         native-value="yes">
                    <span class="vocab-body body-normal">{{$t('yes')}}{{$t(yesText)}}</span>
                </b-radio>
            </div>
            <div class="field" :class="noSelected">
                <b-radio v-model="radio"
                         native-value="no">
                    <span class="vocab-body body-normal">{{$t('no')}}{{$t(noText)}}</span>
                </b-radio>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Step',
    props: {
        stepName: String,
        selected: Boolean,
        stepId: Number,
        status: String
    },
    computed: {
        cardText() {
            const prefix = `stepper.${this.$props.stepName}.${this.selected ? '' : 'not-'}`
            return `${prefix}selected`
        },
        radio: {
            get() {
                if (this.$props.selected === undefined) {
                    return undefined
                } else {
                    return this.$props.selected ? 'yes' : 'no'
                }
            },
            set(newVal) {
                const isSelected = newVal === 'yes'
                this.$emit('change', this.$props.stepName, this.$props.stepId, isSelected)
            }
        },
        tPrefix() {
            return 'stepper.' + this.stepName
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
            return this.selected ? 'selected' : 'not-selected'
        },
        noSelected() {
            return !this.selected ? 'selected' : 'not-selected'
        }
    }
}
</script>

<style>

</style>
