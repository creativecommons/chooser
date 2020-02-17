const CC0Attributes = { BY: false, NC: false, ND: false, SA: false }
const CCBYAttributes = { BY: true, NC: false, ND: false, SA: false }
const defaultAttributes = { BY: undefined, NC: undefined, ND: undefined, SA: undefined }
const visibleSetters = {
    FS: {
        true: ['FS', 'DD', 'AD'],
        false: ['FS', 'BY', 'NC', 'ND', 'SA', 'AD']
    },
    BY: {
        // Decide if NC/ND/SA should be disabled or removed on CC0
        true: ['FS', 'BY', 'NC', 'ND', 'SA', 'AD'],
        false: ['FS', 'BY', 'CW', 'NC', 'ND', 'SA', 'AD']
    },
    ND: {
        true: ['FS', 'BY', 'NC', 'ND', 'SA', 'AD']
    }
}
const disabledSetters = {
    // Steps that should be disabled if other steps are selected/not selected
    BY: {
        false: ['NC', 'ND', 'SA']
    },
    ND: {
        true: ['SA']
    }
}

function shortToAttr(shortLicenseName) {
    const short = shortLicenseName
    if (short.includes('CC0')) {
        return { ...CC0Attributes }
    }
    const nc = short.includes('NC')
    const nd = short.includes('ND')
    const sa = short.includes('SA')
    return { ...CCBYAttributes, NC: nc, ND: nd, SA: sa }
}

function attrToShort(attr) {
    if (attr.BY === undefined) return undefined
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

function attrToFull(attr) {
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
// function licenseUrl(shortLicenseName) {
//     Returns url to license from short license name with version number (eg. 'CC BY 4.0')
//     TODO: check how it works: it doesn't use '-' to join elements ?
//     if (shortLicenseName.includes('CC0')) {
//         return 'https://creativecommons.org/publicdomain/zero/1.0/?ref=ccchooser'
//     }
//     const short = shortLicenseName.toLowerCase().slice(3, shortLicenseName.length - 4)
//     return 'https://creativecommons.org/licenses/' + short + '/4.0/?ref=ccchooser'
// }
function licenseUrl(attr) {
    // Returns url to license from short license name with version number (eg. 'CC BY 4.0')
    if (attr.BY === false) {
        return 'https://creativecommons.org/publicdomain/zero/1.0/?ref=ccchooser'
    }
    let short = attrToShort(attr).toLowerCase().slice(3)
    short = short.slice(0, short.length - 4)
    return 'https://creativecommons.org/licenses/' + short + '/4.0/?ref=ccchooser'
}

function licenseSlug(shortLicenseName) {
    // Returns lower case slugified string of license name without the version number
    // 'CC BY 4.0' -> 'cc-by'
    return shortLicenseName
        .toLowerCase()
        .replace(' ', '-')
        .slice(0, shortLicenseName.length - 4)
}

function licenseIconsArr(licenseAttributes) {
    if (!licenseAttributes.BY) {
        return ['zero']
    }
    const iconsArray = []
    for (const key in licenseAttributes) {
        if (licenseAttributes[key]) {
            iconsArray.push(key.toLowerCase())
        }
    }
    return iconsArray
}

export { defaultAttributes, CC0Attributes, CCBYAttributes, visibleSetters, disabledSetters, shortToAttr, attrToShort, attrToFull, licenseUrl, licenseSlug, licenseIconsArr }
