<template>
    <div class="copy-tools">
        <copy-type-switch
            v-if="clipboardTarget!=='.xmp'"
            @change-copy-type="changeCopyType"
        />
        <v-button
            v-if="clipboardTarget!=='.xmp'"
            class="donate small copy-button"
            :data-clipboard-target="clipboardTarget"
            @click="handleCopy"
        >
            {{ copyLabel }}
        </v-button>
        <v-button
            v-else
            class="donate small copy-button is-xmp"
        >
            {{ xmpLabel }}
        </v-button>
    </div>
</template>

<script>
import CopyTypeSwitch from '@/components/CopyTypeSwitch'
import Clipboard from 'clipboard'
export default {
    name: 'CopyTools',
    components: { CopyTypeSwitch },
    props: {
        clipboardTarget: {
            type: String,
            default: '.license-text'
        }
    },
    data() {
        return {
            copyType: 'short',
            copyLabel: this.$t('license-use.copy-label'),
            xmpLabel: this.$t('license-use.xmp-label')
        }
    },
    mounted() {
        this.clipboard = new Clipboard('.copy-button')
        this.clipboard.on('success', this.onCopySuccess)
        this.clipboard.on('error', this.onCopyError)
    },
    destroyed() {
        this.clipboard.destroy()
    },
    methods: {
        changeCopyType() {
            this.copyType = this.copyType === 'short' ? 'full' : 'short'
            this.$emit('change-copy-type', this.copyType)
        },
        handleCopy() {
            this.copyLabel = this.$t('license-use.copied-label')
            setTimeout(() => {
                this.copyLabel = this.$t('license-use.copy-label')
            }, 2000)
        },
        onCopySuccess(e) {
            this.success = true
            if (process.env.NODE_ENV === 'production') {
                const fieldsFilled = {}
                for (const detail in Object.keys(this.attributionDetails)) {
                    fieldsFilled[detail] = this.attributionDetails[detail] !== ''
                }
                const copiedLicense = {
                    license: this.shortName,
                    // codeType can be either rich-text or html
                    codeType: 'plaintext',
                    fieldsFilled: fieldsFilled
                }
                this.$ga.event({
                    eventCategory: 'Attribution',
                    eventAction: 'copied',
                    eventLabel: JSON.stringify(copiedLicense)
                })
            }
            setTimeout(() => {
                this.success = false
            }, 2000)
            e.clearSelection()
        },
        onCopyError(e) {
            e.clearSelection()
        }
    }
}
</script>

<style lang="scss" scoped>
.copy-tools {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border: 0.125rem solid #d8d8d8;
    border-top: none;
    background-color: white;
    padding: 0 1.5rem 1.5rem;
    border-bottom-left-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
}
.button.donate.small {
    justify-content: center;
    &.is-xmp {
        width: fit-content;
    }
}
@media only screen and (max-width: 768px) {
    .copy-tools {
        flex-direction: column;
        align-items: flex-start;
        padding: 0 1rem 1rem;
    }
}
</style>
