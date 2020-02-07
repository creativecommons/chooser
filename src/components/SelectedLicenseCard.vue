<template>
<div class="selected-license-card">
    <h3 class="vocab-h3">RECOMMENDED LICENSE</h3>
    <h4 class="vocab-h4">
        <a :href="this.$licenseUrl(selected.shortName)">{{selected.fullName}} ({{selected.shortName}})
            <LicenseIcons
                :url="this.$licenseUrl(selected.shortName)"
                :iconsArr="this.$licenseIconsArr(selected.shortName)"/>
        </a>
    </h4>
    <div class="license-description">{{selected.shortName}} {{$t('selected-license.description.common')}}</div>
    <p id='chooser-selected-description'>
        <b>{{selected.shortName.slice(0, selected.shortName.length-3)}}</b>
        {{this.$t("selected-license.description.common") }}
        <span v-if="!selected.fullName.includes('CC0')">
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
export default {
    name: 'SelectedLicenseCard',
    components: {
        LicenseIcons,
        LicenseIconography
    },
    props: {
        selected: Object
    },
    computed: {
        iconsList() {
            return this.$licenseIconsArr(this.$props.selected.shortName)
        },
        licenseDescription() {
            const descriptionString = `${this.$licenseSlug(this.$props.selected.shortName)}-description`
            return this.$t(descriptionString)
        }
    }
}
</script>

<style scoped>

</style>
