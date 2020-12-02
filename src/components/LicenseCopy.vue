<template>
    <div class="license-code">
        <b-tabs
            v-model="activeTab"
            class="attribution-tab"
        >
            <b-tab-item :label="this.$t(firstTabLabel)">
                <div
                    :id="textAttributionId"
                    class="attribution-text"
                >
                    <LicenseCode :attribution-type="textAttributionType" />
                </div>
            </b-tab-item>
            <b-tab-item
                v-if="isWeb"
                :label="this.$t('license-use.html-label')"
            >
                <div
                    class="generated-html-container control"
                >
                    <textarea
                        :id="htmlAttributionId"
                        class="attribution-html-textarea textarea"
                        :value="htmlLicenseParagraph"
                        readonly
                    />
                </div>
            </b-tab-item>
            <b-tab-item>
                <template slot="header">
                    <a
                        class="copyBtn"
                        :data-clipboard-target="clipboardTarget()"
                    >
                        <font-awesome-icon icon="copy" />
                        <span class="button-text">{{ copyText }}</span>
                    </a>
                </template>
            </b-tab-item>
        </b-tabs>
    </div>
</template>
<script>
import Clipboard from 'clipboard'
import { mapGetters } from 'vuex'
import LicenseCode from './LicenseCode'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { generateHTML } from '../utils/license-utilities'

export default {
    name: 'LicenseCopy',
    components: {
        FontAwesomeIcon,
        LicenseCode
    },
    props: {
        isWeb: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            success: false,
            clipboard: null,
            currentTab: 0,
            copyText: this.$t('license-use.copy-label'),
            currentSelection: 'text'
        }
    },
    computed: {
        ...mapGetters(['shortName', 'fullName', 'iconsList', 'licenseUrl']),
        attributionDetails() {
            return this.$store.state.attributionDetails
        },
        tabsCount() {
            return this.isWeb ? 2 : 1
        },
        firstTabLabel() {
            return this.isWeb ? 'license-use.rich-text-label' : 'license-use.plain-text-label'
        },
        attributionIdPrefix() {
            return this.isWeb ? 'attribution-web-' : 'attribution-print-'
        },
        textAttributionId() {
            return `${this.attributionIdPrefix}-text`
        },
        htmlAttributionId() {
            return `${this.attributionIdPrefix}-html`
        },
        textAttributionType() {
            return this.isWeb ? 'web' : 'print'
        },
        htmlLicenseParagraph() {
            const { work, creator, license, paragraph } = generateHTML(this.attributionDetails, this.shortName)
            const licenseCodeSpan = this.$i18n.t('license-use.richtext.full-text', {
                workTitle: work || this.$i18n.t('license-use.richtext.workTitle'),
                creator,
                license,
                by: creator ? this.$i18n.t('license-use.richtext.by') : '',
                'licensed-text': this.$i18n.t('license-use.richtext.licensed-text')
            })
            return `${paragraph}${licenseCodeSpan}</p>`
        },
        activeTab: {
            get() { return this.currentTab },
            set(val) {
                if (val !== this.tabsCount) {
                    this.currentTab = val
                } else {
                    this.currentSelection = this.currentTab === 0 ? 'text' : 'html'
                    const tab = this.currentTab
                    this.currentTab = this.tabsCount
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
        },
        clipboardTarget() {
            return `#${this.attributionIdPrefix}-${this.currentSelection}`
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

    .attribution-text p {
        margin-top: 0.5rem;
        margin-bottom: 1rem;
        background-color: #fff;
        padding: 24px 0 0 24px;
        height: 100px;
    }
    .generated-html-container {
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .generated-html-container .attribution-html-textarea.textarea {
        word-break: break-all;
        -ms-word-break: break-all;
        min-height: 60px;
        font-family: Source Sans Pro, Noto Sans, Arial, Helvetica Neue, Helvetica, sans-serif;
        font-size: .845rem;
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
        color: #b0b0b0;
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
