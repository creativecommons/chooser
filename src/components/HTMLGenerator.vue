<template>
    <div>
        <b-collapse :open="false" aria-id="contentIdForA11y1">
            <button
                class="button is-primary is-fullwidth collapsible-button"
                slot="trigger"
                aria-controls="contentIdForA11y1">
                <h3 class="title is-3">Have a Website?</h3>
            </button>
            <div class="notification">
                <div class="content">
                    <span id="generated-richtext-container">
                        [Work] by [Author] is licenced under <a>CC BY NC 4.0</a>
                        <span id="richtext-container-icons" class="generated-icons">
                            <img src="assets/license-icons/cc_icon.svg">
                            <img src="assets/license-icons/cc-by_icon.svg">
                            <img src="assets/license-icons/cc-nc_icon.svg">
                        </span>
                    </span><br>
                    <CopyButton id="copy-richtext-btn"
                                el="#generated-richtext-container"
                                title="Copy the attribution to paste into your blog or document"
                                @copied="onCopyAttribution">
                        Copy Rich Text
                    </CopyButton>
                    <div class="control" id="generated-HTML-container">
                        <textarea id="generated-html" class="textarea" readonly>chooser.metadata["gen_html"]</textarea>
                    </div>
                    <div class="metadata-input-row">
                        <div class="columns">
                            <div class="column">
                                <b-field label="Title of Work">
                                    <b-input value="Kevin Garvey"></b-input>
                                </b-field>
                            </div>
                            <div class="column">
                                <b-field label="Attribute Work to Name">
                                    <b-input value="Kevin Garvey"></b-input>
                                </b-field>
                            </div>
                        </div>
                    </div>
                    <div class="metadata-input-row">
                        <div class="columns">
                            <div class="column">
                                <b-field label="Attribute Work to URL">
                                    <b-input value="Kevin Garvey"></b-input>
                                </b-field>
                            </div>
                            <div class="column">
                                <b-field label="Source Work URL">
                                    <b-input value="Kevin Garvey"></b-input>
                                </b-field>
                            </div>
                        </div>
                    </div>
                    <div class="metadata-input-row">
                        <div class="columns">
                            <div class="column">
                                <b-field label="More Permissions URL">
                                    <b-input value="Kevin Garvey"></b-input>
                                </b-field>
                            </div>
                            <div class="column"></div>
                        </div>
                    </div>
                </div>
            </div>
        </b-collapse>
    </div>
</template>
<script>
import CopyButton from '@/components/CopyButton'

export default {
    name: 'HTMLGenerator',
    components: [
        CopyButton
    ]
}
</script>

<style>
.collapsible-button {
    height: 70px;
}
</style>
