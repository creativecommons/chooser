<template>
  <div class="control" :class="{ 'is-expanded': expanded }">
    <span class="select" :class="spanClasses">
      <select
        ref="select"
        v-bind="$attrs"
        v-model="computedValue"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
      >
        <template v-if="placeholder">
          <option v-if="computedValue == null" :value="null" disabled hidden>
            {{ placeholder }}
          </option>
        </template>
        <slot />
      </select>
    </span>
    <slot name="left-icon" />
  </div>
</template>

<script>
export default {
  name: 'VSelect',
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number],
      default: null,
    },
    placeholder: {
      type: String,
      default: '',
    },
    expanded: Boolean,
  },
  data() {
    return {
      selected: this.value,
      elementRef: 'select',
    }
  },
  computed: {
    computedValue: {
      get() {
        return this.selected
      },
      set(value) {
        this.selected = value
        this.$emit('input', value)
      },
    },
    spanClasses() {
      return [
        this.size,
        this.statusType,
        {
          'is-fullwidth': this.expanded,
          'is-empty': this.selected === null,
        },
      ]
    },
  },
  watch: {
    /**
     * When v-model is changed:
     *   1. Set the selected option.
     *   2. If it's invalid, validate again.
     */
    value(value) {
      this.selected = value
    },
  },
}
</script>
