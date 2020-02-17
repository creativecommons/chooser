<template>
<div class="license-use-card">
    <h4 class="vocab h4b hb">Use Your License</h4>
    <p class="license-use-instructions">{{$t('use-license.common-instructions')}}</p>
    <b-tabs>
        <b-tab-item label="Website">
            {{$t('use-license.web-instructions')}}
            <SelectedLicenseCode v-model="value"/>
        </b-tab-item>
        <b-tab-item label="Print Work">
            {{$t('use-license.print-instructions')}}
            <SelectedLicenseCode v-model="value"/>
        </b-tab-item>
        <b-tab-item label="Media">
            {{$t('use-license.media-instructions')}}
        </b-tab-item>
    </b-tabs>
</div>
</template>

<script>
import SelectedLicenseCode from './SelectedLicenseCode'
export default {
    name: 'LicenseUseCard',
    props: ['value'],
    components: {
        SelectedLicenseCode
    }
}
</script>

<style>
.tabs span {
    font-weight: bold;
}
</style>
