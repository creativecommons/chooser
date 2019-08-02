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
                                            <b-switch id="allow-adaptations-switch">

                                            </b-switch>
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
                                    <input id="allow-commercial-switch" type="checkbox"
                                    name="allow-commercial-switch" class="switch is-thin"
                                    checked="checked" onchange="switch_callback(this)">
                                    <label for="allow-commercial-switch">Yes</label>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            <div class="column">
                <!--<SelectedLicense/>-->
                <!--START SelectedLicense COMPONENT-->
                <SelectedLicense/>
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
</style>
