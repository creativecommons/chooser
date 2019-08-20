<template>
    <div>
        <div class="chooser-selected-share_adapt">
            <p>{{}} attribution means you allow people to</p>
            <p id="generated-license-share"><b>Share</b> the material in any medium or format</p>
            <p id="generated-license-adapt"><b>Adapt</b> {{selected_license_adapt}}</p>
        </div>
        <p class="chooser-selected-description">
            {{selected_license_description}}
        </p>
    </div>
</template>
<script>
export default {
    name: 'LicenseDescription',
    props: {
        selectedLicense: String
    },
    data() {
        return {
            selected_license_adapt: '[selected-license_adapt]',
            selected_license_description: '[selected-license_desc]'
        }
    }
}
</script>
<style>

</style>
