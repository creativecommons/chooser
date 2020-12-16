<template>
    <div
        :class="['step-header', step.status]"
        tabindex="0"
        @click="activate"
        @keyup.13="activate"
    >
        <h5 class="step-header__title b-header">
            {{ $t(stepHeaderText) }}
        </h5>
        <div
            v-if="step.status === 'completed'"
            class="step-header__caption"
        >
            {{ completedStepCaption }}
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'StepHeader',
    props: {
        step: {
            type: Object,
            required: true
        }
    },
    computed: {
        ...mapGetters(['fullName']),

        /**
         * stepHeader shows step 'question' for active step, and step 'heading' for others
         * @returns {string} key for i18n message
         */
        stepHeaderText() {
            const { name, status } = this.step
            const prefix = `stepper.${name}`
            if (name === 'AD') {
                return prefix + '.heading'
            }
            return status === 'active' ? `${prefix}.question` : `${prefix}.heading`
        },
        completedStepCaption() {
            const { id, name, enabled, selected } = this.step
            const reversed = (name) => (['NC', 'ND', 'SA'].indexOf(name) > -1)
            let captionKey
            if (name === 'DD') {
                return this.fullName
            } else if (['FS', 'CW'].includes(name)) {
                captionKey = selected ? `stepper.${name}.selected` : `stepper.${name}.not-selected`
            } else if (enabled === false) {
                captionKey = (this.steps[id].disabledDue === 'ND')
                    ? 'stepper.disabled-text-ND'
                    : 'stepper.disabled-text'
            } else {
                const qualifier = reversed ? !selected : selected
                const prefix = `stepper.${name}.${qualifier ? '' : 'not-'}`
                captionKey = `${prefix}selected`
            }
            return this.$t(captionKey)
        }
    },
    methods: {
        activate() {
            this.$emit('activate', this.step.id)
        }
    }
}
</script>

<style lang="scss" scoped>
.step-header {
    background-color: transparent;
    display: flex;
    flex-direction: column;
    position:relative;
    padding: 1.5625rem 1.5rem 0.5rem var(--step-left-padding);
    cursor: default;

    &:active, &:focus {
        outline: none;
    }
    &.completed:not(.disabled):hover {
        cursor: pointer;
    }
    &.completed, &.inactive {
        padding-bottom: 1.5rem;
    }

}
.step-header__title::before{
    content: counter(step-counter);
    counter-increment: step-counter;
    position: absolute;
    left: var(--h-padding);
    top: 1.375rem;
    width: var(--counter-size);
    height: var(--counter-size);
    line-height: var(--counter-size);
    font-weight: bold;
    font-family: inherit;
    font-size: 1rem;
    background: rgb(0, 128, 0);
    border-radius: 50%;
    text-align: center;
    color: #fff;
}
.step-header__title.completed.disabled::before,
.step-header__title.inactive::before {
    background-color: #d8d8d8;
    color: #333333;
}
.step-header__caption {
    color: #333333;
    &:focus {
         outline: none;
     }
}
.completed.disabled .step-header__title,
.inactive .step-header__title {
        color: #b0b0b0;
    }
</style>
