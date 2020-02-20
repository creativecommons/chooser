<template>
    <p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">
        <i18n path="license-use.richtext.full-text" tag="span">
            <template v-slot:workTitle>
                <a :href="workUrl" v-if="workUrl && isWeb" rel="cc:attributionURL">
                    <span v-if="!workTitle">{{$t('license-use.richtext.workTitle')}}</span>
                    <span v-else rel="dc:title">{{workTitle}}</span>
                </a>
                <span v-else-if="workTitle" rel="dc:title">{{workTitle}}</span>
                <span v-else>{{ $t('license-use.richtext.workTitle') }}</span>
            </template>
            <template v-slot:creator>
                <a :href="creatorProfileUrl" v-if="creatorProfileUrl && isWeb" rel="cc:attributionURL">
                    <span v-html="creatorSpan" /></a>
                <span v-else v-html="creatorSpan" />
            </template>
            <template v-slot:by>
                {{$t(byString)}}
            </template>
            <template v-slot:licenseName>
                <a v-if="isWeb" :href="licenseUrl" target="_blank" rel="license noopener noreferrer"
                   style="display: inline-block;">{{shortName}}</a>
                <span v-else>{{shortName}}</span>
                <LicenseIcons
                    v-if="isWeb"
                    :url="licenseUrl"
                    :iconsArr="iconsList"/>
            </template>
        </i18n>
        <i18n path="license-use.richtext.print-instructions" tag="span" v-if="!isWeb">
            <template v-slot:linkToLicenseDeed>{{licenseUrl}}</template>
        </i18n>
    </p>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import LicenseIcons from './LicenseIcons'

export default {
    name: 'LicenseCode',
    props: {
        attributionType: {
            type: String,
            default: 'web'
        }
    },
    components: {
        LicenseIcons
    },
    computed: {
        ...mapGetters(['shortName', 'licenseUrl', 'iconsList']),
        ...mapState(['attributionDetails']),
        byString() {
            return this.creatorName ? 'license-use.richtext.by' : ''
        },
        creatorSpan() {
            if (this.creatorName) {
                return `<span rel="cc:attributionName">${this.creatorName}</span>`
            } else return ''
        },
        creatorName() {
            return this.attributionDetails.creatorName
        },
        creatorProfileUrl() {
            return this.attributionDetails.creatorProfileUrl
        },
        workTitle() {
            return this.attributionDetails.workTitle
        },
        workUrl() {
            return this.attributionDetails.workUrl
        },
        isWeb() {
            return this.attributionType === 'web'
        }
    }
}
</script>

<style scoped>
.license-text .photo-license-icons {
    height: 22px;
}
</style>
