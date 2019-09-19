<template>
    <div class="container">
        <div class="columns">
            <div class="column"
                v-on:change="updateLicense()">
                <b class="desktop-show mobile-hide">To change the selected license, click the icons below</b>
                <b class="mobile-show desktop-hide">To change the selected license, tap the icons below</b>
                <IconSelector
                    id="nc"
                    icon="nc"
                    v-model="allowCommercial">
                </IconSelector>
                <IconSelector
                    id="nd"
                    icon="nd"
                    v-model="allowAdaptations">
                </IconSelector>
                <IconSelector
                    id="sa"
                    icon="sa"
                    v-if="allowAdaptations"
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
        updateLicense() {
            this.$emit('input', {
                shortName: this.shortLicenseName,
                fullName: this.fullLicenseName
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
            if (!this.allowCommercial) { base += "-NonCommercial" }
            if (this.allowAdaptations && this.isShareAlike) { base += "-ShareAlike" }
                else if (!this.allowAdaptations) { base += "-NoDerivatives" }
            return base += " 4.0 International"
        }
    }
}
</script>
<style scoped>

.selected-license-names b {
    font-size: 1.8rem;
}

b {
    text-align: center;
}
</style>
