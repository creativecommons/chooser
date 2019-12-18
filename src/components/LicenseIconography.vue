<!--
    This component is a near exact copy of
    the LicenseIconography component from
    CC Vocabulary: https://github.com/creativecommons/cc-vocabulary/blob/master/src/elements/LicenseIconography/LicenseIconography.vue
-->
<!-- eslint-disable -->
<template>
  <span class="vocab license-icons">
    <FontAwesomeIcon
      v-for="(icon, index) in processedIconList"
      :key="index"
      :icon="['fab', icon]"
      style="width: 50px; height: 50px"/>
  </span>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faCreativeCommons,
    faCreativeCommonsBy,
    faCreativeCommonsNc,
    faCreativeCommonsNd,
    faCreativeCommonsSa,
    faCreativeCommonsZero
} from '@fortawesome/free-brands-svg-icons/'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(
    faCreativeCommons,
    faCreativeCommonsBy,
    faCreativeCommonsNc,
    faCreativeCommonsNd,
    faCreativeCommonsSa,
    faCreativeCommonsZero
)
/**
   * ### License icons are hieroglyphs for the aspects of a license.
   *
   * A license icon represents an aspect of a license such as shareability and
   * commercial usability in pictorial form.
   */
export default {
    name: 'LicenseIconography',
    components: {
        FontAwesomeIcon
    },
    props: {
        /**
       * _the list of icons to display_
       *
       * ⊂ {`''`, `'by'`, `'nc'`, `'nd'`, `'sa'`, `'nc-eu'`, `'nc-jp'`,
       * `'sampling'`, `'sampling-plus'`, `'remix'`, `'share'`, `'zero'`,
       * `'pd'`}
       */
        iconList: {
            type: Array,
            required: true,
            validator: val => val.every(
                icon => [
                    '',
                    'by',
                    'nc',
                    'nd',
                    'sa',
                    'zero'
                ].includes(icon)
            )
        }
    },
    computed: {
        processedIconList: function() {
            return this.iconList.map(icon => {
                return `creative-commons${icon ? '-' : ''}${icon}`
            })
        }
    }
}
</script>
