<template>
    <div id="SelectedLicenseInfo">
        <h4>{{ value.fullName }}</h4>
        <div>
            <ul id="license-list">
                <li v-for="item in iconsList"
                    :key="item">
                    <LicenseIconography
                        :icon-list="[item]"/>
                    <span class="readable-string">
                        {{ readableString(item)}}
                    </span>
                </li>
            </ul>
        </div>
        <LicenseDescription
            :selectedLicense="value.shortName"/>
    </div>
</template>
<script>
import LicenseDescription from './LicenseDescription'
import LicenseIconography from './LicenseIconography'
import licenseUrl from '@/utils/licenseUrl'

export default {
    name: 'SelectedLicenseInfo',
    props: ['value'],
    components: {
        LicenseDescription,
        LicenseIconography
    },
    methods: {
        readableString(shortString) {
            const readableStrings = {
                cc0: 'Public Domain',
                by: 'The creator must be credited',
                nc: 'Commercial use not permitted',
                nd: 'No derivatives or modification permitted',
                sa: 'Share allowed only on the same conditions'
            }

            return readableStrings[shortString] ? readableStrings[shortString] : 'Public Domain'
        }
    },
    computed: {
        iconsList() {
            const slicedName = this.$props.value.shortName
                .slice(3, this.$props.value.shortName.length - 4)
            return slicedName.toLowerCase().split('-')
        }
    },
    mounted: function() {
        console.log('SelectedLicenseInfo mounted, licenseUrl: ', this.$refs, licenseUrl)
        // this.$refs.license_link.href = licenseUrl(this.$props.value.shortName)
    },
    watch: {
        shortLicenseName: function(newVal, oldVal) {
            console.log(newVal, oldVal, this.$refs)
            // this.$refs.license_link.href = licenseUrl(this.$props.value.shortName)
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
    #SelectedLicenseInfo h4 {
        line-height: 2;
        font-weight: 600;
        margin-top: 1rem;
        margin-bottom: 0.5rem;
    }

    .chooser-selected img {
        display: inline;
        vertical-align: top;
    }

    .selected-license-names b {
        font-size: 1.8rem;
    }
    .license-icons svg {
        width: 25px!important;
        height: 25px!important;
    }
    .switch-container p, b-switch {
        display: inline;
    }
    .readable-string {
        vertical-align: top;
        padding-left: 20px;
        font-weight: 500;
    }
</style>
