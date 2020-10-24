/** @typedef {{BY?: boolean, NC?: boolean, ND?: boolean, SA?: boolean}} LicenseAttributes */

/** @typedef {('CC0 1.0'|'CC BY 4.0'|'CC BY-NC 4.0'|'CC BY-NC-ND 4.0'|'CC BY-NC-SA 4.0'|'CC BY-ND 4.0'|'CC BY-ND-SA 4.0')} ShortLicenseName
 */
import {LICENSES} from './licenses'
const CC0Attributes = LICENSES.CC0.ATTRIBUTES
const CCBYAttributes = LICENSES.CC_BY.ATTRIBUTES
const defaultAttributes = { BY: undefined, NC: undefined, ND: undefined, SA: undefined }

/**
 * Convert short license name to attributes
 * @param {ShortLicenseName} shortLicenseName - name of the license with version number
 * @returns {LicenseAttributes}}
 */
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

/**
 * Convert license attributes object to short license name
 * @param {LicenseAttributes} attr
 * @returns {ShortLicenseName}
 */
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

/**
 * Convert license attributes object to full license name
 * @param {{LicenseAttributes}} attr
 * @returns {string|undefined}
 */
function attrToFull(attr) {
    if (attr.BY === undefined) { return undefined }
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

/**
 * Returns url to license from short license name with version number (eg. 'CC BY 4.0')
 * @param attr {LicenseAttributes} license attributes object
 * @param [mode] {'web'| 'print'} (?ref=chooser-v1, target and rel are added to the end of the link if mode is web)
 * @returns {string} url of the license information page
 */
function licenseUrl(attr, mode) {
    const linkRef = mode === 'web' ? '/?ref=chooser-v1' : ''
    if (attr.BY === false) {
        return `https://creativecommons.org/publicdomain/zero/1.0${linkRef}`
    }
    let short = attrToShort(attr).toLowerCase().slice(3)
    short = short.slice(0, short.length - 4)
    return `https://creativecommons.org/licenses/${short}/4.0${linkRef}`
}

/**
 * Convert short license name to licence slug ('CC BY 4.0' -> 'cc-by')
 * @param {ShortLicenseName} shortLicenseName
 * @returns {string}
 */
function licenseSlug(shortLicenseName) {
    return shortLicenseName
        .toLowerCase()
        .replace(' ', '-')
        .slice(0, shortLicenseName.length - 4)
}

/**
 * Convert license attributes object to an array of icon names
 * @param {LicenseAttributes} licenseAttributes
 * @returns {string[]|[]} Array with slugified names of icons, eg. ['cc', 'by']
 */
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

function updateVisibleEnabledStatus(stepStatusData) {
    let visible
    let enabled
    let stepsDisabledDue = ''
    if (stepStatusData.FS) {
        // User will select from the dropdown
        if (stepStatusData.BY === false) {
            // User selected a license from the dropdown a CC0 license
            // First step, dropdown and attribution details should be visible and enabled
            visible = ['FS', 'DD', 'CW', 'AD']
            enabled = ['FS', 'DD', 'CW', 'AD']
            stepsDisabledDue = 'CC0'
        } else {
            // User hasn't selected anything yet, or selected a BY license
            // First step, dropdown and attribution details should be visible and enabled
            visible = ['FS', 'DD', 'AD']
            enabled = ['FS', 'DD', 'AD']
        }
    } else {
        // User uses the stepper for license selection
        if (stepStatusData.BY === false) {
            // User selects a CC0 license
            visible = ['FS', 'BY', 'NC', 'ND', 'SA', 'CW', 'AD']
            enabled = ['FS', 'BY', 'CW', 'AD']
            stepsDisabledDue = 'CC0'
        } else if (stepStatusData.ND) {
            // User selects an ND license: SA step is disabled
            visible = ['FS', 'BY', 'NC', 'ND', 'SA', 'AD']
            enabled = ['FS', 'BY', 'NC', 'ND', 'AD']
            stepsDisabledDue = 'CC0'
        } else {
            // User selects a non-ND BY license from the stepper
            visible = ['FS', 'BY', 'NC', 'ND', 'SA', 'AD']
            enabled = ['FS', 'BY', 'NC', 'ND', 'SA', 'AD']
        }
    }
    return { visible, enabled, stepsDisabledDue }
}


const CC_NAMESPACE = {
    NAME: 'xmlns:cc',
    URI: 'http://creativecommons.org/ns#'
}
const DCT_NAMESPACE = {
    NAME: 'xmlns:dct',
    URI: 'http://purl.org/dc/terms/'
}
const ICON_STYLE = 'height:22px!important;margin-left:3px;vertical-align:text-bottom;'
const ICON_BASE_URL = 'https://mirrors.creativecommons.org/presskit/icons/'

/**
 * Generate data for use in attribution HTML through i18n
 * @param attributionDetails
 * @param {ShortLicenseName} shortLicenseName
 * @returns {{creator: string, workTitle: string, licenseLink: string, htmlString: string}}
 */
function generateHTML(attributionDetails, shortLicenseName) {
    const dataForHtmlGeneration = {
        htmlString: '',
        creator: '',
        workTitle: '',
        licenseLink: ''
    }
    const { creatorName, creatorProfileUrl, workTitle, workUrl } = attributionDetails
    dataForHtmlGeneration.htmlString =
        `<p ${DCT_NAMESPACE.NAME}="${DCT_NAMESPACE.URI}"` +
        ` ${CC_NAMESPACE.NAME}="${CC_NAMESPACE.URI}"` +
        ' class="license-text">'
    const iconStyle = `style="${ICON_STYLE}"`
    const assetPathRef = '?ref=chooser-v1'
    let licenseIcons = `<img ${iconStyle} src="${ICON_BASE_URL}/cc.svg${assetPathRef}" />`
    const nameForSlug = shortLicenseName.includes('CC0') ? 'CC CC0 1.0' : shortLicenseName
    licenseIcons += nameForSlug
        .slice(3, nameForSlug.length - 4)
        .split('-')
        .map(attr => `<img ${iconStyle} src="${ICON_BASE_URL}/${attr.toLowerCase()}.svg${assetPathRef}" />`
        ).join('')
    const licenseHref = licenseUrl(shortToAttr(shortLicenseName))
    dataForHtmlGeneration.licenseLink =
        `<a rel="license" href="${licenseHref}" target="_blank"
        rel="license noopener noreferrer" style="display:inline-block;">
        ${shortLicenseName}${licenseIcons}</a>`

    if (creatorName) {
        if (creatorProfileUrl) {
            const absoluteUrl = creatorProfileUrl.startsWith('http') ? creatorProfileUrl : `http://${creatorProfileUrl}`
            dataForHtmlGeneration.creator =
                `<a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="${absoluteUrl}">${creatorName}</a>`
        } else {
            dataForHtmlGeneration.creator = `<span property="cc:attributionName">${creatorName}</span>`
        }
    }
    if (workTitle) {
        if (workUrl) {
            const absoluteUrl = workUrl.startsWith('http') ? workUrl : `http://${workUrl}`
            dataForHtmlGeneration.workTitle = `<a rel="cc:attributionURL" property="dct:title" href="${absoluteUrl}">${workTitle}</a>`
        } else {
            dataForHtmlGeneration.workTitle = `<span rel="dct:title">${workTitle}</span>`
        }
    }
    return dataForHtmlGeneration
}

export {
    defaultAttributes, CC0Attributes, CCBYAttributes, shortToAttr, attrToShort,
    attrToFull, licenseUrl, licenseSlug, licenseIconsArr, generateHTML, updateVisibleEnabledStatus,
    CC_NAMESPACE, DCT_NAMESPACE, LICENSES, ICON_STYLE, ICON_BASE_URL
}
