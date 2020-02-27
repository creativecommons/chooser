<template>
    <div class="license-code">
        <b-tabs
            v-model="activeTab"
            class="attribution-tab"
        >
            <b-tab-item :label="this.$t('license-use.plain-text-label')">
                <div id="attribution-plaintext">
                    <LicenseCode
                        ref="licenseCode"
                        attribution-type="print"
                    />
                </div>
            </b-tab-item>
            <b-tab-item>
                <template slot="header">
                    <a
                        class="copyBtn"
                        data-clipboard-target="#attribution-plaintext"
                    >
                        <font-awesome-icon icon="copy" />
                        <span class="button-text">{{ copyText }}</span>
                    </a>
                </template>
                <div class="dummy" />
            </b-tab-item>
        </b-tabs>
    </div>
</template>
<script>
import Clipboard from 'clipboard'
import { mapGetters } from 'vuex'
import LicenseCode from './LicenseCode'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
    name: 'PrintMediaLicenseCode',
    components: {
        FontAwesomeIcon,
        LicenseCode
    },
    props: {
        value: Object
    },
    data() {
        return {
            success: false,
            clipboard: null,
            currentTab: 0,
            copyText: this.$t('license-use.copy-label')
        }
    },
    computed: {
        ...mapGetters(['shortName', 'fullName', 'iconsList', 'licenseUrl']),
        attributionDetails() {
            return this.$store.state.attributionDetails
        },
        activeTab: {
            get() { return this.currentTab },
            set(val) {
                if (val !== 1) {
                    this.currentTab = val
                } else {
                    this.currentSelection = this.currentTab === 0 ? 'richtext' : 'html'
                    const tab = this.currentTab
                    this.currentTab = 1
                    this.copyText = this.$t('license-use.copied-label')
                    setTimeout(() => {
                        this.currentTab = tab
                    }, 1)
                    setTimeout(() => {
                        this.copyText = 'Copy'
                    }, 2000)
                }
            }
        }
    },
    mounted() {
        this.clipboard = new Clipboard('.copyBtn')
        this.clipboard.on('success', this.onCopySuccess)
        this.clipboard.on('error', this.onCopyError)
    },
    destroyed() {
        this.clipboard.destroy()
    },
    methods: {
        onCopySuccess(e) {
            this.success = true
            if (process.env.NODE_ENV === 'production') {
                const fieldsFilled = {}
                for (const detail in this.attributionDetails) {
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
            this.$emit('copied', { content: e.text })
            setTimeout(() => {
                this.success = false
            }, 2000)
            e.clearSelection()
        },
        onCopyError(e) {
            this.$emit('copyFailed')
            e.clearSelection()
        }
    }
}
</script>
<style lang="scss">
    .copyBtn svg {
        margin-right: 3px;
    }

    .attribution-tab .photo-license-icon {
        height: 1.4rem;
    }

    #attribution-plaintext p {
        margin-top: 0.5rem;
        margin-bottom: 1rem;
    }
    .license-use-hint {
        text-align: center;
    }
    .license-use-hint a {
        text-decoration: underline;
    }
    .license-use-hint span {
        vertical-align: middle;
    }
    .license-code .attribution-tab .tabs span {
        font-style: normal;
        color: #B0B0B0;
        font-size: 16px;
        line-height: 24px;
    }
    .license-code .attribution-tab li:last-of-type {
        margin-left: auto;
        margin-bottom: -1px;
        a {
            padding:0;
        }
        & > a {
            padding: 0.5em 1em;
            a.copyBtn {
                border-bottom: none;
                span, .button-text {
                    color: #333333;
                }
            }
        }
    }

    .license-code {
        margin-top: 0.4rem;
        .attribution-tab {
            margin-bottom: 1rem;
            .tabs {
                margin-bottom: 0;
            }
            .tab-content {
                margin-top:0;
                padding: 0;
                .tab-item {
                    height: 60px;
                }
            }
        }
    }
</style>
