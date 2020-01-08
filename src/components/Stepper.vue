<template>
    <div class='column'>
        <div id="stepper" class="card">
            <header class="card-header">
                <h2 :class="'vocab-h2'">{{ $t('select-license-heading') }}</h2>
            </header>
            <div class="card-content">
            <p :class="'stepper-instructions'">{{ $t('select-license-instructions') }}</p>
            <b-steps size="is-small">
                <b-step-item
                    v-for="item in this.steps"
                    :icon-pack="item['icon-pack']"
                    :icon="getIcon(item.shortName)"
                    :label=$t(item.label)
                    :key="item.shortName"
                    :selected="isStepSelected(item.shortName)"
                    :visible="isStepVisible(item.shortName)"
                    :clickable=true
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
            steps: [
                {
                    label: 'stepper-label.Attribution',
                    shortName: 'BY',
                    'icon-pack': 'fab',
                    itemType: 'licenseAttribute'
                },
                {
                    label: 'stepper-label.NoDerivatives',
                    shortName: 'ND',
                    'icon-pack': 'fab',
                    itemType: 'licenseAttribute'
                },
                {
                    label: 'stepper-label.NonCommercial',
                    shortName: 'NC',
                    'icon-pack': 'fab',
                    itemType: 'licenseAttribute'
                },
                {
                    label: 'stepper-label.Share-Alike',
                    shortName: 'SA',
                    'icon-pack': 'fab',
                    itemType: 'licenseAttribute'
                },
                {
                    label: 'stepper-label.CopyrightWaiver',
                    shortName: 'wv',
                    'icon-pack': 'fas',
                    itemType: 'CC0Attribute'
                },
                {
                    label: 'stepper-label.AttributionDetails',
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
        }
    },
    methods: {
        getAttributionIcon() {
            return this.$props.value.shortName.includes('BY') ? 'creative-commons-by' : 'creative-commons-zero'
        },
        getIcon(attrName) {
            if (attrName === 'BY') {
                return this.getAttributionIcon()
            } else if (attrName === 'wv') {
                return 'exclamation-circle'
            } else if (attrName === 'ad') {
                return 'check'
            } else {
                return `creative-commons-${attrName.toLowerCase()}`
            }
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
            if (attrName === 'BY' || attrName === 'wv' || attrName === 'ad' || this.$props.value.shortName.includes(attrName)) {
                return 'selected'
            } else { return 'unselected' }
        },
        isStepSelected(attrName) {
            return this.$props.value.shortName.includes(attrName)
        },
        isStepVisible(attrName) {
            if (this.$props.value.shortName.includes('CC0')) {
                return (attrName === 'BY' || attrName === 'wv' || attrName === 'ad')
            }
            return !(this.$props.value.shortName.includes('ND') && attrName === 'SA') && !(attrName === 'wv')
        }
    }
}
</script>

<style lang="scss">
    div#stepper.card{
        height: 540px;
        div.card-content{
            p.stepper-instructions {
                padding-bottom: 1.4rem;
                text-align: center;
                font-size: 0.875em;
                opacity: 90%;
            }
            div.b-steps{
                nav.steps {
                    ul.step-items {
                        li.step-item {
                            background-color:white;
                            a.step-link {
                                div.step-marker {
                                    // This is the element that shows border/ circle
                                    background:white!important;
                                    width: 2.6rem;
                                    height: 2.6rem;
                                    left: calc(50% - 1.2rem);
                                    top: -11%;
                                    span.icon {
                                        svg {
                                            font-size:2rem;
                                            path {
                                                fill: black;
                                            }
                                        }
                                    }
                                }
                                div.step-details {
                                    padding-top:0.6rem;
                                    span.step-title {
                                        font-size:0.875rem;
                                        line-height:1;
                                        white-space: nowrap;
                                    }
                                }
                            }
                            &.is-active {
                                svg {
                                    width:2.3rem!important;
                                    height:2.3rem!important;
                                    path {
                                        fill: #ED592F!important;
                                    }
                                }
                                div.step-details span.step-title {
                                    font-weight: 800;
                                    color: #ED592F;
                                }
                                &.unselected {
                                    a div.step-marker {
                                        border-color: #F6AC98;
                                        border-width: 2px;
                                    }
                                }
                            }
                            &.selected {
                                a.step-link {
                                    div.step-marker {
                                        background:white!important;
                                        span>svg>path {
                                            opacity: 100%!important;
                                        }
                                    }
                                }
                                div.step-details span.step-title {
                                    font-weight: 800;
                                }
                            }
                            &.unselected {
                                a.step-link {
                                    div.step-marker {
                                        span > svg > path {
                                            opacity: 40% !important;
                                        }
                                    }
                                    div.step-details span.step-title {
                                        font-weight: 500;
                                        opacity: 60%;
                                    }
                                }
                            }

                            &:nth-child(3) {
                                .step-marker {
                                    left: calc(50% - 1.3rem);
                                }
                            }
                        }
                    }
                }
                section.step-content {
                    padding-bottom: 0;
                    height: 280px;
                }
                nav.step-navigation {
                    display: flex;
                    margin: 0 1rem 0.5rem auto;
                    justify-content: flex-end;
                    a.pagination-previous {
                        margin-left: auto;
                    }

                }
            }
        }

        hr {
            margin-bottom: 0!important;
            border: 1px solid #e0e0e0!important;
        }

        li.attributionDetails {
            a > div > span > svg {
                font-size:1.5rem!important;
                border-radius: 50%;
                padding:5px;
                box-shadow: inset 0 0 0 2px #4a4a4a;
                &:hover {
                    box-shadow: inset 0 0 0 3px #FB7729;
                }
                path {
                    fill: #4a4a4a!important;
                    &:hover {
                        opacity: 30%;
                    }
                }
            }
            &.is-active {
                svg {
                    box-shadow: inset 0 0 0 2px #ED592F;
                }
            }
        }
    }
    @media only screen and (max-width: 670px) {
        div.card {
            height: auto;
        }
        section.step-content {
            height: auto;
        }
    }
</style>
