const LicenseUtilities = {

    install(Vue) {
        const defaultLicenseAttributes = {
            BY: true,
            NC: false,
            ND: false,
            SA: false
        }

        Vue.prototype.$shortToAttributes = function(shortLicenseName) {
            const short = shortLicenseName
            if (short.includes('CC0')) {
                return { ...defaultLicenseAttributes, BY: false }
            }
            const nc = short.includes('NC')
            const nd = short.includes('ND')
            const sa = short.includes('SA')
            return { ...defaultLicenseAttributes, NC: nc, ND: nd, SA: sa }
        }
        Vue.prototype.$licenseUrl = function(shortLicenseName) {
            // Returns url to license
            const short = shortLicenseName.toLowerCase().slice(3, shortLicenseName.length - 4)
            return 'https://creativecommons.org/licenses/' + short + '/4.0/?ref=ccchooser'
        }
        Vue.prototype.$licenseSlug = function(shortLicenseName) {
            // Returns lower case slugified string of license name without the version number
            return shortLicenseName
                .toLowerCase()
                .replace(' ', '-')
                .slice(0, shortLicenseName.length - 4)
        }
        Vue.prototype.$licenseIconsArr = function(shortLicenseName) {
            return shortLicenseName
                .toLowerCase()
                .slice(3, shortLicenseName.length - 4)
                .split('-')
        }
    }
}

export default LicenseUtilities
