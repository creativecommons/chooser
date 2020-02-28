<template>
    <div class="step-content">
        <p v-if="status==='previous'"
            class="step-description vocab-body body-normal">
            {{ $t(cardText) }}
        </p>
        <div v-else-if="status==='current'" class="step-actions">
            <div class="field" :class="yesSelected">
                <b-radio v-model="radio"
                    native-value="yes">
                    <span class="vocab-body body-normal">
                        {{ $t('stepper.yes') }}{{ $t(yesText) }}
                    </span>
                </b-radio>
            </div>
            <div class="field" :class="noSelected">
                <b-radio v-model="radio" native-value="no">
                    <span class="vocab-body body-normal">
                        {{ $t('stepper.no') }}{{ $t(noText) }}
                    </span>
                </b-radio>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'FirstStep',
    props: {
        selected: Boolean,
        stepId: Number,
        status: String
    },
    computed: {
        cardText() {
            return this.$props.selected ? 'stepper.FS.selected' : 'stepper.FS.not-selected'
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
                this.$emit('change', 'FS', 0, newVal === 'yes')
            }
        },
        yesText() {
            return 'stepper.FS.selected'
        },
        noText() {
            return 'stepper.FS.not-selected'
        },
        yesSelected() {
            return this.$props.selected
                ? 'selected'
                : 'not-selected'
        },
        noSelected() {
            return this.$props.selected
                ? 'not-selected'
                : 'selected'
        }
    }
}
</script>
