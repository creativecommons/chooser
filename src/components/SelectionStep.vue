<template>
    <div>
            <p class="selection-question">{{ question }}</p>
            <div class="columns is-centered">
                <div class="column is-3">
                    <b-button
                        icon-left=times
                        :type=this.noButtonType
                        :outlined=noButtonOutlined
                        @click="update(false)">
                        No
                    </b-button>
                </div>
                <div class="column is-3">
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
            switch (this.stepId) {
            case 'BY': {
                return 'Do you want to require attribution for your work?'
            }
            case 'NC': {
                return 'Do you want to prohibit others commercial use of your work?'
            }
            case 'ND': {
                return 'Do you want to prohibit others distributing your work if they remix, transform or build upon it?'
            }
            case 'SA': {
                return 'Do you want to prohibit sharing your work under other terms?'
            }
            default: {
                return ''
            }
            }
        },

        currentText() {
            const keyToSelect = this.isSelected ? 'selectedText' : 'nonSelectedText'
            const textData = {
                BY: {
                    selectedText: 'Anyone using your work must give <b>appropriate ' +
                            'credit</b> to the author, provide a <b>link to the license</b>, and ' +
                            '<b>indicate if changes were made.</b>',
                    nonSelectedText: 'Anyone can copy, modify, distribute and perform ' +
                            'the work, <b>even for commercial purposes</b>, all <b>without asking permission.</b>'
                },
                NC: {
                    selectedText: 'The licensor permits others to copy, distribute, display, ' +
                            'and perform the work for <b>non-commercial purposes only.</b>',
                    nonSelectedText: 'The licensor permits others to use the work, including for ' +
                            '<b>commercial purposes.</b>'
                },
                ND: {
                    selectedText: 'Anyone who remixes, transforms, or builds upon your work may <b>not ' +
                            'distribute the modified material</b>.',
                    nonSelectedText: 'Anyone may <b>remix, transform, or build upon your work and distribute</b> ' +
                            'the modified material.'
                },
                SA: {
                    selectedText: 'Anyone who remixes, transforms or builds upon your work <b>must distribute</b> ' +
                            'their contributions <b>under the same license</b> as the original.',
                    nonSelectedText: 'Anyone who remixes, transforms or builds upon your work can distribute ' +
                            'their contributions <b>under a different license</b>.'
                }
            }
            return textData[this.stepId][keyToSelect]
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
