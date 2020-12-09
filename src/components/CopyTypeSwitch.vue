<template>
    <div class="toggle">
        <span
            id="label-short"
            ref="short"
            class="toggle-label selected"
        >license abbreviation</span>
        <input
            id="copy-type"
            :aria-labelledby="currentLabel"
            type="checkbox"
            name="copy-type"
            class="toggle-input"
            @input="onInput"
        >
        <span
            id="label-full"
            ref="full"
            class="toggle-label"
        >full license name</span>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    name: 'CopyTypeSwitch',
    data() {
        return {
            selected: 'short'
        }
    },
    computed: {
        currentLabel() {
            return `label-${this.selected}`
        }
    },
    methods: {
        ...mapMutations(['setAttributionType']),
        onInput(event) {
            const copyType = event.target.checked ? 'full' : 'short'
            this.selected = copyType
            this.$refs.full.classList.toggle('selected')
            this.$refs.short.classList.toggle('selected')
            this.setAttributionType(copyType)
        }
    }
}
</script>

<style lang="scss" scoped>
@supports (-webkit-appearance: none) or (-moz-appearance: none) {
    .toggle {
        display: flex;
        align-items: center;
        &-input {
            margin-left: 0.5rem;
            margin-right: 0.5rem;
            border: 2px solid #D8D8D8;
            appearance: none;
            outline: none;
            cursor: pointer;
            background: transparent;
            display: flex;
            align-items: center;
            width: 46px;
            height: 26px;
            border-radius: 23px;
            justify-content: left;

            &::after {
                content: '';
                background: #1547A8;
                width: 1rem;
                height: 1rem;
                margin-left: 2px;
                border-radius: 50%;
                transition: transform 300ms ease;
                transform: none;
                opacity: 1;
                border: none;
                position: static;
            }

            &:active,
            &:hover,
            &:focus {
                box-shadow: 0 0 0 2px rgba(176, 176, 176, 0.3);
                transition: box-shadow 400ms ease;
            }

            &:checked::after {
                    transition: transform 300ms ease-out;
                    transform: translateX(22px);
            }

        }
    }
}

.toggle-label {
    font-size: 0.8125rem;
    font-weight: 600;
    color: #d8d8d8;
    &.selected {
        color: #333;
    }
}
</style>
