<template>
    <div>
        <div
            v-if="status==='previous'||showDisabledDue"
            class="step-description vocab-body body-normal"
        >
            <p class="vocab-body body-normal">
                {{ $t(cardText) }}
            </p>
        </div>
        <div
            v-else-if="status==='current'"
            class="step-actions"
        >
            <div
                class="field"
                :class="yesSelected"
            >
                <b-radio
                    v-model="radio"
                    native-value="yes"
                >
                    <span class="vocab-body body-normal">{{ $t('stepper.yes') }}{{ $t(yesText) }}</span>
                </b-radio>
            </div>
            <div
                class="field"
                :class="noSelected"
            >
                <b-radio
                    v-model="radio"
                    native-value="no"
                >
                    <span class="vocab-body body-normal">{{ $t('stepper.no') }}{{ $t(noText) }}</span>
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
        status: {
            type: String,
            validator(value) {
                return ['current', 'previous', 'inactive'].includes(value)
            }
        },
        reversed: Boolean,
        enabled: Boolean,
        disabledDue: String
    },
    computed: {
        showDisabledDue() {
            return !this.$props.enabled && this.$props.disabledDue !== undefined
        },
        qualifier() {
            return this.reversed ? !this.selected : this.selected
        },
        cardText() {
            if (this.$props.enabled === false) {
                return this.$props.disabledDue === 'ND'
                    ? 'stepper.disabled-text-ND'
                    : 'stepper.disabled-text'
            }
            const prefix = `stepper.${this.$props.stepName}.${this.qualifier ? '' : 'not-'}`
            return `${prefix}selected`
        },
        radio: {
            get() {
                if (this.$props.selected === undefined) {
                    return undefined
                } else {
                    return this.qualifier ? 'yes' : 'no'
                }
            },
            set(newVal) {
                let isSelected = newVal === 'yes'
                isSelected = this.reversed ? !isSelected : isSelected
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
