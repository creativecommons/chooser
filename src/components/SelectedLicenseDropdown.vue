<template>
    <div class="license-dropdown">
        <b-field :label="this.$t('license-dropdown-label')">
            <b-select v-model="currentLicense">
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
            ]
        }
    },
    computed: {
        ...mapGetters(['shortName', 'fullName']),
        currentLicense: {
            get() {
                return this.shortName
            },
            set(currentLicense) {
                this.$store.commit('updateAttributesFromShort', currentLicense)
                if (process.env.NODE_ENV === 'production') {
                    this.$ga.event({
                        eventCategory: 'LicenseDropdown',
                        eventAction: 'licenseSelected',
                        eventLabel: currentLicense
                    })
                }
            }
        }
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
