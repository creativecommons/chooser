<template>
    <div class="selection-step">
        <p class="selection-question">{{ this.$t(question) }}</p>
        <div class="selection-choice selection-yes"
             :class="yesClass"
             @click="update(true)">
            <b-button
                icon-left=check
                type="is-primary"
                inverted
                outlined
                @click="update(true)">
                Yes
            </b-button>
            <p :class="yesClass"
               v-html="$t(yesText)"/>

        </div>

        <div class="selection-choice selection-no"
             :class="noClass"
             @click="update(false)">

            <b-button
                icon-left=times
                type="is-primary"
                inverted
                outlined
                @click="update(false)">
                No
            </b-button>
            <p :class="noClass"
                v-html="$t(noText)"/>
        </div>
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
            return `stepper-question.${this.stepId.toLowerCase()}`
        },
        yesText() {
            return `stepper-description.${this.stepId.toLowerCase()}.selected`
        },
        noText() {
            return `stepper-description.${this.stepId.toLowerCase()}.not-selected`
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
        },
        yesClass() {
            return this.isSelected ? 'selected' : 'not-selected'
        },
        noClass() {
            return this.isSelected ? 'not-selected' : 'selected'
        }
    },
    watch: {
        value() {
            this.$emit('input', this.selected)
        }
    }
}
</script>

<style lang="scss" scoped>
    .selection-question {
        margin-bottom: 1rem;
        color:white;
    }
    .selection-choice {
        display: grid;
        grid-template-columns: 1fr 5fr;
        grid-gap: 1rem;
        padding: 1rem 3rem;
        margin-left: -3rem;
        margin-right: -3rem;
        border-top: 1px dotted white;
        border-bottom: 1px dotted white;
        &:hover {
            background-color: #FB7729;
         }
    }
    p.selected {
        color:white;
    }
    div.selection-choice.selected {
        background-color: darken(#05B5DA, 10%);
        &:hover {
            background-color: #FB7729;
        }
    }
</style>
