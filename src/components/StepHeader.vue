<template>
  <div
    :class="['step-header', step.status]"
    v-bind="tabIndex"
    @click="activate"
    @keyup.13="activate"
  >
    <h2 class="step-header__title b-header title is-5">
      {{ $t(stepHeaderText) }}
    </h2>
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
      required: true,
    },
  },
  computed: {
    ...mapGetters(['fullName']),
    tabIndex() {
      return this.step.status === 'completed'
        ? { tabindex: 0 }
        : {}
    },

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
      const { name, enabled, selected, disabledDue = null } = this.step
      const reversed = (name) => (['NC', 'ND', 'SA'].indexOf(name) > -1)
      let captionKey
      if (name === 'DD') {
        return this.fullName
      } else if (['FS', 'CW', 'AL'].includes(name)) {
        captionKey = selected ? `stepper.${name}.selected` : `stepper.${name}.not-selected`
      } else if (enabled === false) {
        captionKey = (disabledDue === 'ND')
          ? 'stepper.disabled-text-ND'
          : 'stepper.disabled-text'
      } else {
        const qualifier = reversed ? !selected : selected
        const prefix = `stepper.${name}.${qualifier ? '' : 'not-'}`
        captionKey = `${prefix}selected`
      }
      return this.$t(captionKey)
    },
  },
  methods: {
    activate() {
      this.$emit('activate', this.step.id)
    },
  },
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
    &.completed, &.inactive {
        padding-bottom: 1.5rem;
    }
    &.completed:not(.disabled):hover {
        cursor: pointer;
    }

}
.step-header__title.b-header {
        letter-spacing: normal;
}
.step-header__title {
    margin-bottom: 0.25rem;
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
    color: #ffffff;
}
.step-header__title.completed.disabled::before,
.step-header__title.inactive::before {
    background-color: #d8d8d8;
    color: #333333;
}
.step-header__caption {
    color: #333333;
}
.inactive .step-header__title,
.completed.disabled .step-header__title {
        color: #b0b0b0;
    }
@media only screen and (max-width: 768px) {
    .step-header__title {
        font-size: 1.125rem;
        padding-left: calc(var(--step-left-padding) + var(--counter-size));
        margin-bottom: 0.5rem;
        &::before {
            top: 1rem;
        }
    }
    .step-header__caption {
        font-size: 1rem;
        line-height: 1.5rem;
        font-weight: 400;
    }
    .step-header {
        padding-top: 1rem;
        padding-right: 0.5rem;
        &.completed, &.inactive {
            padding-bottom: 1rem;
        }
    }
}
</style>
