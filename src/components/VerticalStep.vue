<template>
    <div class="card-content step-card-content" v-if="!(this.status==='inactive')">
            <div class="step-description" v-if="this.status==='previous'">
                <transition name="slide">
                <p>{{$t(cardText)}}</p>
                </transition>
            </div>
        <div class="step-actions" v-else-if="this.status==='current'">
            <transition name="slide">
                <div>
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
            </transition>

        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
    name: 'VerticalStep',
    props: {
        stepName: String,
        status: String
    },
    methods: {
        selected() {
            return this.attributes(this.$props.stepName)
        }
    },
    computed: {
        ...mapState({ attributes: state => state.currentLicenseAttributes }),
        cardText() {
            const prefix = `stepper.${this.$props.stepName}.${this.selected ? '' : 'not-'}`
            return `${prefix}selected`
        },
        radio: {
            get() {
                return this.attributes[this.$props.stepName] ? 'yes' : 'no'
            },
            set(newVal) {
                this.$store.commit('toggleSelected', this.$props.stepName)
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
    .slide-enter,
    .slide-leave-to { opacity: 0 }

    .slide-leave,
    .slide-enter-to { opacity: 1 }

    .slide-enter-active,
    .slide-leave-active {
         position: absolute;
         width: 100%;
         transition: opacity 200ms ease-in-out;
     }
</style>
