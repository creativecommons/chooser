<template>
    <div id='attribution-richtext-container'>
        <div id='attribution-richtext' class='photo_usage-attribution' ref='photoAttribution'>
            <a :href='value.personalDetails.workUrl'
               v-if='value.personalDetails.workTitle && value.personalDetails.workUrl'
               target='_blank'
               rel='noopener'>'{{ value.personalDetails.workTitle }}'
            </a>
            <a v-if='!value.personalDetails.workTitle && value.personalDetails.workUrl'
               :href='value.personalDetails.workUrl'>
                This work
            </a>
            <p v-if='!value.personalDetails.workTitle && !value.personalDetails.workUrl'>This work</p>
            <p v-if='value.personalDetails.workTitle && !value.personalDetails.workUrl'>{{ value.personalDetails.workTitle }}</p>
            <span v-if='value.personalDetails.authorName'>
                by
                <a v-if='value.personalDetails.attributeToURL'
                   :href='value.personalDetails.attributeToURL'
                   target='_blank'
                   rel='noopener'>{{ value.personalDetails.authorName }}
                </a>
                <span v-else>{{ value.personalDetails.authorName }}</span>
            </span>
            is licensed under
            <a class='photo_license' :href='licenseURL' target='_blank' rel='noopener'>
                {{ value.shortName }}
            </a>
            <span v-if="value.personalDetails.sourceWorkUrl">
                Based on work at
                <a :href="value.personalDetails.sourceWorkUrl">
                    {{ value.personalDetails.sourceWorkUrl }}
                </a>.
            </span>
            <LicenseIcons
                :url='licenseURL'
                :iconsArr='iconsArr'/>
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
