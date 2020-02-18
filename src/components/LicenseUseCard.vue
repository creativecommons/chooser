<template>
<div class="license-use-card">
    <h4 class="vocab h4b hb">{{$t('license-use.heading')}}</h4>
    <p class="license-use-instructions">{{$t('license-use.common-instructions')}}</p>
    <b-tabs>
        <b-tab-item label="Website">
            {{$t('license-use.web-instructions')}}
            <SelectedLicenseCode v-model="value"/>
        </b-tab-item>
        <b-tab-item label="Print Work">
            {{$t('license-use.print-instructions')}}
            <license-code attribution-type="print"/>
        </b-tab-item>
        <b-tab-item label="Media">
            {{$t('license-use.media-instructions')}}
        </b-tab-item>
    </b-tabs>
</div>
</template>

<script>
import SelectedLicenseCode from './SelectedLicenseCode'
import LicenseCode from './LicenseCode'
export default {
    name: 'LicenseUseCard',
    props: ['value'],
    components: {
        LicenseCode,
        SelectedLicenseCode
    }
}
</script>

<style>
.tabs span {
    font-weight: bold;
}
</style>
