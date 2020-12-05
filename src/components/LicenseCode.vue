<template>
    <i18n
        path="license-use.richtext.full-text"
        tag="p"
        xmlns:dct="http://purl.org/dc/terms/"
        xmlns:cc="http://creativecommons.org/ns#"
        class="license-text"
    >
        <template #workTitle>
            <component
                :is="workUrl && isWeb ? 'a' : 'span'"
                v-bind="workProps"
            >
                {{ workTitle }}
            </component>
        </template>
        <template #creator>
            <component
                :is="isCreatorLink ? 'a' : 'span'"
                v-if="creatorName"
                v-bind="creatorProps"
            >
                {{ creatorName }}
            </component>
        </template>
        <template #by>
            {{ byString }}
        </template>
        <template #licenseMark>
            <span>{{ $t(licensedMarkedString) }}</span>
        </template>
        <template #license>
            <a
                v-if="isWeb"
                :href="licenseUrl('web')"
                target="_blank"
                rel="license noopener noreferrer"
                style="display: inline-block;"
            >
                {{ shortName }}
                <LicenseIcons
                    :icons-arr="iconsList"
                    :size="20"
                />
            </a>
            <span v-else>{{ shortName }}</span>
        </template>
    </i18n>
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
            return this.shortName === 'CC0 1.0' ? 'license-use.richtext.marked-text' : 'license-use.richtext.licensed-text'
        },
        isCreatorLink() {
            return this.attributionDetails.creatorName && this.creatorProfileUrl && this.isWeb
        },
        byString() {
            return this.creatorName ? this.$t('license-use.richtext.by') : ''
        },
        creatorProps() {
            const creatorAttrs = { property: 'cc:attributionName' }
            if (this.isCreatorLink) {
                creatorAttrs.href = this.creatorProfileUrl
                creatorAttrs.rel = 'cc:attributionURL'
            }
            return creatorAttrs
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
        workProps() {
            const workAttrs = {}
            const { workTitle, workUrl } = this.attributionDetails
            if (workTitle) {
                workAttrs.property = 'dct:title'
            }
            if (workUrl) {
                workAttrs.href = workUrl
                workAttrs.rel = 'cc:attributionURL'
            }
            return workAttrs
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
