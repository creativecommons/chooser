<template>
    <div>
        <p
            :class="'dropdown-instruction'">
            If you already know which license you need, just select it in the dropdown below.</p>
        <b-field label="Current selection">
            <b-select placeholder="Creative Commons License"
                      v-model="currentLicense">
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

export default {
    name: 'SelectedLicenseDropdown',
    props: ['value'],
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
    methods: {
        fullLicenseName(shortName) {
            if (!shortName.includes('BY')) { return 'CC0 1.0 Universal' }
            let base = 'Attribution'
            if (shortName.includes('NC')) { base += '-NonCommercial' }
            if (!shortName.includes('ND') && shortName.includes('SA')) { base += '-ShareAlike' } else if (shortName.includes('ND')) { base += '-NoDerivatives' }
            base += ' 4.0 International'
            return base
        }
    },
    computed: {
        currentLicense: {
            get() {
                return this.value.shortName
            },
            set(currentLicense) {
                const fullLicenseName = this.fullLicenseName(currentLicense)
                this.$emit('input', { ...this.$props.value, fullName: fullLicenseName, shortName: currentLicense })
            }
        }
    }

}
</script>
<style>
    .selected-license-names b {
        font-size: 1.8rem;
    }
    b {
        text-align: center;
    }
    div.field {
        grid-template-columns: 1fr 2fr;
        grid-gap: 5px;
        display: grid;
    }
    label.label {
        font-family: Source Sans Pro;
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        line-height: 30px;
        /* identical to box height, or 150% */
        color: #333333;
    }
    p.dropdown-instruction {
        font-family: Source Sans Pro;
        font-style: normal;
        font-weight: normal;
        font-size: 13px;
        line-height: 19px;
        color: #333333;
        margin-bottom: 13px;
    }
    h4 {
        margin-bottom: 0.8rem;
        font-weight: 500;
    }
    span.select, select {
        width: 100%;
    }

</style>
