<template>
    <p
        xmlns:dct="http://purl.org/dc/terms/"
        xmlns:cc="http://creativecommons.org/ns#"
        class="license-text"
    >
        <i18n
            path="license-use.richtext.full-text"
            tag="span"
        >
            <template v-slot:workTitle>
                <a
                    v-if="workUrl && isWeb"
                    :href="workUrl"
                    rel="cc:attributionURL"
                    :property="workTitle ? 'dct:title' : false"
                >
                    {{ workTitle }}
                </a>
                <span
                    v-else-if="workTitle"
                    property="dct:title"
                >
                    {{ workTitle }}
                </span>
                <span v-else>{{ $t('license-use.richtext.workTitle') }}</span>
            </template>
            <template v-slot:byCreator>
                <span v-if="creatorName">{{ $t('license-use.richtext.by') }} </span>
                <a
                    v-if="creatorName && creatorProfileUrl && isWeb"
                    :href="creatorProfileUrl"
                    rel="cc:attributionURL"
                    v-html="creatorSpan"
                />
                <span
                    v-else-if="creatorName"
                    v-html="creatorSpan"
                />
            </template>
            <template v-slot:licensedMarkedString>
                <span>{{ $t(licensedMarkedString) }}</span>
            </template>
            <template v-slot:license>
                <a
                    v-if="isWeb"
                    :href="licenseUrl('web')"
                    target="_blank"
                    rel="license noopener noreferrer"
                    style="display: inline-block;"
                >
                    {{ shortName }}
                </a>
                <span v-else>{{ shortName }}</span>
                <LicenseIcons
                    v-if="isWeb"
                    :url="licenseUrl('web')"
                    :icons-arr="iconsList"
                />
            </template>
        </i18n>
        <i18n
            v-if="!isWeb"
            path="license-use.richtext.print-instructions"
            tag="span"
        >
            <template v-slot:linkToDeed>
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
        licensedMarkedString() {
            return this.$store.getters.shortName === 'CC0 1.0' ? 'license-use.richtext.marked-text' : 'license-use.richtext.licensed-text'
        },
        creatorSpan() {
            if (this.creatorName) {
                return `<span property="cc:attributionName">${this.creatorName}</span>`
            } else return ''
        },
        creatorName() {
            return this.attributionDetails.creatorName
        },
        creatorProfileUrl() {
            const { creatorProfileUrl } = this.attributionDetails
            if (creatorProfileUrl && !creatorProfileUrl.startsWith('http')) {
                return `http://${creatorProfileUrl}`
            }
            return this.attributionDetails.creatorProfileUrl
        },
        workTitle() {
            return this.attributionDetails.workTitle
                ? this.attributionDetails.workTitle
                : this.$t('license-use.richtext.workTitle')
        },
        workUrl() {
            const { workUrl } = this.attributionDetails
            if (workUrl && !workUrl.startsWith('http')) {
                return `http://${workUrl}`
            }
            return workUrl
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
    margin-left: 3px;
}
</style>
