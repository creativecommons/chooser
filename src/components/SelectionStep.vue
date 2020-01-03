<template>
    <div class="selection-step">
        <p class="selection-question">{{ question }}</p>
        <div class="selection-buttons">
            <div class="selection-button selection-button-no">
                <b-button
                    icon-left=times
                    :type=this.noButtonType
                    :outlined=noButtonOutlined
                    @click="update(false)">
                    No
                </b-button>
            </div>
            <div class="selection-button selection-button-yes">
                <b-button
                    icon-left=check
                    :type=this.yesButtonType
                    :outlined=yesButtonOutlined
                    @click="update(true)">
                    Yes
                </b-button>
            </div>
        </div>
        <p v-html="currentText"/>
        <hr>
    </div>
</template>

<script>
export default {
    name: 'SelectionStep',
    props: ['selected', 'stepId'],
    methods: {
        update(btn) {
            if (btn !== this.selected) {
                this.isSelected = btn
            }
        }
    },
    computed: {
        question() {
            const keyToSelect = `question-${this.stepId.toLowerCase()}`
            return this.$t(keyToSelect)
        },

        currentText() {
            const selectedModifier = this.isSelected ? '' : 'not-'
            const key = `short-description-${selectedModifier}selected-${this.stepId.toLowerCase()}`
            return this.$t(key)
        },
        isSelected: {
            get() { return this.selected },
            set(selected) {
                this.$emit('input', { selected: selected, stepId: this.stepId })
            }
        },
        yesButtonType() {
            return this.isSelected ? 'is-dark' : ''
        },
        noButtonType() {
            return this.isSelected ? '' : 'is-dark'
        },
        yesButtonOutlined() {
            return !this.isSelected
        },
        noButtonOutlined() {
            return this.isSelected
        }
    },
    watch: {
        value() {
            this.$emit('input', this.selected)
        }
    }
}
</script>

<style scoped>
    .selection-question {
        text-align: center;
        margin-bottom: 1rem;
        font-weight: 600;
    }
    .selection-buttons {
        display:grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 2rem;
        margin-bottom:1rem;
    }
    .selection-button {
        align-self: center;
    }
    .selection-button-no {
        justify-self: end;
    }
    .selection-button-yes {
        justify-self: start;
    }
</style>
