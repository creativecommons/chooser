<template>
    <div class="license-use-card">
        <h4 class="vocab h4b hb">
            {{ $t('license-use.heading') }}
        </h4>
        <p class="license-use-instructions">
            {{ $t('license-use.common-instructions') }}
        </p>
        <b-tabs>
            <b-tab-item :label="$t('license-use.web-tab-heading')">
                {{ $t('license-use.web-instructions') }}
                <SelectedLicenseCode
                    v-model="value"
                    is-web="true"
                />
            </b-tab-item>
            <b-tab-item :label="$t('license-use.print-media-tab-heading')">
                {{ $t('license-use.print-media-instructions') }}
                <PlaintextLicenseCode
                    v-model="value"
                    is-web="false"
                />
            </b-tab-item>
        </b-tabs>
    </div>
</template>

<script>
import SelectedLicenseCode from './WebLicenseCode'
import PlaintextLicenseCode from './PrintMediaLicenseCode'
export default {
    name: 'LicenseUseCard',
    components: {
        SelectedLicenseCode,
        PlaintextLicenseCode
    }
}
</script>

<style lang="scss">
.tabs span {
    font-weight: bold;
}
    .license-use-card .tabs .is-active a {
        margin-bottom: -2px;
        border-bottom: 3px solid #04a434;
        span {
            font-weight: 700;
            opacity:1;
            color: black;
        }
    }
</style>
