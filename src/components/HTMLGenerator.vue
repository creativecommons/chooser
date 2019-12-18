<template>
    <div>
        <!--
        <b-collapse aria-id='contentIdForA11y1'>
            <button
                class='button is-primary is-fullwidth collapsible-button'
                slot='trigger'
                aria-controls='contentIdForA11y1'>
                <h3 class='title is-3'></h3>
            </button>
                <div class='content'>-->
                    <h3 class='title is-3'>Embed your License Attribution!</h3>
                    <span id='attribution-richtext-container'>
                        <span id='attribution-richtext' class='photo_usage-attribution' ref='photoAttribution'>
                            <a :href='workLocation'
                                v-if='workTitle && workLocation'
                                target='_blank'
                                rel='noopener'>'{{ workTitle }}'
                            </a>
                            <a v-if='!workTitle && workLocation'
                                :href='workLocation'>
                                This work
                            </a>
                            <p v-if='!workTitle && !workLocation'>This work</p>
                            <p v-if='workTitle && !workLocation'>{{ workTitle }}</p>
                            <span v-if='attributeToName'>
                                by
                                <a v-if='attributeToURL'
                                    :href='attributeToURL'
                                    target='_blank'
                                    rel='noopener'>{{ attributeToName }}</a>
                                <span v-else>{{ attributeToName }}</span>
                            </span>
                            is licensed under
                            <a class='photo_license' :href='licenseURL' target='_blank' rel='noopener'>
                            {{ shortLicenseName }}
                            </a>
                        </span>
                        <LicenseIcons
                            :url='licenseURL'
                            :iconsArr='iconsArr'/>
                    </span>
                    <CopyButton id='copy-richtext-btn'
                                el='#attribution-richtext'
                                title='Copy the attribution to paste into your blog or document'>
                        Copy Rich Text
                    </CopyButton>
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
                    <div id='generator-meta-inputs'>
                        <b id='generator-meta-inputs-heading'>
                            Filling out the boxes below is optional, but it adds more data
                            to the generated HTML and rich text above!
                        </b>
                        <div class='metadata-input-row'>
                            <div class='columns'>
                                <div class='column'>
                                    <b-field label='Title of Work'>
                                        <b-input
                                            v-model='workTitle'
                                            placeholder='workTitle'>
                                        </b-input>
                                    </b-field>
                                    <p class='help'>The title of the work being licensed.</p>
                                </div>
                                <div class='column'>
                                    <b-field label='Work Location'>
                                        <b-input
                                            v-model='workLocation'
                                            placeholder='workLocation'>
                                        </b-input>
                                    </b-field>
                                    <p class='help'>The URL where the work will be hosted or located.</p>
                                </div>
                            </div>
                        </div>
                        <div class='metadata-input-row'>
                            <div class='columns'>
                                <div class='column'>
                                    <b-field label='Attribute Work to URL'>
                                        <b-input
                                            v-model='attributeToURL'
                                            placeholder='attributeToURL'
                                        ></b-input>
                                    </b-field>
                                    <p class='help'>The URL to which the work should be attributed.</p>
                                </div>
                                <div class='column'>
                                    <b-field label='Attribute Work to Name'>
                                        <b-input
                                            v-model='attributeToName'
                                            placeholder='attributeToName'>
                                        </b-input>
                                    </b-field>
                                    <p class='help'>The name of the person who should receive attribution for the work.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                <!--</div>
        </b-collapse>-->
    </div>
</template>
<script>
import CopyButton from './CopyButton'
import LicenseIcons from './LicenseIcons'
import LicenseIconography from '@creativecommons/vocabulary/vocabulary.common'
import attributionHtml from '@/utils/attributionHtml'
import licenseUrl from '@/utils/licenseUrl'

export default {
    name: 'HTMLGenerator',
    props: ['shortLicenseName'],
    components: {
        CopyButton,
        LicenseIcons,
        // eslint-disable-next-line vue/no-unused-components
        LicenseIconography
    },
    data() {
        return {
            workTitle: '',
            attributeToName: '',
            attributeToURL: '',
            workLocation: ''
        }
    },
    methods: {
        attributionHTML() {
            return attributionHtml({
                workLocation: this.workLocation,
                workTitle: this.workTitle,
                attributeToName: this.attributeToName,
                attributeToURL: this.attributeToURL
            },
            this.licenseURL,
            this.$props.shortLicenseName
            )
        }
    },
    computed: {
        licenseURL() {
            return licenseUrl(this.$props.shortLicenseName)
        },
        iconsArr() {
            return this.$props.shortLicenseName.toLowerCase().slice(3, this.$props.shortLicenseName.length - 4).split('-')
        }
    }
}
</script>
<style scoped>
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
</style>
