<template>
    <div class='column'>
        <div class="card chooser-selected">
            <header class="card-header">
                <Heading :level="5" color="blue">Your License</Heading>
            </header>
            <div class="card-content">
                <SelectedLicenseDropdown
                    v-model="value.shortName"
                />
                <SelectedLicenseInfo
                    v-model="value"
                />
                <SelectedLicenseHTMLGenerator
                    v-model="value"
                />
            </div>
        </div>
    </div>

</template>
<script>

import SelectedLicenseInfo from './SelectedLicenseInfo'
import SelectedLicenseDropdown from './SelectedLicenseDropdown'
import SelectedLicenseHTMLGenerator from './SelectedLicenseHTMLGenerator'
import { Heading } from '@creativecommons/vocabulary'

export default {
    name: 'SelectedLicenseCard',
    props: ['value'],
    components: {
        SelectedLicenseHTMLGenerator,
        SelectedLicenseDropdown,
        SelectedLicenseInfo,
        Heading
    },
    methods: {
        updateLicense() {
            this.$emit('input', {
                shortName: this.shortLicenseName,
                fullName: this.fullLicenseName
            })
        }
    },
    watch: {
        value() {
            this.$emit('input', this.value)
        }
    }
}
</script>
<style scoped>
    header.card-header {
        justify-content: center;
        padding-top: 1rem;
    }
    .card-content {
        padding-top: 0.5rem;
    }
    h3 {
        font-weight: 700;
        font-size:1.5874rem;
    }
    .selected-license-names b {
        font-size: 1.8rem;
    }
    b {
        text-align: center;
    }
</style>
