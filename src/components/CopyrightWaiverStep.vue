<template>
    <div class="step-content">
        <div
            v-if="status==='previous'"
            class="step-description vocab-body body-normal"
        >
            <p class="vocab-body body-normal">
                {{ $t('stepper.CW.selected') }}
            </p>
        </div>
        <div
            v-else-if="status==='current'"
            class="step-actions"
        >
            <b-checkbox v-model="copyrightWaiverAgreed">
                {{ $t('stepper.CW.copyright-waive-agreement') }}
            </b-checkbox>
            <textarea
                :value="this.$t('cc0-waiver.text')"
                :class="'waiver-textarea'"
            />
            <b-checkbox v-model="copyrightWaiverConfirmed">
                {{ $t("stepper.CW.copyright-waive-confirmation") }}
            </b-checkbox>
        </div>
    </div>
</template>
<script>
export default {
    name: 'CopyrightWaiverStep',
    props: {
        stepId: Number,
        stepName: String,
        selected: Boolean,
        status: {
            type: String,
            validator(value) {
                return ['current', 'previous', 'inactive'].includes(value)
            }
        }
    },
    data() {
        return {
            agreed: false,
            confirmed: false
        }
    },
    computed: {
        copyrightWaiverAgreed: {
            get() {
                return this.agreed
            },
            set() {
                this.agreed = !this.agreed
                if (this.agreed && this.confirmed) {
                    this.$emit('change', this.$props.stepName, this.$props.stepId, true)
                } else if (!this.agreed) {
                    this.$emit('change', this.$props.stepName, this.$props.stepId, undefined)
                }
            }
        },
        copyrightWaiverConfirmed: {
            get() {
                return this.confirmed
            },
            set() {
                this.confirmed = !this.confirmed
                if (this.agreed && this.confirmed) {
                    this.$emit('change', this.$props.stepName, this.$props.stepId, true)
                } else if (!this.confirmed) {
                    this.$emit('change', this.$props.stepName, this.$props.stepId, undefined)
                }
            }
        }
    }
}
</script>
<style lang="scss">
.waiver-textarea {
    width: 100%;
    min-height: 100px;
    margin: 1rem 0;
}
.step-actions .b-checkbox.checkbox {
    align-items: normal;
}
.step-actions .control-label {
    color: #333333;
}
.step-actions .b-checkbox.checkbox input[type=checkbox] + .check {
    border: 2px solid #D8D8D8;
}
</style>
