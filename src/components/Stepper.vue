<template>
    <div class='column is-three-fifths-tablet is-half-desktop' id="stepper" >
        <div class="card">
            <header class="card-header">
                <h2 :class="'vocab-h2'">{{ $t('select-license-heading') }}</h2>
            </header>
            <div class="card-content">
            <p :class="'stepper-instructions'">{{ $t('select-license-instructions') }}</p>
            <b-steps size="is-small"
                     v-on:input="disableSAifND"
                     v-model="currentStep"
                     ref="steps"
                    >
                <b-step-item
                    v-for="(item, index) in this.steps"
                    :icon-pack="item['icon-pack']"
                    :icon="getIcon(item.shortName)"
                    :label="$t(labels[index])"
                    :key="item.shortName"
                    :selected="isStepSelected(item.shortName)"
                    :visible="isStepVisible(item.shortName)"
                    :clickable="isStepClickable(item.shortName)"
                    :type="attributeType(item.shortName)"
                >
                    <SelectionStep
                        v-if="item.itemType==='licenseAttribute'"
                        :selected="isStepSelected(item.shortName)"
                        :stepId="item.shortName"
                        v-on:input="updateLicense(item.shortName)"
                    />
                    <CopyrightWaiverStep
                    v-if="item.itemType==='CC0Attribute'"
                    :selected="true"
                    />

                    <AttributionDetailsStep
                        v-if="item.itemType==='AttributionDetails'"
                        v-model="value.attributionDetails"
                    />
                </b-step-item>
            </b-steps>
            </div>
        </div>
    </div>
</template>
<script>

import SelectionStep from './SelectionStep'
import AttributionDetailsStep from './AttributionDetailsStep'
import CopyrightWaiverStep from './CopyrightWaiverStep'

export default {
    name: 'Stepper',
    props: ['value'],
    components: {
        SelectionStep,
        AttributionDetailsStep,
        CopyrightWaiverStep
    },
    data() {
        return {
            currentStep: 0,
            steps: [
                {
                    shortName: 'BY',
                    'icon-pack': 'fab',
                    itemType: 'licenseAttribute'
                },
                {
                    shortName: 'NC',
                    'icon-pack': 'fab',
                    itemType: 'licenseAttribute'
                },
                {
                    shortName: 'ND',
                    'icon-pack': 'fab',
                    itemType: 'licenseAttribute'
                },
                {
                    shortName: 'SA',
                    'icon-pack': 'fab',
                    itemType: 'licenseAttribute'
                },
                {
                    shortName: 'wv',
                    'icon-pack': 'fas',
                    itemType: 'CC0Attribute'
                },
                {
                    shortName: 'ad',
                    'icon-pack': 'fas',
                    itemType: 'AttributionDetails'
                }
            ]
        }
    },
    computed: {
        licenseAttributes() {
            return this.$shortToAttributes(this.$props.value.shortName)
        },
        attributionIcon() {
            return this.$props.value.shortName.includes('BY') ? 'creative-commons-by' : 'creative-commons-zero'
        },
        labels() {
            const attributionStepLabel = this.$props.value.shortName.includes('BY') ? 'Attribution' : 'PublicDomain'
            const stepLabels = [
                `stepper-label.${attributionStepLabel}`,
                'stepper-label.NonCommercial',
                'stepper-label.NoDerivatives',
                'stepper-label.Share-Alike',
                'stepper-label.CopyrightWaiver',
                'stepper-label.AttributionDetails'
            ]
            return stepLabels
        }
    },
    methods: {
        disableSAifND(payload) {
            const attributionDetailsStep = 5
            const ndStep = 3
            if (payload === ndStep && this.$props.value.shortName.includes('ND')) {
                this.currentStep = attributionDetailsStep
            }
        },
        getIcon(attrName) {
            if (attrName === 'BY') {
                return this.attributionIcon
            } else if (attrName === 'wv') {
                return 'exclamation-circle'
            } else if (attrName === 'ad') {
                return 'user-circle'
            } else {
                return `creative-commons-${attrName.toLowerCase()}`
            }
        },
        getAttributionName() {
            return this.$props.value.shortName.includes('BY') ? 'stepper-label.Attribution' : 'stepper-label.PublicDomain'
        },
        updateLicense(itemId) {
            const attrs = { ...this.licenseAttributes }
            attrs[itemId] = !attrs[itemId]
            this.$emit('input', {
                shortName: this.shortLicenseName(attrs),
                fullName: this.fullLicenseName(attrs),
                attributionDetails: this.$props.value.attributionDetails
            })
        },
        shortLicenseName(attr) {
            if (!attr.BY) { return 'CC0 1.0' }
            let base = 'CC BY'
            if (attr.NC) { base += '-NC' }
            if (!attr.ND && attr.SA) {
                base += '-SA'
            } else if (attr.ND) {
                base += '-ND'
            }
            base += ' 4.0'
            return base
        },
        fullLicenseName(attr) {
            if (!attr.BY) { return 'CC0 1.0 Universal' }
            let base = 'Attribution'
            if (attr.NC) { base += '-NonCommercial' }
            if (!attr.ND && attr.SA) {
                base += '-ShareAlike'
            } else if (attr.ND) {
                base += '-NoDerivatives'
            }
            base += ' 4.0 International'
            return base
        },
        attributeType(attrName) {
            if (this.$props.value.shortName.includes('CC0')) {
                return 'is-step-selected'
            }
            if (this.$props.value.shortName.includes('ND') && attrName === 'SA') {
                return 'is-step-not_selected is-step-with-tooltip'
            }
            if (!this.$props.value.shortName.includes(attrName)) {
                return 'is-step-not_selected'
            } else { return 'is-step-selected' }
        },
        isStepSelected(attrName) {
            return this.$props.value.shortName.includes(attrName)
        },
        isStepVisible(attrName) {
            if (this.$props.value.shortName.includes('CC0')) {
                return (attrName === 'BY' || attrName === 'wv' || attrName === 'ad')
            }
            return !(attrName === 'wv')
        },
        isStepClickable(attrName) {
            if (this.$props.value.shortName.includes('ND')) {
                return attrName !== 'SA'
            }
            return true
        }
    }
}
</script>

<style lang="scss">
    .card {
        height: 580px;
    }
    #stepper.column {
        padding:0!important;
    }
    #stepper .card-header {
        border-top: 10px solid #05B5DA;
        background-color: #05B5DA;
        padding-bottom: 1rem;
        box-shadow: none;
        color:white;
    }
    .steps {
        margin: 1.5rem -2rem 1rem;
    }
    #stepper .b-steps .steps.is-small .step-items .step-item .step-details {
        padding-top: 0.4em;
    }
    .step-title {
        white-space: nowrap;
    }
    .step-content {
        height: 270px;
    }
    nav.step-navigation {
        margin-top: 0;
        text-align:center;
    }
    .steps.is-small .icon svg {
        font-size: 2rem!important;
    }
    div#stepper .b-steps .steps .step-items {
        flex-wrap: nowrap;
    }
    #stepper .b-steps .steps .step-items .step-item .step-marker {
        left: 50%;
        margin-left: -0.75rem;
    }
    #stepper .b-steps .steps .step-items .step-item.is-active .step-marker {
        height: 2.4rem;
        width: 2.4rem;
        top: -12%;
        background-color: white;
        color: #04a635!important;
        border-color: #04a635;
        left: 50%;
        margin-left: -1.2rem;
    }
    #stepper .b-steps .steps .step-items .step-item.is-step-not_selected .step-title {
        font-weight: normal;
        opacity: 0.7;
    }
    #stepper .b-steps .steps .step-items .step-item.is-step-selected .step-title {
        font-weight: 700;
        opacity: 1;
    }
    #stepper .b-steps .steps .step-items .step-item.is-step-not_selected.is-active .step-marker {
        border-color: #68ca86;
    }
    #stepper .b-steps .steps .step-items .step-item:not(.is-previous):not(.is-active) .step-marker {
        color: #b5b5b5!important;
        background-color: white!important;
    }
    #stepper .b-steps .steps .step-items .step-item.is-step-not_selected:not(.is-active).is-previous .step-marker,
    #stepper .b-steps .steps .step-items .step-item.is-step-not_selected.is-active .step-marker {
        color: #ed5931;
        background-color: white;
        svg path {
            fill-opacity: 0.7;
        }
    }

    #stepper .b-steps .steps .step-items .step-item.is-step-selected.is-active .step-marker {
        background-color: white;
        border-color: #04a635;
        color: #04a635;
    }
    .is-step-selected .icon svg {
        font-size:2rem!important;
        width: 2rem!important;
        height: 2rem!important;
    }
    .is-step-selected .step-marker{
        width: 2.5rem!important;
        height:2.5rem!important;
        left: 50%!important;
        top: -17%;
        margin-left: -1.25rem!important;
    }
    .pagination-next {
        width: 200px;
        background-color: #04A635;
        color:white;
    }
    .pagination-next span {
        margin-left: auto;
    }
    .pagination-next:after {
        content:"Go to the next step";
        color: white;
        position: absolute;
        top: 3.5px;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .pagination-previous {
        width: 200px;
    }
    .pagination-previous span {
        margin-right: auto;
    }
    .pagination-previous:after {
        content: "Change previous step";
        position: absolute;
        top: 3.5px;
        left: 0;
        right: 0;
        bottom: 0;
    }
    @media only screen and (max-width: 670px) {
        div.card {
            height: auto;
        }
        section.step-content {
            height: auto;
        }

    }
    @media only screen and (max-width: 900px) {
        .step-title {
            white-space: normal;
            line-height: 1;
        }
    }
</style>
