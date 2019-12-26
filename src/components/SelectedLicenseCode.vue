<template>
    <div class="license-code">
        <h2
            :class="'vocab-h2'"
        >
            Use Your License</h2>
        <b-tabs
            class="attribution-tab"
            v-model="activeTab"
        >
            <b-tab-item label="Rich Text">
                <AttributionRichText
                    v-model="value"/>
            </b-tab-item>
            <b-tab-item label="HTML">
                <div class='control' id='generated-html-container'>
                    <textarea id='attribution-html'
                              class='textarea'
                              :value='attributionHTML()'
                              readonly/>
                </div>
            </b-tab-item>
            <b-tab-item
                icon-pack="fas"
                icon="copy"
            >
                <template slot="header">
                    <a
                        :class="'copyBtn'"
                        :data-clipboard-target=this.clipboardTarget>
                        <b-icon
                            icon-pack="fas"
                            icon="copy"/>
                        {{ copyText }}
                    </a>
                </template>
                <div class="dummy"></div>
            </b-tab-item>
        </b-tabs>
    </div>
</template>
<script>
import Clipboard from 'clipboard'
import attributionHtml from '@/utils/attributionHtml'
import licenseUrl from '@/utils/licenseUrl'
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
            copyText: 'Copy'
        }
    },
    methods: {
        attributionHTML() {
            return attributionHtml({
                workUrl: this.$props.value.personalDetails.workUrl,
                workTitle: this.$props.value.personalDetails.workTitle,
                authorName: this.$props.value.personalDetails.authorName,
                sourceWorkUrl: this.$props.value.personalDetails.sourceWorkUrl
            },
            this.licenseURL,
            this.$props.value.shortName
            )
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
        }
    },
    computed: {
        licenseURL() {
            return licenseUrl(this.$props.value.shortName)
        },
        activeTab: {
            get() { return this.currentTab },
            set(val) {
                if (val !== 2) {
                    this.currentTab = val
                } else {
                    const tab = this.currentTab
                    this.currentTab = 2
                    this.copyText = 'Copied!'
                    setTimeout(() => {
                        this.currentTab = tab
                    }, 1)
                    setTimeout(() => {
                        this.copyText = 'Copy'
                    }, 2000)
                }
            }
        },
        clipboardTarget() {
            if (this.activeTab === 0) {
                return '#attribution-richtext'
            } else {
                return '#attribution-html'
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
<style>
    .collapsible-button {
        height: 50px;
        background-color: #ef9421 !important;
    }
    .license-code {
        margin-top: 1rem;
    }
    section.tab-content {
        margin-top:0;
        padding: 0;
    }
    div.tab-item {
        height: 70px;
    }
    h2.vocab-h2{
        font-family: "Source Sans Pro", "Noto Sans", Arial, "Helvetica Neue", Helvetica, sans-serif;
        font-style: normal;
        font-weight: bold;
        font-size: 25px;
        line-height: 38px;
        color: #333333;
    }
    #generator-meta-inputs-heading {
        margin-bottom: 1rem;
        display: block;
    }

    b {
        text-align: center;
    }

    button {
        margin-top: .5rem !important
    }

    .field {
        margin-bottom: 0px;
    }

    #attribution-richtext-container {
        margin-top: 1rem;
        display: block;
    }

    #attribution-richtext-container .photo-license-icons {
        vertical-align: middle;
        margin-top: 0;
        margin-left: 2px;
    }

    #attribution-richtext p {
        display: inline
    }

    #generated-html-container {
        /*margin-top: 1.5rem*/
    }

    textarea {
        word-break: break-all;
        -ms-word-break: break-all;
    }
    textarea#attribution-html {
        min-height: 60px;
        font-family: "Source Sans Pro", "Noto Sans", Arial, "Helvetica Neue", Helvetica, sans-serif;

    }
    nav  {
        margin-bottom: 0;
    }

    div.attribution-tab {
        margin-bottom: 0;
    }
    div.attribution-tab .tabs {
        margin-bottom: 0;
    }
    div.attribution-tab nav {
        margin-bottom: 0;
    }
    .b-tabs .tabs {
        margin-bottom: 0;
    }
    nav.tabs ul li a span {
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        line-height: 18px;
        text-transform: uppercase;
        color: #333333;
    }
    nav.tabs ul li:last-of-type {
        margin-left: auto;
    }
</style>
