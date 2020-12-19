<template>
    <div class="step-actions">
        <b-field class="license-dropdown">
            <b-select
                :placeholder="$t('stepper.DD.placeholder')"
                :value="shortName"
                @input="setCurrentLicense"
            >
                <option
                    v-for="license in licenseList"
                    :key="license"
                    :value="license"
                >
                    {{ license }}
                </option>
            </b-select>
        </b-field>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'DropdownStep',
    inheritAttrs: false,
    props: {
        id: Number
    },
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
    computed: {
        ...mapGetters(['shortName', 'fullName'])
    },
    methods: {
        setCurrentLicense(currentLicense) {
            this.$store.commit('updateAttributesFromShort', currentLicense)
            if (process.env.NODE_ENV === 'production') {
                this.$ga.event({
                    eventCategory: 'LicenseDropdown',
                    eventAction: 'licenseSelected',
                    eventLabel: currentLicense
                })
            }
            this.$emit('change', { name: 'DD', id: this.$props.id, selected: true })
        }
    }
}
</script>

<style lang="scss">
.license-dropdown {
    margin-top: 1rem;
    .select, select {
        width: 100%;
    }
    .select select {
        border: 0.125rem solid #d8d8d8;
        &:active, &:focus, &:hover {
            border-color: #b0b0b0;
        }
    }
}
@media only screen and (max-width: 768px) {
    .license-dropdown {
        margin-top: 0;
    }
}
</style>
