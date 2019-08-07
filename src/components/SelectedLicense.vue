<template>
    <div id="SelectedLicense">
        <div class="card chooser-selected">
            <header class="card-header">
                <h2 class="title is-2">Selected License</h2>
            </header>
            <div class="card-content">
                <div>
                    <LicenseIconography v-bind:iconList="iconsList"/>
                    <div class="selected-license-names">
                        <b class="selected-license-name">{{selected_license_short}}</b>
                        <a href="chooser.selected_license_link" class="help">{{licenseName}}</a>
                    </div>
                </div>
                <LicenseDescription/>
            </div>
        </div>
    </div>
</template>
<script>
import LicenseDescription from './LicenseDescription'
import LicenseIconography from './LicenseIconography'

export default {
    name: 'SelectedLicense',
    components: {
        LicenseDescription,
        LicenseIconography
    },
    data() {
        return {
            selected_license: 'Atribution 4.0 International',
            selected_license_short: 'CC BY 4.0',
            selected_license_short_noversion: 'short-noversion',

            sliced: '',
            extras: '',
        }
    },
    computed: {
        licenseName() {
            var data = this.$parent
            var base = "Atribution"
            if (!data.allowCommercial) {
                base += "-NonCommercial"
            }
            
            if (data.allowAdaptations) {
                if (data.isShareAlike) {
                    base += "-ShareAlike"
                }
            }
            else if (!data.allowAdaptations) {
                base += "-NoDerivatives"
            }
            base += " 4.0 International"
            this.selected_license = base
            return base
        },
        licenseName_Short() {
            var data = this.$parent
            var short = "CC BY"
            if (this.selected_license.includes("NonCommercial")) {
                short += "-NC"
            }

            if (this.selected_license.includes("NoDerivatives")) {
                short += "-ND"
            } 
            else if(this.selected_license.includes("ShareAlike")) {
                short += "-SA"
            }
            this.selected_license_short = short += " 4.0"
            return short
        },
        iconsList() {
            var base = ['']
            var slicedName = this.selected_license_short
                .slice(3, this.selected_license_short.length - 4)
            this.sliced = slicedName
            var extras = slicedName.toLowerCase().split('-')
            this.extras = extras
            return base.concat(extras)
        }
    }
}
</script>
<style>
.chooser-selected {
    border-radius: 5px;
}

.chooser-selected h2 {
    margin: 1.5% auto;
    text-align: center;
}

.chooser-selected img {
    display: inline;
    vertical-align: middle;
    width: 42px;
    opacity: 0.7;
    filter: alpha(opacity=70); /* msie */
}

.selected-license-names b {
    font-size: 1.8rem;
}

.switch-container p, b-switch {
    display: inline;
}
</style>
