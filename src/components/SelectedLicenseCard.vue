<template>
<div class="selected-license-card">
    <h3 class="vocab-h3">RECOMMENDED LICENSE</h3>
    <h4 class="vocab-h4">
        <a :href="licenseUrl">{{fullName}} ({{shortName}})
            <LicenseIcons
                :url="licenseUrl"
                :iconsArr="iconsList"/>
        </a>
    </h4>
    <p id='chooser-selected-description'>
        <b>{{licenseSlug}}</b>
        {{this.$t("selected-license.description.common") }}
        <span v-if="!fullName.includes('CC0')">
            {{this.$t("selected-license.description.non-cc0")}}</span>
    </p>
    <section class="license-visual-info">
        <ul class="license-list">
            <transition-group name="highlight">
                <li v-for="item in iconsList"
                    :key="item">
                    <LicenseIconography
                        :icon-list="[item]"/>
                    <span class="readable-string">
                            {{ $t(`selected-license.description.${item}`)}}
                        </span>
                </li>
            </transition-group>
        </ul>
    </section>
</div>
</template>

<script>
import LicenseIcons from './LicenseIcons'
import LicenseIconography from './LicenseIconography'
import { mapGetters } from 'vuex'

export default {
    name: 'SelectedLicenseCard',
    components: {
        LicenseIcons,
        LicenseIconography
    },
    computed: {
        ...mapGetters(['shortName', 'fullName', 'iconsList', 'licenseUrl']),
        licenseDescription() {
            const descriptionString = `${this.$licenseSlug(this.shortName)}-description`
            return this.$t(descriptionString)
        },
        licenseSlug() {
            return this.shortName.slice(0, this.shortName.length - 3)
        }
    }
}
</script>

<style scoped>

</style>
