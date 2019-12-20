<template>
    <div class="chooser-selected">
        <div>
            <p>{{ question }}</p>
            <div class="columns is-centered">
                <div class="column is-3">
                    <b-button
                        icon-left="close"
                        :type=this.noButtonType
                        :outlined=noButtonOutlined
                        @click="update(false)">
                        No
                    </b-button>
                </div>
                <div class="column is-3">
                    <b-button
                        icon-left="done"
                        :type=this.yesButtonType
                        :outlined=yesButtonOutlined
                        @click="update(true)">
                        Yes
                    </b-button>
                </div>
            </div>
            <p>{{ currentText }}</p>
            <hr>
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
            switch (this.stepId) {
            case 'BY': {
                return 'Do you want to require attribution for your work?'
            }
            case 'NC': {
                return 'Do you want to prohibit others commercial use of your work?'
            }
            case 'ND': {
                return 'Do you want to prohibit others changing your work?'
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
                    selectedText: 'Anyone using your work must give appropriate ' +
                            'credit to the author, provide a link to the license, and ' +
                            'indicate if changes were made. ',
                    nonSelectedText: 'You can copy, modify, distribute and perform ' +
                            'the work, even for commercial purposes, all without asking permission.'
                },
                NC: {
                    selectedText: 'The licensor permits others to use the work, including ' +
                            'for commercial purposes.',
                    nonSelectedText: 'The licensor permits others to copy, distribute, display, ' +
                            'and perform the work for non-commercial purposes only.'
                },
                ND: {
                    selectedText: 'Anyone using your work must give appropriate ' +
                            'credit to the author, provide a link to the license, and ' +
                            'indicate if changes were made. ',
                    nonSelectedText: 'You can copy, modify, distribute and perform ' +
                            'the work, even for commercial purposes, all without asking permission.'
                },
                SA: {
                    selectedText: 'Anyone using your work must give appropriate ' +
                            'credit to the author, provide a link to the license, and ' +
                            'indicate if changes were made. ',
                    nonSelectedText: 'You can copy, modify, distribute and perform ' +
                            'the work, even for commercial purposes, all without asking permission.'
                } }
            return textData[this.stepId][keyToSelect]
        },
        isSelected: {
            get() { return this.selected },
            set(selected) {
                this.$emit('input', { 'selected': selected, 'stepId': this.stepId })
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

</style>
