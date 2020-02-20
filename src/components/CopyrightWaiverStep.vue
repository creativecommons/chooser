<template>
    <div>
        <div class="step-description vocab-body body-normal"
             v-if="this.status==='previous'">
            <p class="vocab-body body-normal">{{$t('stepper.CW.selected')}}</p>
        </div>
        <div class="step-actions" v-else-if="this.status==='current'">
            <b-checkbox v-model="copyrightWaiverAgreed">
                {{$t('stepper.CW.copyright-waive-agreement')}}
            </b-checkbox>
            <textarea :value="this.$t('cc0-waiver.text')" :class="'waiver-textarea'" />
            <b-checkbox v-model="copyrightWaiverConfirmed">
                {{$t("stepper.CW.copyright-waive-confirmation")}}
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
        status: String
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
                }
            }
        }
    }
}
</script>

<style lang="scss">
label.label {
    font-size: 0.845rem;
}
.waiver-textarea {
    width: 100%;
    min-height: 100px;
    margin: 1rem 0;
}
.b-checkbox {
    align-items: flex-start;
}
</style>
