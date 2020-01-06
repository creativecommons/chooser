<template>
    <div id='attribution-richtext-container'>
        <div id='attribution-richtext' class='photo_usage-attribution' ref='photoAttribution'>
            <p>
            <a v-if='value.attributionDetails.workTitle && value.attributionDetails.workUrl'
               :href='value.attributionDetails.workUrl'
               target='_blank'
               rel='noopener'>'{{ value.attributionDetails.workTitle }}'
            </a>
            <a v-if='!value.attributionDetails.workTitle && value.attributionDetails.workUrl'
               :href='value.attributionDetails.workUrl'>
                This work
            </a>
                <span v-if='!value.attributionDetails.workTitle && !value.attributionDetails.workUrl'>This work</span>
                <span v-if='value.attributionDetails.workTitle && !value.attributionDetails.workUrl'>{{ value.attributionDetails.workTitle }}</span>
            <span v-if='value.attributionDetails.creatorName'>
                by
                <a v-if='value.attributionDetails.attributeToURL'
                   :href='value.attributionDetails.attributeToURL'
                   target='_blank'
                   rel='noopener'>{{ value.attributionDetails.creatorName }}
                </a>
                <span v-else>{{ value.attributionDetails.creatorName }}</span>
            </span>
            is licensed under
            <a class='photo_license' :href='licenseURL' target='_blank' rel='noopener'>
                {{ value.shortName }}
            </a>

            <LicenseIcons
                :url='licenseURL'
                :iconsArr='iconsArr'/>
        </p>
        </div>

    </div>
</template>

<script>
import LicenseIcons from './LicenseIcons'

export default {
    name: 'AttributionRichText',
    props: ['value'],
    components: {
        LicenseIcons
    },
    computed: {
        licenseURL() {
            return this.$licenseUrl(this.$props.value.shortName)
        },
        iconsArr() {
            return this.$licenseIconsArr(this.$props.value.shortName)
        }
    }
}
</script>

<style scoped>

</style>
