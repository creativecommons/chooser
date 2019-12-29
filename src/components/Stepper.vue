<template>
    <div class='column'>
        <div id="stepper" class="card">
            <header class="card-header">
                <h2 :class="'vocab-h2'">Select Your License</h2>
            </header>
            <div class="card-content">
            <p :class="'stepper-instructions'">Follow the steps below to select your Creative Commons License</p>
            <b-steps size="is-small">
                <b-step-item
                    v-for="item in this.licenses"
                    :label="item.label"
                    :icon-pack="item['icon-pack']"
                    :icon="item.icon"
                    v-bind:key="item.shortName"
                    :selected="licenseAttributes[item.shortName]"
                    :visible="isStepVisible(item.shortName)"
                    :clickable=true
                    :type="attributeType(item.shortName)"
                >
                    <SelectionStep
                        :selected="licenseAttributes[item.shortName]"
                        :stepId="item.shortName"
                        v-on:input="updateLicense(item.shortName)"
                    />
                </b-step-item>
                <b-step-item
                    label="Personalize Your License"
                    :clickable=true
                    icon="check"
                    :type="'personalization'"
                >
                    <PersonalizationStep
                        v-model="value.personalDetails"
                    />
                </b-step-item>
            </b-steps>
            </div>
        </div>
    </div>
</template>
<script>

import SelectionStep from './SelectionStep'
import PersonalizationStep from './PersonalizationStep'

export default {
    name: 'SelectionStepper',
    props: ['value'],
    components: {
        SelectionStep,
        PersonalizationStep
    },
    data() {
        return {
            licenses: [
                {
                    label: 'Attribution',
                    shortName: 'BY',
                    'icon-pack': 'fab',
                    icon: 'creative-commons-by'
                },
                {
                    label: 'Non Derivative',
                    shortName: 'ND',
                    'icon-pack': 'fab',
                    icon: 'creative-commons-nd'
                },
                {
                    label: 'Non Commercial',
                    shortName: 'NC',
                    'icon-pack': 'fab',
                    icon: 'creative-commons-nc'
                },
                {
                    label: 'Share-Alike',
                    shortName: 'SA',
                    'icon-pack': 'fab',
                    icon: 'creative-commons-sa'
                }
            ]
        }
    },
    computed: {
        licenseAttributes() {
            return this.calculateAttributes(this.$props.value.shortName)
        }
    },
    methods: {
        updateLicense(itemId) {
            const attrs = { ...this.licenseAttributes }
            attrs[itemId] = !attrs[itemId]
            this.$emit('input', {
                shortName: this.shortLicenseName(attrs),
                fullName: this.fullLicenseName(attrs),
                personalDetails: this.$props.value.personalDetails
            })
        },
        calculateAttributes(shortName) {
            if (shortName.includes('CC0')) {
                return { BY: false, ND: false, NC: false, SA: false }
            } else {
                const by = true
                const nd = !!shortName.includes('ND')
                const nc = !!shortName.includes('NC')
                const sa = !!shortName.includes('SA')
                return { BY: by, ND: nd, NC: nc, SA: sa }
            }
        },
        shortLicenseName(attr) {
            if (!attr.BY) { return 'CC0 1.0' }
            let base = 'CC BY'
            if (attr.NC) { base += '-NC' }
            if (!attr.ND && attr.SA) { base += '-SA' } // eslint-disable-line brace-style
            else if (attr.ND) { base += '-ND' }
            base += ' 4.0'
            return base
        },
        fullLicenseName(attr) {
            if (!attr.BY) { return 'CC0 1.0 Universal' }
            let base = 'Attribution'
            if (attr.NC) { base += '-NonCommercial' }
            if (!attr.ND && attr.SA) { base += '-ShareAlike' } // eslint-disable-line brace-style
            else if (attr.ND) { base += '-NoDerivatives' }
            base += ' 4.0 International'
            return base
        },
        attributeType(attrName) {
            if (this.$props.value.shortName.includes(attrName)) {
                return 'selected'
            } else { return 'unselected' }
        },
        isStepVisible(attrName) {
            return !(this.$props.value.shortName.includes('ND') && attrName === 'SA')
        }
    }
}
</script>

<style lang="scss">
    div#stepper.card{
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
                                                /*opacity: 60%;*/
                                            }
                                        }
                                    }
                                }
                                div.step-details {
                                    padding-top:0.6rem;
                                    span.step-title {
                                        font-size:0.875rem;
                                        line-height:1;
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
                                    a div.step-marker{
                                        border-color: #F6AC98;
                                        border-width:2px;
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
                                a.step-link{
                                    div.step-marker {
                                    /*background: #0e71de!important;*/
                                    span > svg > path {
                                        opacity: 50% !important;
                                    }
                                }
                                    div.step-details span.step-title {
                                        font-weight: 400;
                                        opacity: 50%;
                                    }
                            }
                        }
                    }
                }
                section.step-content{
                    padding-bottom: 0;
                }
                nav.step-navigation {
                    display: flex;
                    padding-bottom: 1rem;
                    a.pagination-previous {
                        margin-left: auto;
                    }
                    a.pagination-next {
                        margin-right: 1rem;
                    }
                }
            }
        }}

        hr {
            margin-bottom: 0!important;
            border: 1px solid #e0e0e0!important;
        }

        li.personalization {
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

        li.personalization>a>div>span>svg{

        }
    }
</style>
