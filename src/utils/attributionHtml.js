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
    const titleSpan = form.workTitle ? `<span  rel="dc:title">${form.workTitle}</span>` : this.$t('this-work')
    if (form.workUrl) {
        return `<a rel="cc:attributionURL" href="${form.workUrl}">${titleSpan}</a>`
    } else {
        return titleSpan
    }
}

function workAuthor(form) {
    console.log('Getting work author: ', form.creatorName)
    if (form.creatorName) {
        const creatorNameNoLink = `<span rel="cc:attributionName">${form.creatorName}</span>`
        return form.creatorProfileUrl ? `by <a rel="cc:attributionURL"  href="${form.creatorProfileUrl}">${creatorNameNoLink}</a>` : `by ${creatorNameNoLink}`
    } else return ''
}

function workLicense(ccLicenseURL, shortLicenseName) {
    const baseAssetsPath = 'https://search.creativecommons.org/static/img'
    const licenseLink = `<a  rel="license" href="${ccLicenseURL}" style="margin-right: 5px;">${shortLicenseName.toUpperCase()}</a>`
    let licenseIcons = `<img style="height: inherit;margin-right: 3px;display: inline-block;" src="${baseAssetsPath}/cc_icon.svg" />`
    console.log('Icons: ', licenseIcons)
    if (shortLicenseName) {
        if (shortLicenseName.includes('CC0')) {
            shortLicenseName = 'CC CC0 1.0'
        }
        licenseIcons += shortLicenseName.slice(3, shortLicenseName.length - 4).split('-').map(license =>
            `<img style="height: inherit;margin-right: 3px;display: inline-block;" src="${baseAssetsPath}/cc-${license.toLowerCase()}_icon.svg" />`
        ).join('')
        const licenseImgLink = `<a href="${ccLicenseURL}" target="_blank" rel="noopener noreferrer" style="display: inline-block;opacity: .7;margin-top: 2px;margin-left: 3px;height: 22px !important;vertical-align:text-bottom">${licenseIcons}</a>`
        return `${licenseLink}${licenseImgLink}`
    }
}

// function attributionHtml(form, ccLicenseURL, shortLicenseName) {
// The default string in English is:
// This work is licensed under CC BY 4.0
// String if each form field is filled in
// 'My work" by Author is licensed under CC BY 4.0
// const baseAssetsPath = 'https://search.creativecommons.org/static/img'
// const workTitle = form.workTitle ? `${form.workTitle}` : 'This work'
// const workLink = form.workUrl ? `<a href="${form.workUrl}">${workTitle}</a>` : workTitle
// const creatorNameNoLink = `<span>${form.authorName}</span>`
// const creatorNameLink = form.creatorProfileUrl ? `<a href="${form.creatorProfileUrl}">${creatorNameNoLink}</a>` : creatorNameNoLink
// const creator = `<span> by ${creatorNameLink}</span>`
// const licenseLink = ` is licensed under <a  rel="license" href="${ccLicenseURL}" style="margin-right: 5px;">${shortLicenseName.toUpperCase()}</a>`

// let licenseIcons = `<img style="height: inherit;margin-right: 3px;display: inline-block;" src="${baseAssetsPath}/cc_icon.svg" />` // eslint-disable-line global-require, import/no-dynamic-require
// if (shortLicenseName) {
//     licenseIcons += shortLicenseName.slice(3, shortLicenseName.length - 4).split('-').map(license =>
//        `<img style="height: inherit;margin-right: 3px;display: inline-block;"
//        src="${baseAssetsPath}/cc-${license.toLowerCase()}_icon.svg" />` // eslint-disable-line global-require, import/no-dynamic-require
//    ).join('')
// }

// const licenseImgLink = `<a href="${ccLicenseURL}" target="_blank" rel="noopener noreferrer" style="display: inline-block;opacity: .7;margin-top: 2px;margin-left: 3px;height: 22px !important;">${licenseIcons}</a>`
// return `<p style="font-size: 0.9rem;">${workLink}${creator}${licenseLink}${licenseImgLink}</p>`
// return { title: workTitle(form), author: workAuthor(form) }
// }

// export default attributionHtml
export { workAuthor, workTitle, workLicense }
