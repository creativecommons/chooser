<template>
    <div class="license-use-card">
        <h4 class="vocab b-header">
            {{ $t('license-use.heading') }}
        </h4>
        <p class="license-use-instructions">
            {{ $t('license-use.common-instructions') }}
        </p>
        <b-tabs>
            <b-tab-item :label="$t('license-use.web-tab-heading')">
                {{ $t('license-use.web-instructions') }}
                <LicenseCopy :is-web="true" />
            </b-tab-item>
            <b-tab-item :label="$t('license-use.print-media-tab-heading')">
                {{ $t('license-use.print-media-instructions') }}
                <LicenseCopy :is-web="false" />
            </b-tab-item>
        </b-tabs>
    </div>
</template>
<script>
import LicenseCopy from './LicenseCopy'
export default {
    name: 'LicenseUseCard',
    components: {
        LicenseCopy
    }
}
</script>
<style lang="scss">
.license-use-card {
    margin-bottom: 24px;
}
.license-use-card .h4b {
    color: black;
}
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
