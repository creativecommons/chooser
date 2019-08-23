<template>
    <div>
        <b-collapse :open="true" aria-id="contentIdForA11y1">
            <button
                class="button is-primary is-fullwidth collapsible-button"
                slot="trigger"
                aria-controls="contentIdForA11y1">
                <h3 class="title is-3">Have a Website?</h3>
            </button>
            <div class="notification">
                <div class="content">
                    <CopyButton id="copy-richtext-btn"
                                el="#generated-richtext-container"
                                title="Copy the attribution to paste into your blog or document"
                                @copied="onCopyAttribution">
                        Copy Rich Text
                    </CopyButton>
                    <div class="control" id="generated-html-container">
                        <textarea id="attribution-html"
                            class="textarea"
                            :value="attributionHTML()"
                            readonly>
                        </textarea>
                    </div>
                    <CopyButton id="copy-html-btn"
                                el="#generated-html"
                                title="Copy the attribution to paste into your blog or document"
                                @copied="onCopyAttribution">
                        Copy HTML
                    </CopyButton>
                    <div id="generator-meta-inputs">
                        <b align="center">
                            Filling out these boxes is optional, but it adds more data
                            to the generated HTML and rich text above!
                        </b>
                        <div class="metadata-input-row">
                            <div class="columns">
                                <div class="column">
                                    <b-field label="Title of Work">
                                        <b-input
                                            v-model="workTitle"
                                            placeholder="workTitle">
                                        </b-input>
                                    </b-field>
                                    <p class="help">The title of the work being licensed.</p>
                                </div>
                                <div class="column">
                                    <b-field label="Work Location">
                                        <b-input
                                            v-model="workLocation"
                                            placeholder="workLocation">
                                        </b-input>
                                    </b-field>
                                    <p class="help">The URL where the work will be hosted or located.</p>
                                </div>
                            </div>
                        </div>
                        <div class="metadata-input-row">
                            <div class="columns">
                                <div class="column">
                                    <b-field label="Attribute Work to URL">
                                        <b-input
                                            v-model="attributeToURL"
                                            placeholder="attributeToURL"
                                        ></b-input>
                                    </b-field>
                                    <p class="help">The URL to which the work should be attributed.</p>
                                </div>
                                <div class="column">
                                    <b-field label="Source Work URL">
                                        <b-input
                                            v-model="sourceWorkURL"
                                            placeholder="sourceWorkURL"
                                        ></b-input>
                                    </b-field>
                                    <p class="help">The URL of the work upon which this work is based or derived.</p>
                                </div>
                            </div>
                        </div>
                        <div class="metadata-input-row">
                            <div class="columns">
                                <div class="column">
                                    <b-field label="More Permissions URL">
                                        <b-input
                                            v-model="morePermsURL"
                                            placeholder="morePermsURL"
                                        ></b-input>
                                    </b-field>
                                    <p class="help">A URL where a user can find information about obtaining rights that are not already permitted by the CC license.</p>
                                </div>
                                <div class="column">
                                    <b-field label="Attribute Work to Name">
                                        <b-input
                                            v-model="attributeToName"
                                            placeholder="attributeToName">
                                        </b-input>
                                    </b-field>
                                    <p class="help">The name of the person who should receive attribution for the work.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </b-collapse>
    </div>
</template>
<script>
import CopyButton from './CopyButton'
import LicenseIcons from './LicenseIcons'
import attributionHtml from '@/utils/attributionHtml'
import licenseUrl from '@/utils/licenseUrl'

export default {
    name: 'HTMLGenerator',
    props: ['shortLicenseName'],
    components: {
        CopyButton,
        LicenseIcons
    },
    data() {
        return {
            workTitle: "",
            attributeToName: "",
            attributeToURL: "",
            sourceWorkURL: "",
            morePermsURL: "",
            workLocation: ""
        }
    },
    methods: {
        attributionHTML() {
            return attributionHtml({
                    workLocation: this.workLocation,
                    workTitle: this.workTitle,
                    attributeToName: this.attributeToName,
                    attributeToURL: this.attributeToURL,
                },
                licenseUrl(this.$props.shortLicenseName), 
                this.$props.shortLicenseName
            );
        }
    }
}
</script>
<style scoped>
    .collapsible-button {
        height: 70px;
        background-color: #ef9421 !important;
    }

    #generator-meta-inputs {
        margin-top: 1rem;
    }

    b {
        text-align: center;
    }

    .field {
        margin-bottom: 0px;
    }
</style>
