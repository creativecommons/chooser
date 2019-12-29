<template>
    <div class='column'>
        <div class="card">
            <h2
                class="stepper-heading vocab-h2">
                Select Your License
            </h2>
            <p :class="'stepper-instructions'">Follow the steps below to select your Creative Commons License</p>
            <b-steps size="is-small">
                <b-step-item
                    v-for="item in this.licenses"
                    :label="item.label"
                    :icon-pack="item['icon-pack']"
                    :icon="item.icon"
                    v-bind:key="item.shortName"
                    :selected="licenseAttributes[item.shortName]"
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
                    icon="check">
                    <PersonalizationStep
                        v-model="value.personalDetails"
                    />
                </b-step-item>
            </b-steps>
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
            console.log(attrs)
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
        attributeSelected(attrShort) {
            return this.calculateAttributes(this.$props.value.shortName)[attrShort]
        },
        attributeType(attrName) {
            if (this.$props.value.shortName.includes(attrName)) { return 'selected' } else { return 'unselected' }
        }
    }
}
</script>
<style>
    div.card {
        font-family: "Source Sans Pro", "Noto Sans", Arial, "Helvetica Neue", Helvetica, sans-serif;
    }
    h2.stepper-heading {
        justify-content: center;
        padding-top: 1rem;
        text-align: center;
    }
    h2.vocab-h2{
        font-style: normal;
        font-weight: bold;
        font-size: 25px;
        line-height: 38px;
        /* identical to box height, or 152% */
        color: #333333;
    }
    .step-content {
        padding-bottom: 0;
    }
    nav.step-navigation {
        display: flex;
        padding-bottom: 1rem;
    }
    a.pagination-previous {
        margin-left: auto;
    }
    a.pagination-next {
        margin-right: 1rem;
    }
    hr {
        margin-bottom: 0!important;
        border: 1px solid #e0e0e0!important;
    }
    .card .b-steps .steps.is-small .step-link>.step-marker>.icon {
        height: 2rem!important;
        width: 2rem!important;
    }
    .card .b-steps .steps.is-small .step-link>.step-marker>.icon>svg{
        height: 2em!important;
        width: 2em!important;
    }
    .card  .b-steps .steps.is-small .step-item>.step-link>.step-marker {
        width: 2.4rem;
        height: 2.4rem;
        left: calc(45% - 0.73rem);
        top: -10%;
    }
    .b-steps svg path {
        fill: black;
    }
    li.selected>a>div>span>svg>path {
        fill: black;
        opacity: 90%;
    }
    li.unselected>a>div>span>svg>path {
        fill: black;
        opacity: 30%;
    }
    li.step-item {
        background-color:white;
    }
    .step-marker {
        background:white!important;
    }
    .is-active>a>div>span>svg {
        width:2rem!important;
        height:2rem!important;
    }
    /*.icon svg {*/
    /*    font-size: 2rem;*/
    /*    width: 2rem!important;*/
    /*    height: 2rem!important;*/
    /*}*/
</style>
<style scoped>
    .stepper-instructions {
        padding-top: 1rem;
        padding-bottom: 1.4rem;
        text-align: center;
    }
    .selected-license-names b {
        font-size: 1.8rem;
    }

    b {
        text-align: center;
    }
</style>
