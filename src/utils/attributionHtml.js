/**
 * This function is mostly a copy of that in the
 * ccsearch-frontend repo, with some modifications
 * to work with the cc chooser
 */

function workTitle(form) {
    if (!form.workTitle && !form.workUrl) {
        return ''
    } else if (form.workUrl) {

    }
    const titleSpan = form.workTitle ? `<span  rel="dc:title">${form.workTitle}</span>` : this.$t('code-text.this-work')
    if (form.workUrl) {
        return `<a rel="cc:attributionURL" href="${form.workUrl}">${titleSpan}</a>`
    } else {
        return titleSpan
    }
}

function workAuthor(form) {
    if (form.creatorName) {
        const creatorNameNoLink = `<span rel="cc:attributionName">${form.creatorName}</span>`
        return form.creatorProfileUrl ? `by <a rel="cc:attributionURL"  href="${form.creatorProfileUrl}">${creatorNameNoLink}</a>` : `by ${creatorNameNoLink}`
    } else return ''
}

function workLicense(ccLicenseURL, shortLicenseName) {
    const baseAssetsPath = 'https://search.creativecommons.org/static/img'
    const licenseLink = `<a rel="license" href="${ccLicenseURL}" target="_blank" rel="noopener noreferrer" style="display: inline-block;">${shortLicenseName.toUpperCase()}`
    let licenseIcons = `<img style="height: 22px!important;margin-left: 3px;vertical-align:text-bottom;" src="${baseAssetsPath}/cc_icon.svg" />`
    if (shortLicenseName) {
        if (shortLicenseName.includes('CC0')) {
            shortLicenseName = 'CC CC0 1.0'
        }
        licenseIcons += shortLicenseName.slice(3, shortLicenseName.length - 4).split('-').map(license =>
            `<img style="margin-top: 2px;height: 22px!important;margin-left: 3px;vertical-align:text-bottom;" src="${baseAssetsPath}/cc-${license.toLowerCase()}_icon.svg" />`
        ).join('')
        const licenseImgLink = `<span class="license-icons" style="opacity:.7">${licenseIcons}</span></a>`
        return `${licenseLink}${licenseImgLink}`
    }
}
export { workAuthor, workTitle, workLicense }
