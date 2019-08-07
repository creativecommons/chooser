<template>
    <div class="container">
        <div class="columns">
            <div class="column">
                <IconSelector icon="nc"></IconSelector>
                <IconSelector icon="nd"></IconSelector>
                <IconSelector icon="sa"></IconSelector>
                <!--
                <div class="column" id="chooser-controls-switch">
                    <div id="license-chooser-allow-adaptations" class="chooser-question">
                        <span>
                            <p class="chooser-question-title">
                                Do you want to allow adaptations of your work?
                            </p>
                        </span>
                        <div class="control" style="margin-left: 9%; padding-top: 1%;">
                            <div class="columns">
                                <div class="column is-one-quarter">
                                    <span class="switch-container">
                                        <label for="allow-adaptations-switch">No</label>
                                        <b-switch id="allow-adaptations-switch" 
                                            v-model="allowAdaptations"
                                            v-on:click="updateLicense('nd')">
                                        </b-switch>
                                        <label for="allow-adaptations-switch">Yes</label>
                                    </span>
                                </div>
                                <div class="column">
                                    <b-checkbox
                                        v-if="!allowAdaptations"
                                        v-model="isShareAlike"
                                        v-on:click="updateLicense('sa')">
                                        Check to require that others share alike
                                    </b-checkbox>
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
                                <b-switch id="allow-commercial-switch" 
                                    v-bind:checked="allowCommercial"
                                    v-on:click="updateLicense('nc')">
                                </b-switch>
                                <label for="allow-commercial-switch">Yes</label>
                            </div>
                        </div>
                    </div>
                </div>-->
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
