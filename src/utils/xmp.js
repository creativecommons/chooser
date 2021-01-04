import { LICENSES, licenseSlug } from '@/utils/license-utilities'

/** The xmp metadata is structured in accordance with the Adobe XMP specifications from 2012:
https://wwwimages2.adobe.com/content/dam/acom/en/devnet/xmp/pdfs/XMP%20SDK%20Release%20cc-2016-08/XMPSpecificationPart1.pdf

The following data is written into the xmp file:

xapRights:WebStatement: A Web URL for a statement of the ownership and usage rights for this resource.
  Uses the value of the 'Link to Work' field from the Attribution details form.
xapRights:Marked: Indicates that this is a public-domain or CC0 resource if false. Otherwise, one of the 6 CC licenses.
xapRights:Owner: A list of legal owners of the resource.
  Uses the value of the 'Creator of Work' field from the Attribution details form.
xapRights:UsageTerms: A collection of text instructions on how a resource can be legally used, given in a variety of languages.
  Uses license statement with the link to the license deed, with '<>"' characters escaped.
dc:title:  A name or title given to the resource, by which it is formally known, given in various languages.
  Uses the value of the 'Title of Work' field from the Attribution details form.
cc:license: the link to the CC license deed.
cc:attributionName
 Uses the value of the 'Creator of Work' field from the Attribution details form.
 */

// To make the values of these variables human-readable, and format the resulting document correctly,
// we use the backtick-formatted strings, but remove the '\n' character in the beginning of the values
const XAP_WEB_STATEMENT = `
<xapRights:WebStatement rdf:resource='{workUrlTemplate}'/>`.slice(1)

const XAP_MARKED = `
<xapRights:Marked>{isCopyrightedTemplate}</xapRights:Marked>`.slice(1)

const XAP_OWNER = `
<xapRights:Owner>
    <rdf:Bag>
        <rdf:li>{creatorNameTemplate}</rdf:li>
    </rdf:Bag>
</xapRights:Owner>`.slice(1)

const DC_WORK_TITLE_TEMPLATE = `
<dc:title>
    <rdf:Alt>
      <rdf:li xml:lang='x-default'>{workTitleTemplate}</rdf:li>
      <rdf:li xml:lang='{langTemplate}'>{workTitleTemplate}</rdf:li>
    </rdf:Alt>
</dc:title>`.slice(1)

const CC_LICENSE_URL_TEMPLATE = `
<cc:license rdf:resource='{licenseUrlTemplate}'/>`.slice(1)

const XAP_RIGHTS_USAGE_TERMS = `
<xapRights:UsageTerms>
    <rdf:Alt>
      <rdf:li xml:lang='x-default'>{ccLicenseNoticeTemplate}</rdf:li>
      <rdf:li xml:lang='{langTemplate}' >{ccLicenseNoticeTemplate}</rdf:li>
    </rdf:Alt>
</xapRights:UsageTerms>`.slice(1)

const CC_ATTRIBUTION_NAME = `
<cc:attributionName>{creatorNameTemplate}</cc:attributionName>`.slice(1)

const LINE_START = '            '
const addIndent = (str) => (str.replace(/\n/gi, '\n' + LINE_START))

export const createXMP = ({ shortName, workUrl = '', workTitle = '', creatorName = '', lang = 'en-US' }) => {
    const slug = licenseSlug(shortName).replace(/-/gi, '_').toUpperCase()

    const licenseUrl = LICENSES[slug].URL

    const ccLicenseUrl = addIndent(CC_LICENSE_URL_TEMPLATE.replace('{licenseUrlTemplate}', licenseUrl))

    const ccLicenseNotice = `This work is licensed under <a href="${licenseUrl}">${LICENSES[slug].FULL}</a>`
        .replace(/</gi, '&lt;')
        .replace(/>/gi, '&gt;')
        .replace(/"/gi, '&#34;')

    const xapData = {
        owner: '',
        webStatement: '',
        marked: '',
        rightsUsageTerms: addIndent(XAP_RIGHTS_USAGE_TERMS
            .replace('{ccLicenseNoticeTemplate}', ccLicenseNotice)
            .replace('{langTemplate}', lang))
    }

    const copyrighted = shortName !== LICENSES.CC0.SHORT ? 'True' : 'False'
    xapData.marked = addIndent(XAP_MARKED
        .replace('{isCopyrightedTemplate}', copyrighted))

    if (workUrl) {
        xapData.webStatement = addIndent(XAP_WEB_STATEMENT
            .replace('{workUrlTemplate}', workUrl))
    }
    const dcWorkTitle = workTitle
        ? addIndent(DC_WORK_TITLE_TEMPLATE
            .replace(/{workTitleTemplate}/gi, workTitle)
            .replace('{langTemplate}', lang))
        : ''
    let ccAttributionName = ''
    if (creatorName) {
        ccAttributionName = addIndent(CC_ATTRIBUTION_NAME
            .replace('{creatorNameTemplate}', creatorName))
        xapData.owner = addIndent(XAP_OWNER.replace('{creatorNameTemplate}', creatorName))
    }
    return `
<?xpacket begin='' id='W5M0MpCehiHzreSzNTczkc9d'?>
<x:xmpmeta xmlns:x='adobe:ns:meta/'>
    <rdf:RDF xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns#'
             xmlns:xapRights='http://ns.adobe.com/xap/1.0/rights/'
             xmlns:cc='http://creativecommons.org/ns#'${workTitle ? addIndent("\nxmlns:dc='http://purl.org/dc/elements/1.1/'") : ''}>
        <rdf:Description rdf:about=''>
            ${xapData.marked}
            ${xapData.owner}
            ${xapData.webStatement}
            ${xapData.rightsUsageTerms}
            ${ccLicenseUrl}
            ${ccAttributionName}
            ${dcWorkTitle}
        </rdf:Description>
    </rdf:RDF>
</x:xmpmeta>
<?xpacket end='r'?>`.slice(1)
}
