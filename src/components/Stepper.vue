<template>
  <div class="stepper__container">
    <div
      v-for="(step, idx) in visibleSteps()"
      :key="idx"
      :ref="`step-${idx}`"
      :class="['step-container', `step-${step.id}`, step.name, step.status, { disabled: !step.enabled }]"
    >
      <step-header
        :step="step"
        @activate="setActiveStep(step.id)"
      />
      <div
        v-if="step.status==='active'"
        class="step-content"
      >
        <component
          :is="stepActionComponent(step)"
          v-bind="stepActionProps(step)"
          @change="changeStepSelected"
        />
        <StepNavigation
          :step-name="step.name"
          :is-next-enabled="isNextEnabled(step.id)"
          @navigate="navigate"
          @restart="restart"
          @done="done"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ChooserStep from './ChooserStep'
import AttributionDetailsStep from './AttributionDetailsStep'
import CopyrightWaiverStep from './CopyrightWaiverStep'
import DropdownStep from './DropdownStep'
import StepHeader from './StepHeader'
import StepNavigation from './StepNavigation'
import { updateVisibleEnabledStatus } from '@/utils/license-utilities'
import { initialSteps } from '@/utils/steps'

export default {
  name: 'Stepper',
  components: {
    ChooserStep,
    AttributionDetailsStep,
    CopyrightWaiverStep,
    DropdownStep,
    StepHeader,
    StepNavigation,
  },
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      steps: [...initialSteps],
    }
  },
  computed: {
    activeStepId: {
      get() { return this.$props.value },
      set(newVal) {
        this.$emit('input', newVal)
      },
    },
  },
  created: function() {
    /**
         * Updates the steps array when license is changed in store through dropdown selection
         */
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'updateAttributesFromShort') {
        for (const step in this.steps) {
          const { id, name, selected } = this.steps[step]
          const isAttrSelected = state.currentLicenseAttributes[name]
          if (this.isLicenseAttribute(name) && selected !== isAttrSelected) {
            this.$set(this.steps, id, { ...this.steps[id], selected: isAttrSelected })
            this.updateDisabledAndVisibleSteps(name, isAttrSelected)
          }
        }
      }
    })
  },
  methods: {
    stepActionComponent({ name }) {
      switch (name) {
      case 'CW': return CopyrightWaiverStep
      case 'DD': return DropdownStep
      case 'AD': return AttributionDetailsStep
      default: return ChooserStep
      }
    },
    stepActionProps(step) {
      return { ...step }
    },
    isLicenseAttribute(stepName) {
      return ['BY', 'NC', 'ND', 'SA'].indexOf(stepName) > -1
    },
    /**
         * Checks if the Next button should be disabled. Next button is enabled only
         * after the user has interacted with the step (selected radio or checked a checkbox)
         * @param {number} id
         * @returns {Boolean} next button's disabled status
         */
    isNextEnabled(id) {
      return this.steps[id].selected !== undefined
    },
    navigate({ direction, name }) {
      // Back and next
      direction === 'next' ? this.handleNext(name) : this.handlePrevious()
    },
    restart() {
      this.steps = [...initialSteps]
      this.$store.commit('restoreLicenseAttr')
      this.$emit('restart')
    },
    done() {
      this.$emit('done')
    },
    /**
         * When a user interacts with a step, updates:
         * 1. 'selected' property for the step in steps array
         * 2. if the step is for license attribute, its value in Vuex store
         * 3. 'enabled' and 'visible' properties of other steps affected by active step selection
         * @param {String} stepName
         * @param {Number} id
         * @param {Boolean} selected
         */
    changeStepSelected({ name, id, selected }) {
      if (this.isLicenseAttribute(name)) {
        this.$store.commit('setSelected', { name, selected })
        // When the user first selects a license attribute, the dropdown step's Next button should be enabled
        // as the dropdown will be populated with the selected license from the state
        const DROPDOWN_STEP = 5
        if (this.steps[DROPDOWN_STEP].selected === undefined && name === 'BY') {
          this.$set(this.steps, DROPDOWN_STEP, { ...this.steps[DROPDOWN_STEP], selected: true })
        }
      }
      this.$set(this.steps, id, { ...this.steps[id], selected: selected })
      this.updateDisabledAndVisibleSteps()
    },
    handleNext(name) {
      /**
             * Updates state when 'Next' button is clicked if active step has been interacted with
             *
             * Finds the next available enabled and visible step, sets its status to 'active',
             * and steps before that to 'completed'
             */
      const id = this.activeStepId
      const stepSelected = this.steps[id].selected
      if (stepSelected === undefined && id <= 6) return
      const nextStep = this.steps.slice(id + 1).find(step => step.visible && step.enabled).id
      this.$set(this.steps, id, { ...this.steps[id], status: 'completed' })
      if (nextStep - id > 1) {
        for (let i = id + 1; i < nextStep; i++) {
          this.$set(this.steps, i, { ...this.steps[i], status: 'completed', disabledDue: name })
        }
      } else {
        this.$set(this.steps, id, { ...this.steps[id], status: 'completed' })
      }
      this.$set(this.steps, nextStep, { ...this.steps[nextStep], status: 'active' })
      this.activeStepId = nextStep
    },
    handlePrevious() {
      /**
             * Updates state when 'Previous' button
             *
             * Finds the previous enabled and visible step, sets its status to 'active',
             * and steps after that to 'inactive'
             */

      let previousStep = this.activeStepId
      for (let i = this.activeStepId - 1; i >= 0; i--) {
        const thisStep = this.steps[i]
        if (thisStep.visible && thisStep.enabled) {
          previousStep = this.steps[i].id
          break
        }
      }
      if (this.activeStepId - previousStep > 1) {
        for (let i = this.activeStepId; i > previousStep; i--) {
          this.$set(this.steps, i, { ...this.steps[i], status: 'inactive' })
        }
      } else {
        this.$set(this.steps, this.activeStepId, { ...this.steps[this.activeStepId], status: 'inactive' })
      }
      this.$set(this.steps, previousStep, { ...this.steps[previousStep], status: 'active' })
      this.activeStepId = previousStep
    },
    setActiveStep(clickedStepId) {
      /**
             * Handles a click on Step header
             */
      if (!this.steps[clickedStepId].enabled) return
      if (this.steps[clickedStepId].status === 'inactive') return
      // only steps before the active one are clickable
      if (clickedStepId >= this.activeStepId) return
      for (let i = this.activeStepId; i > clickedStepId; i--) {
        this.$set(this.steps, i, { ...this.steps[i], status: 'inactive' })
      }
      this.$set(this.steps, clickedStepId, { ...this.steps[clickedStepId], status: 'active' })
      this.activeStepId = clickedStepId
    },
    setStepsVisible(stepsToSetVisible) {
      // sets steps in stepsToSetVisible array visible properties to true
      this.steps.forEach((step) => {
        if (stepsToSetVisible.indexOf(step.name) > -1 && !step.visible) {
          this.$set(this.steps, step.id, { ...step, visible: true })
        } else if (stepsToSetVisible.indexOf(step.name) === -1 && step.visible) {
          this.$set(this.steps, step.id, { ...step, visible: false })
        }
      })
    },
    setStepsEnabled(stepsToSetEnabled, disabledDue) {
      // sets steps in stepsToSetDisabled array enabled properties to false
      const shouldSetEnabled = (step) => stepsToSetEnabled.indexOf(step.name) > -1 && !step.enabled
      const shouldSetDisabled = (step) => stepsToSetEnabled.indexOf(step.name) === -1 && step.enabled
      this.steps.forEach((step) => {
        // step is currently enabled, but should be disabled
        if (shouldSetDisabled(step)) {
          this.$set(this.steps, step.id, { ...step, enabled: false, disabledDue: disabledDue })
        } else if (shouldSetEnabled(step)) {
          // step is currently disabled, but should be set enabled
          this.$set(this.steps, step.id, { ...step, enabled: true, disabledDue: '' })
        }
      })
    },
    updateDisabledAndVisibleSteps() {
      /**
             * Creates an array of steps that should be visible/enabled based on data from steps array
             * and updates the steps array
             */
      const stepsStatusData = {}

      this.steps.forEach((step) => {
        stepsStatusData[step.name] = step.selected
      })
      const { visible, enabled, disabledDue } = updateVisibleEnabledStatus(stepsStatusData)
      this.setStepsVisible(visible)
      this.setStepsEnabled(enabled, disabledDue)
    },
    visibleSteps() {
      return this.steps.filter(step => {
        return step.visible
      })
    },
  },
}
</script>

<style lang="scss">
    .step-container {
        background-color: white;
        border: var(--border-width) solid #d8d8d8;
        border-bottom: none;
        max-width: 100%;
        position: relative;

        --counter-size: 1.875rem;
        --h-padding: 1.5rem;
        --step-left-padding: calc(var(--h-padding) + var(--counter-size) + 1rem);
        &:first-child {
            border-top-left-radius: 0.25rem;
            border-top-right-radius: 0.25rem;
        }
        &:last-child {
            border-bottom: 2px solid #d8d8d8;
            border-bottom-left-radius: 0.25rem;
            border-bottom-right-radius: 0.25rem;
        }
    }
    .step-content {
        padding: 0.5rem 1.5rem 0.5rem var(--step-left-padding);
    }
    .step-container.completed:not(.disabled):hover,
    .step-container.completed:not(.disabled):focus-within {
        border-color: #b0b0b0;
        border-bottom: 0.125rem solid #b0b0b0;
        & .step-content {
            cursor: pointer;
        }
    }
    .step-container.completed:not(.disabled):hover + .step-container {
        border-top: none;
    }
    .step__container.completed {
        .step-header__title {
            color: black;
            background-color: #ffffff;
        }
    }
    .inactive {
        background-color: #F5F5F5;
    }
    .completed.disabled {
        color: #b0b0b0;
    }

    .inactive .step-header__title::before {
        background: #d8d8d8;
        color: #333333;
    }
    .slide-fade-enter-active {
        transition: translate .5s ease, opacity 0.3s ease-in;
    }
    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateY(-50px);
        opacity: 0;
    }
    .slide-enter-active {
        animation: slide-down .4s;
    }
    .slide-leave-active {
        animation: slide-down .3s reverse;
    }
    @keyframes slide-down {
        0% {
            opacity: 0;
            transform: translateY(-100px);
        }

        /* 50% { */

        /*    transform: scaleY(0.5); */

        /* } */

        100% {
            opacity: 1;
            transform: translateY(0);

            /* transform: scaleY(1); */
        }
    }
    @media only screen and (max-width: 768px) {
        .step-container {
            --h-padding: 1rem;
            --step-left-padding: 1rem;
            --counter-size: 1.4375rem;
            &:last-child {
                border-bottom: 2px solid #d8d8d8;
                margin-bottom: 1rem;
            }
        }
        .step-content {
            padding-right: 0.5rem;
        }
    }
</style>
