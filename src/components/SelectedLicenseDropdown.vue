<template>
    <div class="license-dropdown">
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
            if (!shortName.includes('ND') && shortName.includes('SA')) {
                base += '-ShareAlike'
            } else if (shortName.includes('ND')) {
                base += '-NoDerivatives'
            }
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
<style lang="scss">
    div.license-dropdown {
        p.dropdown-instruction{
            padding-bottom: 1.4rem;
            text-align: center;
            font-size: 0.875em;
            opacity: 90%;
        }
        div.field {
            display: grid;
            grid-template-columns: 1fr 2fr;
            grid-gap: 5px;
            label.label {
                font-style: normal;
                font-weight: bold;
                font-size: 20px;
                line-height: 30px;
                color: #333333;
            }
            div.control {
                span.select {
                    width: 100%;
                    select {
                        width: 100%;
                    }
                }
            }
        }
    }
</style>
