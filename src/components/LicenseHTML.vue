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
import { generateHTML, LICENSES } from '@/utils/license-utilities'

export default {
  name: 'LicenseHTML',
  computed: {
    ...mapGetters(['shortName', 'fullName', 'iconsList', 'licenseUrl']),
    ...mapState(['attributionDetails', 'attributionType']),

    htmlLicenseParagraph() {
      const useFullName = this.attributionType === 'full'

      const { workTitle } = this.attributionDetails
      const isTitleDefault = !workTitle

      const attributionDetails = {
        ...this.attributionDetails,
        workTitle: workTitle || this.$t('license-use.richtext.workTitle'),
      }
      const { work, creator, license } = generateHTML(attributionDetails, this.shortName, useFullName, isTitleDefault)

      const licenseCodeSpan = this.$t('license-use.richtext.full-text', {
        workTitle: work,
        creator: creator,
        license: license,
        by: creator ? this.$t('license-use.richtext.by') : '',
        licenseMark: this.shortName === LICENSES.CC0.SHORT
          ? this.$t('license-use.richtext.marked-text')
          : this.$t('license-use.richtext.licensed-text'),
      })
      const metadata = `xmlns:cc="http://creativecommons.org/ns#" ${isTitleDefault
        ? ''
        : 'xmlns:dct="http://purl.org/dc/terms/"'}`
      return `<p ${metadata}>${licenseCodeSpan}</p>`
    },
  },
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
