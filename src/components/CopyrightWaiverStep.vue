<template>
    <div class="step-actions">
        <v-checkbox v-model="copyrightWaiverAgreed">
            {{ $t('stepper.CW.copyright-waive-agreement') }}
        </v-checkbox>
        <textarea
            :value="this.$t('cc0-waiver.text')"
            :class="'waiver-textarea'"
        />
        <v-checkbox v-model="copyrightWaiverConfirmed">
            {{ $t("stepper.CW.copyright-waive-confirmation") }}
        </v-checkbox>
    </div>
</template>
<script>
export default {
    name: 'CopyrightWaiverStep',
    props: {
        id: Number,
        name: String,
        selected: Boolean,
        status: {
            type: String,
            validator(value) {
                return ['active', 'previous', 'inactive'].includes(value)
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
                const payload = { name: this.$props.name, id: this.$props.id }
                if (this.agreed && this.confirmed) {
                    payload.selected = true
                } else if (!this.agreed) {
                    payload.selected = undefined
                }
                this.$emit('change', payload)
            }
        },
        copyrightWaiverConfirmed: {
            get() {
                return this.confirmed
            },
            set() {
                this.confirmed = !this.confirmed
                const payload = { name: this.$props.name, id: this.$props.id }
                if (this.agreed && this.confirmed) {
                    payload.selected = true
                } else if (!this.confirmed) {
                    payload.selected = undefined
                }
                this.$emit('change', payload)
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
.step-actions .control-label {
    color: #333333;
}
input[type='checkbox'] {
    transform: translateY(3px);
}
</style>
