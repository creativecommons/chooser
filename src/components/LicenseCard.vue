<template>
    <div class='column'>
        <div class="card chooser-selected">
            <header class="card-header">
                <h2
                    :class="'vocab-h2'">Your License</h2>
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
<style scoped>
    header.card-header {
        justify-content: center;
        padding-top: 1rem;
    }
    h2.vocab-h2{
        font-family: "Source Sans Pro", "Noto Sans", Arial, "Helvetica Neue", Helvetica, sans-serif;
        font-style: normal;
        font-weight: bold;
        font-size: 25px;
        line-height: 38px;
        color: #333333;
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
