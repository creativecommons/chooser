<template>
  <div class="step-actions">
    <div :class="['field', yesSelected]">
      <v-radio
        v-model="radio"
        native-value="yes"
        name="radio"
      >
        <span class="body-normal">{{ $t('stepper.yes') }}{{ $t(yesText) }}</span>
      </v-radio>
    </div>
    <div :class="['field', noSelected]">
      <v-radio
        v-model="radio"
        native-value="no"
        name="radio"
      >
        <span class="body-normal">{{ $t('stepper.no') }}{{ $t(noText) }}</span>
      </v-radio>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChooserStep',
  inheritAttrs: false,
  props: {
    name: String,
    selected: Boolean,
    id: Number,
    enabled: Boolean,
    disabledDue: String,
  },
  computed: {
    /**
         * NC, ND and SA steps are reversed: unlike BY, they are selected when the user
         * answers no, and not selected when the user answers yes
         * @returns {boolean}
         */
    reversed() {
      return ['NC', 'ND', 'SA'].indexOf(this.$props.name) > -1
    },
    showDisabledDue() {
      return !this.$props.enabled && this.$props.disabledDue !== undefined
    },
    qualifier() {
      return this.reversed ? !this.selected : this.selected
    },
    radio: {
      get() {
        if (this.$props.selected === undefined) {
          return undefined
        } else {
          return this.qualifier ? 'yes' : 'no'
        }
      },
      set(newVal) {
        let selected = newVal === 'yes'
        selected = this.reversed ? !selected : selected
        this.$emit('change', { name: this.$props.name, id: this.$props.id, selected })
      },
    },
    tPrefix() {
      return `stepper.${this.$props.name}`
    },
    yesText() {
      return `${this.tPrefix}.selected`
    },
    noText() {
      return `${this.tPrefix}.not-selected`
    },
    yesSelected() {
      return this.selected ? 'selected' : 'not-selected'
    },
    noSelected() {
      return !this.selected ? 'selected' : 'not-selected'
    },
  },
}
</script>
