/* eslint-disable indent, quotes */
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

export const createXMP = ({ shortName, workUrl = '', workTitle = '', creatorName = '', lang = 'en-US' }) => {
    const slug = licenseSlug(shortName).replace(/-/gi, '_').toUpperCase()

    const licenseUrl = LICENSES[slug].URL
    const licenseFullName = LICENSES[slug].FULL

    const ccLicenseNotice = `This work is licensed under <a href="${licenseUrl}">${licenseFullName}</a>`
        .replace(/</gi, '&lt;')
        .replace(/>/gi, '&gt;')
        .replace(/"/gi, '&quot;')

    const isLicensed = shortName !== LICENSES.CC0.SHORT ? 'True' : 'False'

    return (`<?xpacket begin='' id='W5M0MpCehiHzreSzNTczkc9d'?>
<x:xmpmeta xmlns:x='adobe:ns:meta/'>
    <rdf:RDF xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns#'
             xmlns:xapRights='http://ns.adobe.com/xap/1.0/rights/'
             xmlns:cc='http://creativecommons.org/ns#'${workTitle
            ? `xmlns:dc='http://purl.org/dc/elements/1.1/'`
            : ''}>
        <rdf:Description rdf:about=''>
            ${`<xapRights:Marked>${isLicensed}</xapRights:Marked>`}${creatorName
        ? `
            <xapRights:Owner>
                <rdf:Bag>
                    <rdf:li>${creatorName}</rdf:li>
                </rdf:Bag>
            </xapRights:Owner>`
        : ''}${workUrl
        ? `
            <xapRights:WebStatement rdf:resource='${workUrl}'/>`
        : ''}
            <xapRights:UsageTerms>
                <rdf:Alt>
                  <rdf:li xml:lang='x-default'>${ccLicenseNotice}</rdf:li>
                  <rdf:li xml:lang='${lang}' >${ccLicenseNotice}</rdf:li>
                </rdf:Alt>
            </xapRights:UsageTerms>
            <cc:license rdf:resource='${licenseUrl}'/>${creatorName
            ? `
            <cc:attributionName>${creatorName}</cc:attributionName>`
            : ''}${workTitle
                    ? `
            <dc:title>
                <rdf:Alt>
                  <rdf:li xml:lang='x-default'>${workTitle}</rdf:li>
                  <rdf:li xml:lang='${lang}'>${workTitle}</rdf:li>
                </rdf:Alt>
            </dc:title>`
            : ''}
        </rdf:Description>
    </rdf:RDF>
</x:xmpmeta>
<?xpacket end='r'?>`)
}
