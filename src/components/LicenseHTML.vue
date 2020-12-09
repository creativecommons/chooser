<template>
    <div
        id="attribution-html"
        :aria-label="$t('license-use.html-label')"
        class="textarea-html"
        readonly
    >
        {{ htmlLicenseParagraph.replace(/ {2,}/g, ' ') }}
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { generateHTML } from '../utils/license-utilities'

export default {
    name: 'LicenseHTML',
    computed: {
        ...mapGetters(['shortName', 'fullName', 'iconsList', 'licenseUrl']),
        ...mapState(['attributionDetails', 'attributionType']),

        htmlLicenseParagraph() {
            const isFull = this.attributionType === 'full'
            const { work, creator, license, paragraph } = generateHTML(this.attributionDetails, this.shortName, isFull)
            const licenseCodeSpan = this.$t('license-use.richtext.full-text', {
                workTitle: work || this.$t('license-use.richtext.workTitle'),
                creator,
                license,
                by: creator ? this.$t('license-use.richtext.by') : '',
                'licensed-text': this.$t('license-use.richtext.licensed-text')
            })
            return `${paragraph}${licenseCodeSpan}</p>`
        }
    }
}
</script>

<style lang="scss" scoped>
.textarea-html {
    height: 100px;
    overflow-x: hidden;
    word-break: break-all;
    border: 0.125rem solid #d8d8d8;
    border-radius: 4px;
    font-size: 13px;
    &:hover, &:active, &:focus {
        border-color: #b0b0b0;
    }
}
</style>
