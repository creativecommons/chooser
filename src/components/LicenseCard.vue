<template>
    <div class='column'>
        <div class="card">
            <header class="card-header">
                <h2
                    :class="'vocab-h2'">{{ $t('selected-license.heading') }}</h2>
            </header>
            <div class="card-content">
                <SelectedLicenseDropdown
                    v-model="currentLicense"
                />
                <SelectedLicenseInfo
                    v-model="value"
                />
                <SelectedLicenseCode
                    v-model="value"
                />
            </div>
        </div>
    </div>

</template>
<script>

import SelectedLicenseInfo from './SelectedLicenseInfo'
import SelectedLicenseDropdown from './SelectedLicenseDropdown'
import SelectedLicenseCode from './SelectedLicenseCode'

export default {
    name: 'SelectedLicenseCard',
    props: ['value'],
    components: {
        SelectedLicenseCode,
        SelectedLicenseDropdown,
        SelectedLicenseInfo
    },
    computed: {
        currentLicense: {
            get() {
                return this.value
            },
            set(currentLicense) {
                this.$emit('input', currentLicense)
                this.$emit('dropdown-clicked')
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .column {
        padding:0!important;
    }
    div.card {
        height: 580px;
        border-top: 10px solid #04A635;
    }
    @media only screen and (max-width: 670px) {
        div.card {
            height: auto;
        }
    }
</style>
