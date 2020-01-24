<template>
    <div class="selection-step">
        <p class="selection-question">{{ this.$t(question) }}</p>
                <div class="field" :class="yesSelected">
                    <b-radio v-model="radio"
                             native-value="yes">
                        <span v-html="$t(yesText)" />
                    </b-radio>
                </div>
                <div class="field" :class="noSelected">
                    <b-radio v-model="radio"
                             native-value="no">
                        <span v-html="$t(noText)" />
                    </b-radio>
                </div>
    </div>
</template>

<script>

export default {
    name: 'SelectionStep',
    props: ['selected', 'stepId'],
    computed: {
        radio: {
            get() {
                return this.$props.selected ? 'yes' : 'no'
            },
            set(newVal) {
                const returnValue = newVal === 'yes'
                this.$emit('input', { selected: returnValue, stepId: this.stepId })
            }
        },
        question() {
            return `stepper.${this.stepId.toLowerCase()}.question`
        },
        yesText() {
            return `stepper.${this.stepId.toLowerCase()}.selected`
        },
        noText() {
            return `stepper.${this.stepId.toLowerCase()}.not-selected`
        },
        yesSelected() {
            if (this.$props.selected) {
                return 'selected'
            } else {
                return 'not-selected'
            }
        },
        noSelected() {
            if (!this.$props.selected) {
                return 'selected'
            } else {
                return 'not-selected'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .selection-question {
        margin-bottom: 2rem;
        font-weight: bold;
        font-style: normal;
        font-size: 20px;
        line-height: 26px;
        color: #333333;
    }
    .field {
        padding: 1rem;
        margin-bottom: 0;
    }
    .field.not-selected {
        opacity: 0.7;
    }
    .field:hover {
        box-shadow: 0 10px 15px -3px rgba(237, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        -webkit-transform: scale(0.98);
        -ms-transform: scale(.98);
        transform: scale(.98);
        border: 1px solid rgba(237,89,47, 0.5);
        border-radius: 5px;
    }
    .field:active {
        color:  #ED592F;
    }
    .step-content {
        height: 285px;
    }
    .step-navigation {
        text-align: center;
    }
</style>
