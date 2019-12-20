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
        /*line-height: 2rem;*/
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
        /* identical to box height, or 146% */
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
