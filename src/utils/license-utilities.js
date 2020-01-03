const LicenseUtilities = {

    install(Vue) {
        const defaultLicenseAttributes = {
            BY: true,
            NC: false,
            ND: false,
            SA: false
        }

        Vue.prototype.$shortToAttributes = function(shortLicenseName) {
            const short = shortLicenseName.toLowerCase()
            if (short.includes('cc0')) {
                return { ...defaultLicenseAttributes, by: false }
            }
            const nc = short.includes('nc')
            const nd = short.includes('nd')
            const sa = short.includes('sa')
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
