<template>
    <div class="card-content step-card-content">
        <div class="step-description" v-if="this.status==='previous'">
            {{$t(cardText)}}
        </div>
        <div class="step-actions" v-else-if="this.status==='current'">
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
        selected: Boolean,
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
                this.$emit('change', newVal === 'yes')
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

<style scoped>

</style>
