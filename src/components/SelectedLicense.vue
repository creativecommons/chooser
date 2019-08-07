<template>
    <div id="SelectedLicense">
        <div class="card chooser-selected">
            <header class="card-header">
                <h2 class="title is-2">Test Title</h2>
            </header>
            <div class="card-content">
                    <div>
                    <span>
                        <img src="../assets/cc.svg" id="cc-logo-icon">
                        <img src="../assets/license-icons/cc-by_icon.svg" id="attribution-icon">
                        <img src="../assets/license-icons/cc-nc_icon.svg" id="commercial-icon">
                    </span>
                    <div class="selected-license-names">
                        <b class="selected-license-name">{{selected_license_short}}</b>
                        <a href="chooser.selected_license_link" class="help">{{selected_license}}</a>
                    </div>
                </div>
                <LicenseDescription/>
            </div>
        </div>
    </div>
</template>
<script>
import LicenseDescription from './LicenseDescription'
export default {
    name: 'SelectedLicense',
    components: {
        LicenseDescription
    },
    data() {
        return {
            selected_license: "[selected-license]",
            selected_license_short: "[selected-license_short]",
            selected_license_short_noversion: "[selected-license-short_noversion]"
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
