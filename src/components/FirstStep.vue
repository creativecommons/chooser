<template>
    <div class="card-content step-card-content">
        <div class="step-description" v-if="this.status==='previous'">
            {{$t(cardText)}}
        </div>
        <div class="step-actions" v-if="this.status==='current'">
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
    </div>
</template>

<script>
export default {
    name: 'FirstStep',
    props: {
        knowLicense: Boolean,
        status: String
    },
    computed: {
        cardText() {
            return this.$props.knowLicense ? 'stepper.fs.selected' : 'stepper.fs.not-selected'
        },
        radio: {
            get() {
                return this.$props.knowLicense ? 'yes' : 'no'
            },
            set() {
                console.log('Changing fs radio')
                this.$emit('knowLicenseChanged')
            }
        },
        question() {
            return 'stepper.fs.question'
        },
        yesText() {
            return 'stepper.fs.selected'
        },
        noText() {
            return 'stepper.fs.not-selected'
        },
        yesSelected() {
            if (this.$props.knowLicense) {
                return 'selected'
            } else {
                return 'not-selected'
            }
        },
        noSelected() {
            if (!this.$props.knowLicense) {
                return 'selected'
            } else {
                return 'not-selected'
            }
        }
    }
}
</script>

<style scoped>

</style>
