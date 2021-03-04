/** @typedef {{BY?: boolean, NC?: boolean, ND?: boolean, SA?: boolean}} LicenseAttributes */

/** @typedef {('CC0 1.0'|'CC BY 4.0'|'CC BY-SA 4.0'|'CC BY-NC 4.0'|'CC BY-ND 4.0'|'CC BY-NC-ND 4.0'|'CC BY-NC-SA 4.0')} ShortLicenseName
 */
/** @typedef {('CC0 1.0 Universal'|'Attribution 4.0 International'|'Attribution-ShareAlike 4.0 International'|'Attribution-NonCommercial-ShareAlike 4.0 International'|'Attribution-NonCommercial-NoDerivatives 4.0 International'|'Attribution-NoDerivatives 4.0 International')} FullLicenseName
 */
import { LICENSES } from './licenses'
const CC0Attributes = LICENSES.CC0.ATTRIBUTES
const CCBYAttributes = LICENSES.CC_BY.ATTRIBUTES
const defaultAttributes = { BY: undefined, NC: undefined, ND: undefined, SA: undefined }

const shortToSlug = {
  'CC0 1.0': 'CC0',
  'CC BY 4.0': 'CC_BY',
  'CC BY-ND 4.0': 'CC_BY_ND',
  'CC BY-SA 4.0': 'CC_BY_SA',
  'CC BY-NC 4.0': 'CC_BY_NC',
  'CC BY-NC-ND 4.0': 'CC_BY_NC_ND',
  'CC BY-NC-SA 4.0': 'CC_BY_NC_SA',
}

/**
 * Converts the short license name into slug that can be used to look up
 * license information in the LICENSES object
 * @param short
 * @returns {string}
 */
const slugFromShort = (short) => {
  return shortToSlug[short]
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
 * @param {LicenseAttributes} attr
 * @returns {string|null}
 */
function attrToFull(attr) {
  const slug = slugFromShort(attrToShort(attr))
  if (!slug) return null
  return LICENSES[slug].FULL
}

const chooserRef = '?ref=chooser-v1'

/**
 * Returns url to license from short license name with version number (eg. 'CC BY 4.0')
 * @param {LicenseAttributes} attr license attributes object
 * @param {'web'|'print'} mode?  (?ref=chooser-v1, target and rel are added to the end of the link if mode is web)
 * @returns {string} url of the license information page
 */
function licenseURL(attr, mode = 'web') {
  if (attr.BY === undefined) throw new Error('Cannot return URL when BY attribute is undefined')
  const slug = slugFromShort(attrToShort(attr))
  const url = LICENSES[slug].URL
  const linkRef = mode === 'web' ? chooserRef : ''
  return `${url}${linkRef}`
}

/**
 * Convert short license name to licence slug ('CC BY 4.0' -> 'cc-by')
 * @param {ShortLicenseName} shortLicenseName
 * @returns {string}
 */
function licenseSlug(shortLicenseName) {
  const currentLicense = Object.values(LICENSES).find(license => {
    return license.SHORT === shortLicenseName
  })
  if (!currentLicense) throw new Error(`Cannot create slug from string "${shortLicenseName}"`)
  return currentLicense.SLUG
}

/**
 * Convert license attributes object to an array of icon names
 * @param {LicenseAttributes} licenseAttributes
 * @returns {string[]} Array with slugified names of icons, eg. ['cc', 'by']
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
      visible = ['AL', 'FS', 'BY', 'NC', 'ND', 'SA', 'CW', 'AD']
      enabled = ['AL', 'FS', 'BY', 'CW', 'AD']
      stepsDisabledDue = 'CC0'
    } else if (stepStatusData.ND) {
      // User selects an ND license: SA step is disabled
      visible = ['AL', 'FS', 'BY', 'NC', 'ND', 'SA', 'AD']
      enabled = ['AL', 'FS', 'BY', 'NC', 'ND', 'AD']
      stepsDisabledDue = 'ND'
    } else {
      // User uses the stepper for license selection
      if (stepStatusData.BY === false) {
        // User selects a CC0 license
        visible = ['AL', 'FS', 'BY', 'NC', 'ND', 'SA', 'CW', 'AD']
        enabled = ['AL', 'FS', 'BY', 'CW', 'AD']
        stepsDisabledDue = 'CC0'
      } else if (stepStatusData.ND) {
        // User selects an ND license: SA step is disabled
        visible = ['AL', 'FS', 'BY', 'NC', 'ND', 'SA', 'AD']
        enabled = ['AL', 'FS', 'BY', 'NC', 'ND', 'AD']
        stepsDisabledDue = 'ND'
      } else {
        // User selects a non-ND BY license from the stepper
        visible = ['AL', 'FS', 'BY', 'NC', 'ND', 'SA', 'AD']
        enabled = ['AL', 'FS', 'BY', 'NC', 'ND', 'SA', 'AD']
      }
    }
  }
  return { visible, enabled, stepsDisabledDue }
}

const CC_NAMESPACE = {
  NAME: 'xmlns:cc',
  URI: 'http://creativecommons.org/ns#',
}
const DCT_NAMESPACE = {
  NAME: 'xmlns:dct',
  URI: 'http://purl.org/dc/terms/',
}
const ICON_STYLE = 'height:22px!important;margin-left:3px;vertical-align:text-bottom;'
const ICON_BASE_URL = 'https://mirrors.creativecommons.org/presskit/icons'

/**
 * Generate html for creator:
 * 1. If the creator name is blank, even if creator link is provided, return a blank string
 * 2. If only creator name is provided, return a span with proper metadata
 * 3. If both creator name and URL are provided, returns an 'a' element with proper data and metadata
 * @param {string} creatorName
 * @param {string} creatorProfileUrl
 * @returns {string}
 */
function generateCreatorCode(creatorName, creatorProfileUrl) {
  if (!creatorName) {
    return ''
  }
  if (creatorProfileUrl) {
    const absoluteUrl = creatorProfileUrl.startsWith('http') ? creatorProfileUrl : `http://${creatorProfileUrl}`
    const linkMeta = 'rel="cc:attributionURL dct:creator" property="cc:attributionName"'
    return `<a ${linkMeta} href="${absoluteUrl}">${creatorName}</a>`
  } else {
    return `<span property="cc:attributionName">${creatorName}</span>`
  }
}

/**
 * Generate html for work title:
 *
 * 1. If the user has not provided a work url:
 *  a. Title is default: return title
 *  b. Title is provided: return span with `dct:title` property
 *
 * 2. If the user has provided a work url:
 *  Convert any url into absolute url by adding 'http://' to the beginning
 *  Return anchor with 'dct:title' attribute if title is not default
 *
 * @param {string} title
 * @param {string} workUrl
 * @param {Boolean} isTitleDefault - true if the user hasn't provided a title, false otherwise
 * @returns {string}
 */
function generateWorkCode(title, workUrl, isTitleDefault) {
  if (isTitleDefault && !workUrl) {
    return title
  }
  const titleMeta = 'property="dct:title"'
  if (!workUrl) {
    return `<span ${titleMeta}>${title}</span>`
  }

  const absoluteUrl = workUrl.startsWith('http') ? workUrl : `http://${workUrl}`
  return `<a ${isTitleDefault ? '' : titleMeta} rel="cc:attributionURL" href="${absoluteUrl}">${title}</a>`
}

/**
 * Generates the HTML for the rich text Year of Creation , including the year of Creation
 * @param {number} yearOfCreation
 * @returns {string}
 */
function generateYearOfCreation(yearOfCreation) {
  const yearMeta = 'property="dct:title"'
  return `<span ${yearMeta}> © ${yearOfCreation}</span>`
}
/**
 * Generates the html for the rich text license information, including license name,
 * link to the license deed, and license icons
 * @param {array} licenseIcons
 * @param {string} licenseUrl
 * @param {ShortLicenseName|FullLicenseName} licenseName
 * @returns {string} HTML code for the license
 */
function generateLicenseLink(licenseIcons, licenseUrl, licenseName) {
  const iconStyle = `style="${ICON_STYLE}"`
  const assetPathRef = '?ref=chooser-v1'
  const iconSrc = (attr) => `${ICON_BASE_URL}/${attr.toLowerCase()}.svg${assetPathRef}`
  const icons = licenseIcons
    .map(attr => `<img ${iconStyle} src="${iconSrc(attr)}">`).join('')

  const linkHref = `href="${licenseUrl}${assetPathRef}"`
  const linkAttributes = 'target="_blank" rel="license noopener noreferrer"'
  const linkStyle = 'style="display:inline-block;"'
  return `<a ${linkHref} ${linkAttributes} ${linkStyle}>${licenseName}${icons}</a>`
}

/**
 * Generate data for use in attribution HTML through i18n
 * @param attributionDetails
 * @param {ShortLicenseName} shortLicenseName
 * @param {Boolean} useFullName - Should the license name be full (short by default)
 * @param {Boolean} isTitleDefault
 * @returns {{creator: string, work: string, license: string, year: string}}
 */
function generateHTML(attributionDetails, shortLicenseName, useFullName = false, isTitleDefault = true) {
  const data = {}
  const { creatorName, creatorProfileUrl, workUrl, workTitle, yearOfCreation } = attributionDetails

  const licenseSlug = slugFromShort(shortLicenseName)
  const { ICONS: icons, URL: url, FULL: fullLicenseName } = LICENSES[licenseSlug]
  const licenseName = useFullName ? fullLicenseName : shortLicenseName

  data.license = generateLicenseLink(icons, url, licenseName)
  data.creator = generateCreatorCode(creatorName, creatorProfileUrl)
  data.work = generateWorkCode(workTitle, workUrl, isTitleDefault)
  data.year = generateYearOfCreation(yearOfCreation)
  return data
}

export {
  defaultAttributes, CC0Attributes, CCBYAttributes, attrToShort, slugFromShort,
  attrToFull, licenseURL, chooserRef, licenseSlug, licenseIconsArr, generateHTML, updateVisibleEnabledStatus,
  CC_NAMESPACE, DCT_NAMESPACE, LICENSES, ICON_STYLE, ICON_BASE_URL,
}
