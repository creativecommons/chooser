<template>
    <div class="license-dropdown">
        <b-field>
            <b-select :placeholder="this.$t('stepper.DD.placeholder')" @input="setCurrentLicense"
                      :value="this.shortName">
                <option
                    v-for="license in this.licenseList"
                    :value="license"
                    :key="license">
                    {{ license }}
                </option>
            </b-select>
        </b-field>
    </div>
</template>
<script>

import { mapGetters } from 'vuex'

export default {
    name: 'SelectedLicenseDropdown',
    data() {
        return {
            licenseList: [
                'CC0 1.0',
                'CC BY 4.0',
                'CC BY-SA 4.0',
                'CC BY-ND 4.0',
                'CC BY-NC 4.0',
                'CC BY-NC-SA 4.0',
                'CC BY-NC-ND 4.0'
            ],
            currentLicense: undefined
        }
    },
    methods: {
        setCurrentLicense(currentLicense) {
            this.$store.commit('updateAttributesFromShort', currentLicense)
            this.$emit('input')
            if (process.env.NODE_ENV === 'production') {
                this.$ga.event({
                    eventCategory: 'LicenseDropdown',
                    eventAction: 'licenseSelected',
                    eventLabel: currentLicense
                })
            }
        }
    },
    computed: {
        ...mapGetters(['shortName', 'fullName'])
    }

}
</script>
<style lang="scss">
    div.license-dropdown {
        margin-top: 1rem;
        label.label{
            font-weight: normal;
            opacity: 0.8;
            font-size: 1em;
        }
        span.select, select {
            width: 100%;
        }
    }
</style>
