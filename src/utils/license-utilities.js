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
        Vue.prototype.$attrToShort = function(attr) {
            if (!attr.BY) { return 'CC0 1.0' }
            let base = 'CC BY'
            if (attr.NC) { base += '-NC' }
            if (!attr.ND && attr.SA) {
                base += '-SA'
            } else if (attr.ND) {
                base += '-ND'
            }
            base += ' 4.0'
            return base
        }
        Vue.prototype.$attrToFull = function(attr) {
            if (!attr.BY) { return 'CC0 1.0 Universal' }
            let base = 'Attribution'
            if (attr.NC) { base += '-NonCommercial' }
            if (!attr.ND && attr.SA) {
                base += '-ShareAlike'
            } else if (attr.ND) {
                base += '-NoDerivatives'
            }
            base += ' 4.0 International'
            return base
        }
        Vue.prototype.$licenseUrl = function(shortLicenseName) {
            // Returns url to license
            if (shortLicenseName.includes('CC0')) {
                return 'https://creativecommons.org/publicdomain/zero/1.0/?ref=ccchooser'
            }
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
            if (shortLicenseName.includes('CC0')) {
                return ['zero']
            }
            return shortLicenseName
                .toLowerCase()
                .slice(3, shortLicenseName.length - 4)
                .split('-')
        }
    }
}

export default LicenseUtilities
