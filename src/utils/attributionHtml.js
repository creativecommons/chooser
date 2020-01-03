/**
 * This function is mostly a copy of that in the
 * ccsearch-frontend repo, with some modifications
 * to work with the cc chooser
 */

function attributionHtml(form, ccLicenseURL, shortLicenseName) {
    const baseAssetsPath = 'https://search.creativecommons.org/static/img'
    const workTitle = form.workTitle ? '"form.workTitle"' : 'This work'
    const workLink = form.workUrl ? `<a href="${form.workUrl}">${workTitle}</a>` : workTitle
    const creator = `<span> by <span>${form.authorName}</span></span>`
    const licenseLink = ` is licensed under <a href="${ccLicenseURL}" style="margin-right: 5px;">${shortLicenseName.toUpperCase()}</a>`

    let licenseIcons = `<img style="height: inherit;margin-right: 3px;display: inline-block;" src="${baseAssetsPath}/cc_icon.svg" />` // eslint-disable-line global-require, import/no-dynamic-require
    if (shortLicenseName) {
        licenseIcons += shortLicenseName.slice(3, shortLicenseName.length - 4).split('-').map(license =>
            `<img style="height: inherit;margin-right: 3px;display: inline-block;" src="${baseAssetsPath}/cc-${license.toLowerCase()}_icon.svg" />` // eslint-disable-line global-require, import/no-dynamic-require
        ).join('')
    }

    const licenseImgLink = `<a href="${ccLicenseURL}" target="_blank" rel="noopener noreferrer" style="display: inline-block;opacity: .7;margin-top: 2px;margin-left: 3px;height: 22px !important;">${licenseIcons}</a>`
    return `<p style="font-size: 0.9rem;font-style: italic;">${workLink}${creator}${licenseLink}${licenseImgLink}</p>`
}

export default attributionHtml
