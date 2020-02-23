<template>
    <div class="license-code">
        <b-tabs
            class="attribution-tab"
            v-model="activeTab">
            <b-tab-item :label="this.$t('license-use.plain-text-label')">
                <div id="attribution-plaintext">
                    <LicenseCode ref="licenseCode" attribution-type="print"/>
                </div>
            </b-tab-item>
            <b-tab-item icon-pack="fas" icon="copy">
                <template slot="header">
                    <a class="copyBtn"
                        data-clipboard-target="#attribution-plaintext">
                        <b-icon
                            icon-pack="fas"
                            icon="copy"/>
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

export default {
    name: 'PrintMediaLicenseCode',
    components: {
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
    }
}
</script>
<style lang="scss">
    .attribution-tab .photo-license-icon {
        height: 26px;
    }
    #attribution-richtext>p>span,
    #attribution-richtext .photo-license-icons{
        height: 26px;
        vertical-align: middle;
    }
    #attribution-richtext p {
        margin-top: 1rem;
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
    #generated-html-container {
        padding-top:10px;
        padding-bottom: 10px;
        textarea {
            word-break: break-all;
            -ms-word-break: break-all;
            min-height: 60px;
            font-family: "Source Sans Pro", "Noto Sans", Arial, "Helvetica Neue", Helvetica, sans-serif;
            font-size:0.845rem;
        }
    }
    #generated-richtext-container {
        margin-top: 1rem;
        display: block;
        .attribution-license-icons {
            vertical-align: middle;
            margin-top: 0;
            margin-left: 2px;
        }
        p {
            display: inline
        }
    }
</style>
