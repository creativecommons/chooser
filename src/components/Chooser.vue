<template>
    <div class="container">
        <div class="columns">
            <div class="column">
                <div class="column" id="chooser-controls-switch">
                        <div id="license-chooser-allow-adaptations" class="chooser-question">
                            <span>
                                <p class="chooser-question-title">
                                    Do you want to allow adaptations of your work?
                                </p>
                            </span>
                            <div class="control" style="margin-left: 9%; padding-top: 1%;">
                                <div class="columns is-gapless">
                                    <div class="column is-one-fifth">
                                        <span class="switch-container">
                                            <label for="allow-adaptations-switch">No</label>
                                            <b-switch id="allow-adaptations-switch"></b-switch>
                                            <label for="allow-adaptations-switch">Yes</label>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div> <br><br>
                        <div id="license-chooser-allow-commercial" class="chooser-question">
                            <span>
                                <p class="chooser-question-title">
                                    Do you want to allow commercial uses of your work?
                                </p>
                            </span>
                            <div class="control" style="margin-left: 9%; padding-top: 1%;">
                                <div class="field">
                                    <label for="allow-commercial-switch">No</label>
                                    <b-switch id="allow-commercial-switch"></b-switch>
                                    <label for="allow-commercial-switch">Yes</label>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            <div class="column">
                <!--<SelectedLicense/>-->
                <!--START SelectedLicense COMPONENT-->
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
                <!--END SelectedLicense COMPONENT-->
            </div>
        </div>
    </div>
</template>
<script>
import SelectedLicense from './SelectedLicense'

export default {
    name: 'Chooser',
    components: [
        SelectedLicense
    ]
}
</script>
<style>
.switch-container label {
    vertical-align: middle;
}

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
