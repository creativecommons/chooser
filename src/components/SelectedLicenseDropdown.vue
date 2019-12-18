<template>
    <div>
        <p>If you already know which license you need, just select it in the dropdown below.</p>
        <b-field label="Current selection">
            <b-select placeholder="Creative Commons License"
                      v-model="currentLicense"
            >
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
/* eslint no-return-assign:0 */

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
    computed: {
        currentLicense: {
            get() { return this.value },
            set(currentLicense) { this.$emit('input', currentLicense) }
        }
    },
    watch: {
        value() {
            this.$emit('input', this.currentLicense)
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
        line-height: 2rem;
    }
    span.select, select {
        width: 100%;
    }

</style>
