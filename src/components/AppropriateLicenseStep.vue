<template>
    <div class="step-actions">
        <v-checkbox v-model="ownupagreed">
            {{ $t('stepper.AL.own-up-agreement') }}
        </v-checkbox>
        <v-checkbox v-model="termsagreed">
            {{ $t('stepper.AL.terms-agreement') }}
        </v-checkbox>
        <v-checkbox v-model="nonrevocableagreed">
            {{ $t('stepper.AL.non-revocable-agreement') }}
        </v-checkbox>
    </div>
</template>
<script>
export default {
    name: 'AppropraitLicenseStep',
    inheritAttrs: false,
    props: {
        id: Number,
        name: String,
        selected: Boolean
    },
    data() {
        return {
            ownup_agreed: false,
            terms_agreed: false,
            nonrevocable_agreed: false
        }
    },
    computed: {
        ownupagreed: {
            get() {
                return this.ownup_agreed
            },
            set() {
                this.ownup_agreed = !this.ownup_agreed
                const payload = { name: this.$props.name, id: this.$props.id }
                if (this.ownup_agreed && this.terms_agreed && this.nonrevocable_agreed) {
                    payload.selected = true
                } else if (!this.ownup_agreed) {
                    payload.selected = undefined
                }
                this.$emit('change', payload)
            }
        },
        termsagreed: {
            get() {
                return this.terms_agreed
            },
            set() {
                this.terms_agreed = !this.terms_agreed
                const payload = { name: this.$props.name, id: this.$props.id }
                if (this.terms_agreed && this.ownup_agreed && this.nonrevocable_agreed) {
                    payload.selected = true
                } else if (!this.terms_agreed) {
                    payload.selected = undefined
                }
                this.$emit('change', payload)
            }
        },
        nonrevocableagreed: {
            get() {
                return this.nonrevocable_agreed
            },
            set() {
                this.nonrevocable_agreed = !this.nonrevocable_agreed
                const payload = { name: this.$props.name, id: this.$props.id }
                if (this.nonrevocable_agreed && this.terms_agreed && this.ownup_agreed) {
                    payload.selected = true
                } else if (!this.nonrevocable_agreed) {
                    payload.selected = undefined
                }
                this.$emit('change', payload)
            }
        }
    }
}
</script>
<style lang="scss">
.step-actions .control-label {
    color: #333333;
}
input[type='checkbox'] {
    transform: translateY(3px);
}
.modal-container {
    width: 85vw;
    height: 85vh;
    overflow: hidden;
}
.deed-main {
    padding-right: 2rem;
}
.v-checkbox {
    margin-bottom: 1.5rem;
}

.overlay.app-modal {
    .close-button {
        margin-left: 0;
    }
    .modal {
        display: block;
        overflow: hidden;
    }
    .modal-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0.4rem!important;
        h3 {
            flex: 1;
            text-align: center;
        }
    }
}
</style>
