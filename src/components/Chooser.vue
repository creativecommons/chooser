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
            console.info('s1')
            if (!allowCommercial) { base += "-NC" }
            console.info('s2')
            if (allowAdaptations && isShareAlike) { 
                base += "-SA" 
                }
                else if (!allowAdaptations) { 
                    base += "-ND" 
                    }
            return base += " 4.0"
        },
        fullLicenseName() {
            var base = "Atribution"
            console.info('f1')
            if (allowCommercial) { 
                base += "-NonCommercial" 
                }
            console.info('f2')
            if (allowAdaptations && isShareAlike) { console.info('f3'); base += "-ShareAlike" }
                else if (!allowAdaptations) { console.info('f4'); base += "-NoDerivatives" }
            console.info('f5')
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
