<template>
    <div class="container">
        <div class="columns">
            <div class="column" v-on:click="updateLicense()">
                <IconSelector
                    id="nc-selector"
                    icon="nc"
                    v-model="allowCommercial">
                </IconSelector>
                <IconSelector
                    id="nd-selector"
                    icon="nd"
                    v-model="allowAdaptations">
                </IconSelector>
                <IconSelector
                    id="sa-selector"
                    icon="sa"
                    v-model="isShareAlike">
                </IconSelector>
            </div>
            <div class="column">
                <SelectedLicense
                    :fullLicenseName="fullLicenseName"
                    :shortLicenseName="shortLicenseName"/>
            </div>
        </div>
    </div>
</template>
<script>
import SelectedLicense from './SelectedLicense'
import IconSelector from './IconSelector'

export default {
    name: 'Chooser',
    props: ['value'],
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
        updateLicense(e) {
            this.$emit('input', {
                shortName: shortLicenseName,
                fullName: fullLicenseName
            })
        }
    },
    computed: {
        shortLicenseName() {
            var base = "CC BY"
            if (!this.allowCommercial) { base += "-NC" }
            if (this.allowAdaptations && this.isShareAlike) { base += "-SA" }
                else if (!this.allowAdaptations) { base += "-ND" }
            return base += " 4.0"
        },
        fullLicenseName() {
            var base = "Atribution"
            if (this.allowCommercial) { base += "-NonCommercial" }
            if (this.allowAdaptations && this.isShareAlike) { base += "-ShareAlike" }
                else if (!this.allowAdaptations) { base += "-NoDerivatives" }
            return base += " 4.0 International"
        }
    }
}
</script>
<style>
.selected-license-names b {
    font-size: 1.8rem;
}
</style>
