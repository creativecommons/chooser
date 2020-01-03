<template>
        <p id='chooser-selected-description'>
            {{ licenseDescription }}
        </p>
</template>
<script>

export default {
    name: 'LicenseDescription',
    props: ['selectedLicense'],
    computed: {
        licenseDescription() {
            const descriptionString = `${this.$licenseSlug(this.selectedLicense)}-description`
            return this.$t(descriptionString)
        }
    }
}
</script>
<style scoped>
    #chooser-selected-description {
        height: 72px;
    }
    @media only screen and (max-width: 670px) {
        p {
            font-size: 14px;
        }

        .mobile-hide { display: none; }
        .mobile-show { display: block; }
    }
</style>
