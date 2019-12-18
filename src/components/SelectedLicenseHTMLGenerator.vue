<template>
    <div>
        <Heading :level="5" color="blue">Use Your License</Heading>
        <b-tabs
            class="attribution-tab"
            v-model="activeTab">
            <b-tab-item label="Rich Text">
                <AttributionRichText
                    v-model="value"/>
            </b-tab-item>
            <b-tab-item label="HTML">
                <div class='control' id='generated-html-container'>
                    <textarea id='attribution-html'
                              class='textarea'
                              :value='attributionHTML()'
                              readonly>
                    </textarea>
                </div>
                <CopyButton id='copy-html-btn'
                            el='#attribution-html'
                            title='Copy the attribution to paste into your blog or document'>
                    Copy HTML
                </CopyButton>
            </b-tab-item>
        </b-tabs>
    </div>
</template>
<script>
import CopyButton from './CopyButton'
import attributionHtml from '@/utils/attributionHtml'
import licenseUrl from '@/utils/licenseUrl'
import { Heading } from '@creativecommons/vocabulary'
import AttributionRichText from './AttributionRichText'

export default {
    name: 'SelectedLicenseHTMLGenerator',
    props: ['value'],
    components: {
        AttributionRichText,
        CopyButton,
        Heading
    },
    data() {
        return {
            activeTab: 1
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
        }
    },
    computed: {
        licenseURL() {
            return licenseUrl(this.$props.value.shortName)
        },
        iconsArr() {
            return this.$props.value.shortName.toLowerCase().slice(3, this.$props.value.shortName.length - 4).split('-')
        }
    }
}
</script>
<style>
    .collapsible-button {
        height: 70px;
        background-color: #ef9421 !important;
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
        margin-top: 0px;
        margin-left: 2px;
    }

    #attribution-richtext p {
        display: inline
    }

    #generated-html-container {
        margin-top: 1.5rem
    }

    textarea {
        word-break: break-all;
        -ms-word-break: break-all;
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
</style>
