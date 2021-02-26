<template>
  <div
    :class="['control', sizeClass, {
      'has-icons-left': hasLeftIcon,
      'has-icons-right': hasRightIcon
    }]"
  >
    <label :class="[sizeClass]">
      <span
        v-if="label"
        class="label"
      >{{ label }}
        <span
          v-if="description"
          class="description"
        >{{ description }}</span>
      </span>
      <span :class="['control-inner', { 'disabled': isDisabled, 'readonly': isReadonly}]">
        <span
          v-if="hasLeftIcon"
          class="icon left-icon"
        >
          <slot name="left-icon" />
        </span>
        <input
          v-if="!isTextArea"
          class="input"
          :class="[sizeClass]"
          :placeholder="placeholder"
          :disabled="isDisabled"
          :type="type"
          :value="localValue"
          @input="onInput"
        >
        <textarea
          v-if="isTextArea"
          class="textarea"
          :value="localValue"
          :placeholder="placeholder"
          :disabled="isDisabled"
          :readonly="isReadonly"
          @input="onInput"
        />
        <span
          v-if="hasRightIcon"
          class="icon right-icon"
        >
          <slot name="right-icon" />
        </span>
      </span>
    </label>
  </div>
</template>
<script>
export default {
  name: 'VInput',
  props: {
    value: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    label: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    isTextArea: {
      type: Boolean,
      default: false,
    },
    isReadonly: {
      type: Boolean,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'is-normal',
      validate: function(value) {
        return ['is-normal', 'is-medium', 'is-large'].indexOf(value) > -1
      },
    },
  },
  data() {
    return {
      localValue: this.value,
    }
  },
  computed: {
    computedValue: {
      get() {
        return this.localValue
      },
      set(newVal) {
        this.localValue = newVal
        this.$emit('input', newVal)
      },
    },
    sizeClass() {
      return this.size === 'normal' ? '' : this.size
    },
    hasLeftIcon() {
      // Check if the 'left-icon' slot has content, return a boolean value
      return !!this.$slots['left-icon']
    },
    hasRightIcon() {
      // Check if the 'right-icon' slot has content, return a boolean value
      return !!this.$slots['right-icon']
    },
  },
  methods: {
    onInput(event) {
      this.localValue = event.target.value
      this.computedValue = event.target.value
    },
  },
}
// <!--'', is-medium, is-large in vocabulary; normal, big, huge in DL-->

</script>

<style lang="scss" scoped >
@import "~@creativecommons/vocabulary/scss/color.scss";
@import "~@creativecommons/vocabulary/scss/typography.scss";
.input, .textarea {
    border: none;
    &:hover, &:active, &:focus {
        border-color: $color-gray;
    }
}

.label, .description {
    display: block;
    margin-bottom: 0.5rem;
}
.label {
    font-weight: bold;
}
.description {
    font-weight: normal;
}
label {
    &.is-medium {
        .label, .description {
            font-size: $font-size-body-bigger;
        }
    }
}
.control {
  .icon {
        position: static;
        height: 1.25rem;
        width: 1.25rem;
        &.left-icon {
            margin-left: 1rem;
        }
        &.right-icon {
            margin-right: 1rem;
        }
        .icon-img {
            height: auto;
            width: 100%;
            pointer-events: none;
            cursor: unset;
            &.clickable {
                pointer-events: auto;
                cursor: pointer;
            }
        }
    }
    .control-inner {
        border: 0.125rem solid $color-light-gray;
        border-radius: 4px;
        background-color: white;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        &:hover:not(.disabled):not(.readonly),
        &:active:not(.disabled):not(.readonly),
        &:focus:not(.disabled):not(.readonly) {
            border-color: $color-gray;
            .icon {
                color: $color-gray;
            }
        }
        &.disabled {
            background-color: $color-lighter-gray;
            textarea {
                background-color: $color-lighter-gray;
            }
        }
    }
    .input {
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
        border-color: transparent;
        margin-top: 0;
    }

}
.control.is-large {
    .left-icon {
        margin-left: 1.5rem;
    }
    .right-icon {
        margin-right: 1.5rem;
    }
}
</style>
