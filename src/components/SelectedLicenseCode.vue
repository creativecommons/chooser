<template>
    <div class="license-code">
        <h2
            :class="'vocab-h2'"
        >
            {{this.$t('use-license-heading')}}</h2>
        <b-tabs
            class="attribution-tab"
            v-model="activeTab"
        >
            <b-tab-item :label="this.$t('rich-text-label')">
                <AttributionRichText
                    v-model="value"/>
            </b-tab-item>
            <b-tab-item :label="this.$t('html-label')">
                <div class='control' id='generated-html-container'>
                    <textarea id='attribution-html'
                              class='textarea'
                              :value="htmlElement()"
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
                <div class="dummy"></div>
            </b-tab-item>
        </b-tabs>
    </div>
</template>
<script>
import Clipboard from 'clipboard'
import { workAuthor, workLicense } from '@/utils/attributionHtml'
import AttributionRichText from './AttributionRichText'

export default {
    name: 'SelectedLicenseCode',
    props: ['value'],
    components: {
        AttributionRichText
    },
    data() {
        return {
            success: false,
            clipboard: null,
            currentTab: 0,
            copyText: this.$t('copy-label'),
            currentSelection: 'richtext'
        }
    },
    methods: {
        authorElement() {
            return workAuthor({
                creatorName: this.$props.value.attributionDetails.creatorName,
                creatorProfileUrl: this.$props.value.attributionDetails.creatorProfileUrl
            })
        },
        titleElement() {
            const workUrl = this.$props.value.attributionDetails.workUrl
            const workTitle = this.$props.value.attributionDetails.workTitle
            if (!workTitle && !workUrl) {
                return this.$t('this-work')
            } else {
                const titleSpan = workTitle ? `<span  rel="dc:title">${workTitle}</span>` : this.$t('this-work')
                if (workUrl) {
                    return `<a rel="cc:attributionURL" href="${workUrl}">${titleSpan}</a>`
                } else {
                    return titleSpan
                }
            }
        },
        workLicenseElement() {
            return workLicense(this.licenseURL,
                this.$props.value.shortName)
        },
        htmlElement() {
            const licenseText = this.$t('license-text', {
                workTitle: this.titleElement(),
                byLine: this.authorElement()
            })
            const licenseIcons = `<span class="license-icons">${this.workLicenseElement()}</span>`
            return `<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#">${licenseText}${licenseIcons}
                </p>`
        },
        onCopySuccess(e) {
            this.success = true
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
        licenseURL() {
            return this.$licenseUrl(this.$props.value.shortName)
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
                    this.copyText = this.$t('copied-label')
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
    div.license-code {
        margin-top: 0.4rem;
        h2.vocab-h2{
            font-family: Roboto Condensed;
            font-style: normal;
            font-weight: bold;
            font-size: 28px;
            line-height: 36px;
            letter-spacing: 0.02em;
            text-transform: uppercase;
        }
        div.attribution-tab {
            margin-bottom: 0;
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
                                    opacity:80%;

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
                                    opacity:100%;
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
</style>
