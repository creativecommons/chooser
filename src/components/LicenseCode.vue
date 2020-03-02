<template>
    <p xmlns:dct="http://purl.org/dc/terms/"
        xmlns:cc="http://creativecommons.org/ns#"
        class="license-text">
        <i18n path="license-use.richtext.full-text" tag="span">
            <template v-slot:workTitle>
                <a v-if="workUrl && isWeb"
                    :href="workUrl"
                    rel="cc:attributionURL">
                    <span v-if="!workTitle">{{ $t('license-use.richtext.workTitle') }}</span>
                    <span v-else rel="dc:title">
                        {{ workTitle }}
                    </span>
                </a>
                <span v-else-if="workTitle" rel="dc:title">
                    {{ workTitle }}
                </span>
                <span v-else>{{ $t('license-use.richtext.workTitle') }}</span>
            </template>
            <template v-slot:creator>
                <a v-if="creatorProfileUrl && isWeb"
                    :href="creatorProfileUrl"
                    rel="cc:attributionURL">
                    <span v-html="creatorSpan" /></a>
                <span v-else-if="creatorName" v-html="creatorSpan" />
            </template>
            <template v-slot:by>
                {{ $t(byString) }}
            </template>
            <template v-slot:licensed-text>
                <span>{{ $t('license-use.richtext.licensed-text') }}</span>
            </template>
            <template v-slot:licenseName>
                <a v-if="isWeb"
                    :href="licenseUrl('web')"
                    target="_blank"
                    rel="license noopener noreferrer"
                    style="display: inline-block;">
                    {{ shortName }}
                </a>
                <span v-else>{{ shortName }}</span>
                <LicenseIcons v-if="isWeb"
                    :url="licenseUrl('web')"
                    :icons-arr="iconsList" />
            </template>
        </i18n>
        <i18n v-if="!isWeb"
            path="license-use.richtext.print-instructions"
            tag="span">
            <template v-slot:linkToLicenseDeed>
                {{ licenseUrl('print') }}
            </template>
        </i18n>
    </p>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import LicenseIcons from './LicenseIcons'

export default {
    name: 'LicenseCode',
    components: {
        LicenseIcons
    },
    props: {
        attributionType: {
            type: String,
            default: 'web'
        }
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
    height: 1.4rem!important;
}
</style>
