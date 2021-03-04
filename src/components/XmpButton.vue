<template>
  <a
    ref="xmp"
    class="button donate small copy-button is-xmp"
    type="text/xml"
    :href="xmpHref"
    :download="xmpFilename"
  >
    {{ xmpLabel }}
  </a>
</template>

<script>
import { createXMP } from '@/utils/xmp'
import { mapGetters } from 'vuex'

export default {
  name: 'XmpButton',
  computed: {
    ...mapGetters(['shortName']),
    xmpLabel() { return this.$t('license-use.xmp-label') },
    xmpFilename() {
      return `${this.shortName}.xmp`
    },
    xmpHref() {
      const shortName = this.$store.getters.shortName
      const { workUrl, workTitle, creatorName } = this.$store.state.attributionDetails
      const xmp = createXMP({ shortName, workUrl, workTitle, creatorName })
      const xmpBlob = new Blob([xmp], { type: 'text/xml;charset=utf-8' })
      return URL.createObjectURL(xmpBlob)
    },
  },
}
</script>
