<template>
    <div class="license-code">
        <b-tabs
            class="attribution-tab"
            v-model="activeTab"
        >
            <b-tab-item :label="this.$t('use-license.rich-text-label')">
                <div id="attribution-richtext">
                <p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#">
                    <span v-html="this.licenseCodeTextSpan" />
                    <LicenseIcons
                        :url="this.licenseUrl"
                        :iconsArr="this.iconsList"/>
                </p>
                </div>
            </b-tab-item>
            <b-tab-item :label="this.$t('use-license.html-label')">
                <div class='control' id='generated-html-container'>
                    <textarea id='attribution-html'
                              class='textarea'
                              :value="htmlLicenseParagraph"
                              readonly
                    />
                </div>
            </b-tab-item>
            <b-tab-item
                icon-pack="fas"
                icon="copy"
            >
                <template slot="header">
                    <a
                        :class="'copyBtn'"
                        :data-clipboard-target=this.clipboardTarget()>
                        <b-icon
                            icon-pack="fas"
                            icon="copy"/>
                        <span class="button-text">{{ copyText }}
                        </span>
                    </a>
                </template>
                <div class="dummy" />
            </b-tab-item>
        </b-tabs>
    </div>
</template>
<script>
import Clipboard from 'clipboard'
import LicenseIcons from './LicenseIcons'
import { mapGetters, mapState } from 'vuex'

export default {
    name: 'SelectedLicenseCode',
    components: {
        LicenseIcons
    },
    props: ['value'],
    data() {
        return {
            success: false,
            clipboard: null,
            currentTab: 0,
            copyText: this.$t('use-license.copy-label'),
            currentSelection: 'richtext'
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
                    codeType: this.currentSelection,
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
            return `#attribution-${this.currentSelection}`
        }
    },
    computed: {
        ...mapState({ attributionDetails: state => state.attributionDetails }),
        ...mapGetters(['shortName', 'fullName', 'iconsList', 'licenseUrl']),
        licenseLink() {
            const short = this.shortName.toUpperCase()
            const attrs = 'target="_blank" rel="license noopener noreferrer" style="display: inline-block;">'
            return `<a href="${this.licenseUrl}" ${attrs}${short}</a>`
        },
        authorElement() {
            const name = this.attributionDetails.creatorName
            const profile = this.attributionDetails.creatorProfileUrl
            if (name) {
                const creatorNameNoLink = `<span rel="cc:attributionName">${name}</span>`
                return profile
                    ? `by <a rel="cc:attributionURL"  href="${profile}">${creatorNameNoLink}</a>`
                    : `by ${creatorNameNoLink}`
            } else return ''
        },
        titleElement() {
            const workUrl = this.attributionDetails.workUrl
            const workTitle = this.attributionDetails.workTitle
            if (!workTitle && !workUrl) {
                return this.$t('code-text.this-work')
            } else {
                const titleSpan = workTitle ? `<span rel="dc:title">${workTitle}</span>`
                    : this.$t('code-text.this-work')
                if (workUrl) {
                    return `<a rel="cc:attributionURL" href="${workUrl}">${titleSpan}</a>`
                } else {
                    return titleSpan
                }
            }
        },
        licenseCodeTextSpan() {
            const attributionCode = this.$t('code-text.license-text', {
                workTitle: this.titleElement,
                byLine: this.authorElement
            })
            return `${attributionCode}${this.licenseLink}`
        },
        htmlLicenseParagraph() {
            let short = this.shortName
            const iconStyle = 'style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;opacity:0.7;"'
            const baseAssetsPath = 'https://search.creativecommons.org/static/img'
            let licenseIcons = `<img ${iconStyle} src="${baseAssetsPath}/cc_icon.svg" />`
            if (short.includes('CC0')) {
                short = 'CC CC0 1.0'
            }
            licenseIcons += short.slice(3, short.length - 4).split('-').map(license =>
                `<img  ${iconStyle} src="${baseAssetsPath}/cc-${license.toLowerCase()}_icon.svg" />`
            ).join('')
            const licenseIconsLink = `<a href="${this.licenseURL}">${licenseIcons}</a>`
            const ccrelcode = 'xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#"'
            return `<p ${ccrelcode}>${this.licenseCodeTextSpan}${licenseIconsLink}</p>`
        },
        activeTab: {
            get() { return this.currentTab },
            set(val) {
                if (val !== 2) {
                    this.currentTab = val
                } else {
                    this.currentSelection = this.currentTab === 0 ? 'richtext' : 'html'
                    const tab = this.currentTab
                    this.currentTab = 2
                    this.copyText = this.$t('use-license.copied-label')
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
    #attribution-richtext p {
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
    .use-license-hint {
        text-align: center;
    }
    .use-license-hint a {
        text-decoration: underline;
    }
    .use-license-hint span {
        vertical-align: middle;
    }
    .license-code {
        margin-top: 0.4rem;
        div.attribution-tab {
            margin-bottom: 1rem;
            nav.tabs {
                margin-bottom: 0;
                ul {
                    li {
                        & > a {
                            & > span {
                                    font-style: normal;
                                    font-weight: 700;
                                    font-size: 12px;
                                    line-height: 18px;
                                    text-transform: uppercase;
                                    letter-spacing: 0.5px;
                                    color: #333333;
                                    opacity:0.8;

                            }
                        }
                        &:last-of-type{
                            margin-left: auto;
                            margin-bottom: -1px;
                            a {
                                padding:0;
                            }
                            & > a {
                                padding: 0.3em 1em;
                                span a.copyBtn {
                                    border-bottom: none;
                                }
                            }
                        }
                        &.is-active {
                            a {
                                border-bottom-width: 3px;
                                span{
                                    font-weight: 700;
                                    opacity:1;
                                }
                            }
                        }
                    }
                }
            }
            section.tab-content {
                margin-top:0;
                padding: 0;
                div.tab-item {
                    height: 60px;
                    div#generated-html-container {
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
                    div#generated-richtext-container {
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
                }
            }
        }
    }

    @media only screen and (max-width: 1024px) {
        .card {
            height: auto!important;
        }
    }
</style>
