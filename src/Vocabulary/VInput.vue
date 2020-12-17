<template>
    <div :class="[ 'control', sizeClass, { 'has-icons-left': hasLeftIcon } ]">
        <label :class="sizeClass">
            <span
                v-if="label"
                :class="['label', { 'label-bold': isLabelBold}]"
            >{{ label }}</span>
            <span
                v-if="description"
                class="description"
            >{{ description }}</span>
            <span class="control-inner">
                <span
                    v-if="hasLeftIcon"
                    class="icon is-left"
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
                    class="icon is-right"
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
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        },
        label: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        icon: {
            type: [String, null],
            default: null
        },
        isTextArea: {
            type: Boolean,
            default: false
        },
        isReadonly: {
            type: Boolean,
            default: false
        },
        isDisabled: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: 'is-normal',
            validate: function(value) {
                return ['is-normal', 'is-medium', 'is-large'].indexOf(value) > -1
            }
        },
        hasLeftIcon: {
            type: Boolean,
            default: false
        },
        hasRightIcon: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            localValue: this.value
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
            }
        },
        sizeClass() {
            return this.size === 'normal' ? '' : this.size
        },
        isLabelBold() {
            // label should be bold only if there is no description
            return !this.description
        }
    },
    methods: {
        onInput(event) {
            this.localValue = event.target.value
            this.computedValue = event.target.value
        }
    }
}
// <!--'', is-medium, is-large in vocabulary; normal, big, huge in DL-->

</script>

<style lang="scss" scoped >
@import "~@creativecommons/vocabulary/scss/color.scss";
@import "~@creativecommons/vocabulary/scss/typography.scss";
.input, .textarea {
    border-color: $color-light-gray;
    border-width: 0.125rem;
    &:hover, &:active, &:focus {
        border-color: $color-gray;
    }
}
.label, .description {
    color: $color-dark-slate-gray;
    display: block;
    margin-bottom: 0.5rem;
}
.label-bold {
    font-weight: 700;
}
label {
    &.is-medium {
        .label, .description {
            font-size: $font-size-body-bigger;
        }
    }
}
.control.has-icons-left, .control.has-icons-right {
    .control-inner {
        border: 0.125rem solid $color-light-gray;
        border-radius: 4px;
        background-color: white;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        &:hover, &:active, &:focus {
            border-color: $color-gray;
            .icon {
                color: $color-gray;
            }
        }
    }
    .input {
        width: calc(100% - 4.25rem);
        padding-left: 1rem;
        border-color: transparent;
        margin-top: 0;
    }
    .icon {
        .icon-svg {
            height: auto;
            width: 100%;
            &.clickable {
                pointer-events: all;
                cursor: pointer;
            }
        }
    }
}

.control.has-icons-left, .control.has-icons-right {
    .icon {
        position: static;
        height: 1.25rem;
        width: 1.25rem;
        &.is-left {
            margin-left: 1rem;
        }
        &.is-right {
            margin-right: 1rem;
        }
    }
}

</style>
