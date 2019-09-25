<template>
    <div id="SelectedLicense">
        <div class="card chooser-selected">
            <header class="card-header">
                <h2 class="title is-2">Selected License</h2>
            </header>
            <div class="card-content">
                <div>
                    <LicenseIconography :iconList="iconsList"/>
                    <div class="selected-license-names">
                        <b class="selected-license-name">{{shortLicenseName}}</b>
                        <a ref="license_link" class="help">{{fullLicenseName}}</a>
                    </div>
                </div>
                <LicenseDescription
                    :selectedLicense="shortLicenseName"/>
            </div>
        </div>
    </div>
</template>
<script>
import LicenseDescription from './LicenseDescription'
import LicenseIconography from './LicenseIconography'
import licenseUrl from '@/utils/licenseUrl'

export default {
    name: 'SelectedLicense',
    props: ['fullLicenseName', 'shortLicenseName'],
    components: {
        LicenseDescription,
        LicenseIconography
    },
    computed: {
        iconsList() {
            var base = ['']
            var slicedName = this.$props.shortLicenseName
                .slice(3, this.$props.shortLicenseName.length - 4)
            var extras = slicedName.toLowerCase().split('-')
            return base.concat(extras)
        }
    },
    mounted: function() {
        this.$refs.license_link.href = licenseUrl(this.$props.shortLicenseName)
    },
    watch: {
        shortLicenseName: function(newVal, oldVal) {
            this.$refs.license_link.href = licenseUrl(this.$props.shortLicenseName)
        }
    }
}
</script>
<style>
.chooser-selected {
    border-radius: 5px;
}

.chooser-selected h2 {
    margin: 1.5% auto;
    text-align: center;
}

.chooser-selected img {
    display: inline;
    vertical-align: middle;
    width: 42px;
    opacity: 0.7;
    filter: alpha(opacity=70); /* msie */
}

.selected-license-names b {
    font-size: 1.8rem;
}

.switch-container p, b-switch {
    display: inline;
}
</style>
