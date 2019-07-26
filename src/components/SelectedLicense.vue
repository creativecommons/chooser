<template>
    <div id="SelectedLicense">
        <p>Test</p>
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
                        <b class="selected-license-name">chooser.selected_license_short</b>
                        <a href="chooser.selected_license_link" class="help">chooser.selected_license</a>
                    </div>
                </div>
                <div class="chooser-selected-share_adapt">
                    <p>chooser.selected_license_short_noversion attribution means you allow people to</p>
                    <p id="generated-license-share"><b>Share</b> the material in any medium or format</p>
                    <p id="generated-license-adapt"><b>Adapt</b> chooser.selected_license_adapt</p>
                </div>
                <p class="chooser-selected-description">
                    chooser.selected_license_desc
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'SelectedLicense'
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
