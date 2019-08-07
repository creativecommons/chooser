<template>
    <div class="container">
        <div class="columns">
            <div class="column">
                <IconSelector
                    icon="nc"
                    v-on:click="updateLicense('nc')">
                </IconSelector>
                <IconSelector
                    icon="nd"
                    v-on:click="updateLicense('nd')">
                </IconSelector>
                <IconSelector
                    icon="sa"
                    v-on:click="updateLicens('sa')">
                </IconSelector>
            </div>
            <div class="column">
                <SelectedLicense/>
            </div>
        </div>
    </div>
</template>
<script>
import SelectedLicense from './SelectedLicense'
import IconSelector from './IconSelector'

export default {
    name: 'Chooser',
    components: {
        SelectedLicense,
        IconSelector
    },
    data() {
        return {
            allowAdaptations: true,
            allowCommercial: true,
            isShareAlike: false
        }
    },
    methods: {
        updateLicense(controlName) {
            alert(controlName)
        }
    }
}
</script>
<style>
.selected-license-names b {
    font-size: 1.8rem;
}
</style>
