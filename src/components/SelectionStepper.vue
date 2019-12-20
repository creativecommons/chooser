<template>
    <div class='column'>
        <div class="card">
        <h2
            :class="'stepper-heading vocab-h2'">
            Select Your License
        </h2>
        <p :class="'stepper-instructions'">Follow the steps below to select your Creative Commons License</p>
        <b-steps size="is-small">
            <b-step-item
                v-for="item in licenses"
                :label="item.label"
                :icon="item.icon"
                v-bind:key="item.shortName"
                :clickable=true
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
                icon="account">
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
                    'label': 'Attribution',
                    'shortName': 'BY',
                    'icon': 'Account',
                    'selected': true
                },
                {
                    'label': 'Non Derivative',
                    'shortName': 'ND',
                    'icon': 'Account'
                },
                {
                    'label': 'Non Commercial',
                    'shortName': 'NC',
                    'icon': 'Account'
                },
                {
                    'label': 'Share-Alike',
                    'shortName': 'SA',
                    'icon': 'Account'
                }
            ]
        }
    },
    computed: {
        licenseAttributes: function() {
            return this.calculateAttributes(this.$props.value.shortName)
        }
    },
    methods: {
        updateLicense(itemId) {
            let attrs = { ...this.licenseAttributes }
            attrs[itemId] = !attrs[itemId]
            console.log(attrs)
            this.$emit('input', {
                'shortName': this.shortLicenseName(attrs),
                'fullName': this.fullLicenseName(attrs),
                'personalDetails': this.$props.value.personalDetails
            })
        },
        calculateAttributes(shortName) {
            if (shortName.includes('CC0')) {
                return { 'BY': false, 'ND': false, 'NC': false, 'SA': false }
            } else {
                const by = true
                const nd = !!shortName.includes('ND')
                const nc = !!shortName.includes('NC')
                const sa = !!shortName.includes('SA')
                return { 'BY': by, 'ND': nd, 'NC': nc, 'SA': sa }
            }
        },
        shortLicenseName(attr) {
            if (!attr['BY']) { return 'CC0 1.0' }
            let base = 'CC BY'
            if (attr['NC']) { base += '-NC' }
            if (!attr['ND'] && attr['SA']) { base += '-SA' } // eslint-disable-line brace-style
            else if (attr['ND']) { base += '-ND' }
            base += ' 4.0'
            return base
        },
        fullLicenseName(attr) {
            if (!attr['BY']) { return 'CC0 1.0 Universal' }
            let base = 'Attribution'
            if (attr['NC']) { base += '-NonCommercial' }
            if (!attr['ND'] && attr['SA']) { base += '-ShareAlike' } // eslint-disable-line brace-style
            else if (attr['ND']) { base += '-NoDerivatives' }
            base += ' 4.0 International'
            return base
        }
    }
}
</script>
<style>
    h2.stepper-heading {
        justify-content: center;
        padding-top: 1rem;
        text-align: center;
    }
    h2.vocab-h2{
        font-family: Source Sans Pro;
        font-style: normal;
        font-weight: bold;
        font-size: 25px;
        line-height: 38px;
        /* identical to box height, or 152% */
        color: #333333;
    }
</style>
<style scoped>
    .stepper-instructions {
        padding-top: 1rem;
        padding-bottom: 1rem;
        text-align: center;
    }
    .selected-license-names b {
        font-size: 1.8rem;
    }

    b {
        text-align: center;
    }
</style>
