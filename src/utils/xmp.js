import { LICENSES, licenseSlug } from '@/utils/license-utilities'

function minify(data) {
    return data.replace(/ {2,}/gi, '').replace(/\n/gi, '')
}

export const createXMP = ({ shortName, workUrl = '', workTitle = '', creatorName = '', lang = 'en-US' }) => {
    const slug = licenseSlug(shortName).replace(/-/gi, '_').toUpperCase()

    const copyrighted = shortName !== LICENSES.CC0.SHORT
    const xapRights = copyrighted
        ? `<rdf:Description rdf:about='' xmlns:xapRights='http://ns.adobe.com/xap/1.0/rights/'>
             <xapRights:Marked>true</xapRights:Marked></rdf:Description>`
        : ''
    const xapWorkUrl = workUrl
        ? `<rdf:Description rdf:about='' xmlns:xapRights='http://ns.adobe.com/xap/1.0/rights/'>
<xapRights:WebStatement rdf:resource='${workUrl}'/></rdf:Description>`
        : ''
    const xapWorkTitle = workTitle
        ? `
<rdf:Description rdf:about='' xmlns:dc='http://purl.org/dc/elements/1.1/'><dc:title><rdf:Alt><rdf:li xml:lang='x-default'>
${workTitle}</rdf:li><rdf:li xml:lang='${lang}'>${workTitle}</rdf:li></rdf:Alt></dc:title></rdf:Description>`
        : ''

    const licenseUrl = LICENSES[slug].URL

    const ccLicenseUrl = `
<rdf:Description rdf:about='' xmlns:cc='http://creativecommons.org/ns#'><cc:license rdf:resource='${licenseUrl}'/></rdf:Description>`

    const ccLicenseNotice = `
This work is licensed under <a rel="license noopener noreferrer" target="_blank" href="${licenseUrl}">${LICENSES[slug].FULL}</a>`

    const xapRightsUsageTerms = `
<rdf:Description rdf:about='' xmlns:xapRights='http://ns.adobe.com/xap/1.0/rights/'>
<xapRights:UsageTerms><rdf:Alt><rdf:li xml:lang='${lang}' >${ccLicenseNotice}</rdf:li></rdf:Alt>
</xapRights:UsageTerms></rdf:Description>`

    const xapWebStatement = workUrl
        ? `
<rdf:Description rdf:about='' xmlns:xapRights='http://ns.adobe.com/xap/1.0/rights/'>
<xapRights:WebStatement rdf:resource='${workUrl}'/></rdf:Description>`
        : ''

    const ccAttributionName = creatorName
        ? `
<rdf:Description rdf:about='' xmlns:cc='http://creativecommons.org/ns#'>
<cc:attributionName>${creatorName}</cc:attributionName></rdf:Description>`
        : ''
    // eslint-disable-line quotes
    const xmpData = `
    <?xpacket begin='' id=''?>
        <x:xmpmeta xmlns:x='adobe:ns:meta/'>
            <rdf:RDF xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns#'>
                ${xapRights}
                ${xapWorkUrl}
                ${xapWebStatement}
                ${xapRightsUsageTerms}
                ${xapWorkTitle}
                ${ccLicenseUrl}
                ${ccAttributionName}
            </rdf:RDF>
        </x:xmpmeta>
    <?xpacket end='r'?>`
    // We return minified string to not increase the size of the licensed file
    return minify(xmpData)
}
