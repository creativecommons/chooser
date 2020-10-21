import {
    attrToFull,
    attrToShort,
    generateHTML,
    licenseIconsArr,
    licenseSlug,
    licenseUrl,
    shortToAttr,
    updateVisibleEnabledStatus
} from '@/utils/license-utilities'
import { mount } from '@vue/test-utils'
import TestComponent from "./TestComponent"

const addRef = (link) => `${link}/?ref=chooser-v1`

const LICENSES = {
    CC0: {
        FULL: 'CC0 1.0 Universal',
        SHORT: 'CC0 1.0',
        SLUG: 'cc0',
        URL: 'https://creativecommons.org/publicdomain/zero/1.0'
    },
    CC_BY: {
        FULL: 'Attribution 4.0 International',
        SHORT: 'CC BY 4.0',
        SLUG: 'cc-by',
        URL: 'https://creativecommons.org/licenses/by/4.0'
    },
    CC_BY_SA: {
        FULL: 'Attribution-ShareAlike 4.0 International',
        SHORT: 'CC BY-SA 4.0',
        SLUG: 'cc-by-sa',
        URL: 'https://creativecommons.org/licenses/by-sa/4.0'
    },
    CC_BY_NC: {
        FULL: 'Attribution-NonCommercial 4.0 International',
        SHORT: 'CC BY-NC 4.0',
        SLUG: 'cc-by-nc',
        URL: 'https://creativecommons.org/licenses/by-nc/4.0'
    },
    CC_BY_NC_SA: {
        FULL: 'Attribution-NonCommercial-ShareAlike 4.0 International',
        SHORT: 'CC BY-NC-SA 4.0',
        SLUG: 'cc-by-nc-sa',
        URL: 'https://creativecommons.org/licenses/by-nc-sa/4.0'
    },
    CC_BY_NC_ND: {
        FULL: 'Attribution-NonCommercial-NoDerivatives 4.0 International',
        SHORT: 'CC BY-NC-ND 4.0',
        SLUG: 'cc-by-nc-nd',
        URL: 'https://creativecommons.org/licenses/by-nc-nd/4.0'
    },
    CC_BY_ND: {
        FULL: 'Attribution-NoDerivatives 4.0 International',
        SHORT: 'CC BY-ND 4.0',
        SLUG: 'cc-by-nd',
        URL: 'https://creativecommons.org/licenses/by-nd/4.0'
    }
}

describe('attrToFull', function testAttrToFull() {
    test('Not selected', () => {
        const attr = {}
        expect(attrToFull(attr)).toBeUndefined()
    })
    test('CC0 #2', () => {
        const attr = { BY: false }
        expect(attrToFull(attr)).toBe(LICENSES.CC0.FULL)
    })
    test('CC0 #3', () => {
        const attr = { SA: false, BY: false }
        expect(attrToFull(attr)).toBe(LICENSES.CC0.FULL)
    })
    test('CC BY', () => {
        const attr = { BY: true }
        expect(attrToFull(attr)).toBe(LICENSES.CC_BY.FULL)
    })
    test('CC BY-SA', () => {
        const attr = { BY: true, SA: true }
        expect(attrToFull(attr)).toBe(
            LICENSES.CC_BY_SA.FULL
        )
    })
    test('CC BY-NC', () => {
        const attr = { BY: true, NC: true }
        expect(attrToFull(attr)).toBe(
            LICENSES.CC_BY_NC.FULL
        )
    })
    test('CC BY-NC-SA', () => {
        const attr = { BY: true, NC: true, SA: true }
        expect(attrToFull(attr)).toBe(
            LICENSES.CC_BY_NC_SA.FULL
        )
    })
    test('CC BY-ND', () => {
        const attr = { BY: true, ND: true }
        expect(attrToFull(attr)).toBe(
            LICENSES.CC_BY_ND.FULL
        )
    })
    test('CC BY-NC-ND', () => {
        const attr = { BY: true, ND: true, NC: true }
        expect(attrToFull(attr)).toBe(
            LICENSES.CC_BY_NC_ND.FULL
        )
    })
    test('SA, ND: true', () => {
        const attr = { BY: true, SA: true, ND: true }
        expect(attrToFull(attr)).toBe(
            LICENSES.CC_BY_ND.FULL
        )
    })
})

describe('attrToShort', function testAttrToShort() {
    test('undefined BY', () => {
        const attr = { BY: undefined }
        expect(attrToShort(attr)).toBeUndefined()
    })
    test('CC0 #1', () => {
        const attr = { BY: false }
        expect(attrToShort(attr)).toBe(LICENSES.CC0.SHORT)
    })
    test('CC BY', () => {
        const attr = { BY: true }
        expect(attrToShort(attr)).toBe(LICENSES.CC_BY.SHORT)
    })
    test('CC BY-SA', () => {
        const attr = { BY: true, SA: true }
        expect(attrToShort(attr)).toBe(LICENSES.CC_BY_SA.SHORT)
    })
    test('CC BY-NC', () => {
        const attr = { BY: true, NC: true }
        expect(attrToShort(attr)).toBe(LICENSES.CC_BY_NC.SHORT)
    })
    test('CC BY-NC-SA', () => {
        const attr = { BY: true, NC: true, SA: true }
        expect(attrToShort(attr)).toBe(LICENSES.CC_BY_NC_SA.SHORT)
    })
    test('CC BY-ND', () => {
        const attr = { BY: true, ND: true }
        expect(attrToShort(attr)).toBe(LICENSES.CC_BY_ND.SHORT)
    })
    test('CC BY-NC-ND', () => {
        const attr = { BY: true, ND: true, NC: true }
        expect(attrToShort(attr)).toBe(LICENSES.CC_BY_NC_ND.SHORT)
    })
})

describe('shortToAttr', function testAttrToShort() {
    test('gibberish string #1', () => {
        const str = 'gibberish'
        expect(shortToAttr(str)).not.toEqual({ BY: true })
    })
    test('gibberish string #2', () => {
        const str = 'GATSBY'
        expect(shortToAttr(str)).toEqual({
            BY: true,
            NC: false,
            ND: false,
            SA: false
        })
    })
    test('CC0 1.0', () => {
        const str = 'CC0'
        expect(shortToAttr(str)).toEqual({
            BY: false,
            NC: false,
            ND: false,
            SA: false
        })
    })
    test('CC BY 2.5', () => {
        const str = 'CC BY 2.5'
        expect(shortToAttr(str)).toEqual({
            BY: true,
            NC: false,
            ND: false,
            SA: false
        })
    })
    test('CC BY-SA 4.0', () => {
        const str = 'CC BY-SA 4.0'
        expect(shortToAttr(str)).toEqual({
            BY: true,
            NC: false,
            ND: false,
            SA: true
        })
    })
    test('CC BY-NC 4.0', () => {
        const str = 'CC BY-NC 4.0'
        expect(shortToAttr(str)).toEqual({
            BY: true,
            NC: true,
            ND: false,
            SA: false
        })
    })
    test('CC BY-NC-SA 4.0', () => {
        const str = 'CC BY-NC-SA 4.0'
        expect(shortToAttr(str)).toEqual({
            BY: true,
            NC: true,
            ND: false,
            SA: true
        })
    })
    test('CC BY-ND 4.0', () => {
        const str = 'CC BY-ND 4.0'
        expect(shortToAttr(str)).toEqual({
            BY: true,
            NC: false,
            ND: true,
            SA: false
        })
    })
    test('CC BY-NC-ND 4.0', () => {
        const str = 'CC BY-NC-ND 4.0'
        expect(shortToAttr(str)).toEqual({
            BY: true,
            NC: true,
            ND: true,
            SA: false
        })
    })
})

describe('licenseSlug', function testLicenseSlug() {
    test('CC0 1.0', () => {
        const str = LICENSES.CC0.SHORT
        expect(licenseSlug(str)).toBe(LICENSES.CC0.SLUG)
    })
    test('CC BY 4.0', () => {
        const str = LICENSES.CC_BY.SHORT
        expect(licenseSlug(str)).toBe(LICENSES.CC_BY.SLUG)
    })
    test('CC BY-SA 4.0', () => {
        const str = LICENSES.CC_BY_SA.SHORT
        expect(licenseSlug(str)).toBe(LICENSES.CC_BY_SA.SLUG)
    })
    test('CC BY-NC 4.0', () => {
        const str = LICENSES.CC_BY_NC.SHORT
        expect(licenseSlug(str)).toBe(LICENSES.CC_BY_NC.SLUG)
    })
    test('CC BY-NC-SA 4.0', () => {
        const str = LICENSES.CC_BY_NC_SA.SHORT
        expect(licenseSlug(str)).toBe(LICENSES.CC_BY_NC_SA.SLUG)
    })
    test('CC BY-ND 4.0', () => {
        const str = LICENSES.CC_BY_ND.SHORT
        expect(licenseSlug(str)).toBe(LICENSES.CC_BY_ND.SLUG)
    })
    test('CC BY-NC-ND 4.0', () => {
        const str = LICENSES.CC_BY_NC_ND.SHORT
        expect(licenseSlug(str)).toBe(LICENSES.CC_BY_NC_ND.SLUG)
    })
})

describe('licenseIconsArr', function testLicenseIconsArr() {
    test('CC0 #1: empty attr', () => {
        const attr = {}
        expect(licenseIconsArr(attr)).toEqual(['zero'])
    })
    test('CC0 #2: BY: false', () => {
        const attr = { BY: false }
        expect(licenseIconsArr(attr)).toEqual(['zero'])
    })
    test('CC BY', () => {
        const attr = { BY: true }
        expect(licenseIconsArr(attr)).toEqual(['by'])
    })
    test('CC BY SA', () => {
        const attr = { BY: true, SA: true }
        expect(licenseIconsArr(attr)).toEqual(['by', 'sa'])
    })
    test('CC BY NC', () => {
        const attr = { BY: true, NC: true }
        expect(licenseIconsArr(attr)).toEqual(['by', 'nc'])
    })
    test('CC BY NC SA', () => {
        const attr = { BY: true, NC: true, SA: true }
        expect(licenseIconsArr(attr)).toEqual(['by', 'nc', 'sa'])
    })
    test('CC BY ND', () => {
        const attr = { BY: true, ND: true }
        expect(licenseIconsArr(attr)).toEqual(['by', 'nd'])
    })
    test('CC BY NC ND', () => {
        const attr = { BY: true, NC: true, ND: true }
        expect(licenseIconsArr(attr)).toEqual(['by', 'nc', 'nd'])
    })
})

describe('licenseUrl', function testLicenseUrl() {
    const web = 'web'
    test('CC0 web', () => {
        const attr = { BY: false }
        expect(licenseUrl(attr, web)).toBe('https://creativecommons.org/publicdomain/zero/1.0/?ref=chooser-v1')
    })
    test('CC0 no web', () => {
        const attr = { BY: false }
        expect(licenseUrl(attr)).toBe('https://creativecommons.org/publicdomain/zero/1.0')
    })
    test('CC BY web', () => {
        const attr = { BY: true }
        expect(licenseUrl(attr, web)).toBe('https://creativecommons.org/licenses/by/4.0/?ref=chooser-v1')
    })
    test('CC BY no web', () => {
        const attr = { BY: true }
        expect(licenseUrl(attr)).toBe('https://creativecommons.org/licenses/by/4.0')
    })
    test('CC BY-SA web', () => {
        const attr = { BY: true, SA: true }
        expect(licenseUrl(attr, web)).toBe('https://creativecommons.org/licenses/by-sa/4.0/?ref=chooser-v1')
    })
    test('CC BY-SA no web', () => {
        const attr = { BY: true, SA: true }
        expect(licenseUrl(attr)).toBe('https://creativecommons.org/licenses/by-sa/4.0')
    })
    test('CC BY-NC web', () => {
        const attr = { BY: true, NC: true }
        expect(licenseUrl(attr, web)).toBe('https://creativecommons.org/licenses/by-nc/4.0/?ref=chooser-v1')
    })
    test('CC BY-NC no web', () => {
        const attr = { BY: true, NC: true }
        expect(licenseUrl(attr)).toBe('https://creativecommons.org/licenses/by-nc/4.0')
    })
    test('CC BY-NC-SA web', () => {
        const attr = { BY: true, NC: true, SA: true }
        expect(licenseUrl(attr, web)).toBe('https://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1')
    })
    test('CC BY-NC-SA no web', () => {
        const attr = { BY: true, NC: true, SA: true }
        expect(licenseUrl(attr)).toBe('https://creativecommons.org/licenses/by-nc-sa/4.0')
    })
    test('CC BY-ND web', () => {
        const attr = { BY: true, ND: true }
        expect(licenseUrl(attr, web)).toBe('https://creativecommons.org/licenses/by-nd/4.0/?ref=chooser-v1')
    })
    test('CC BY-ND no web', () => {
        const attr = { BY: true, ND: true }
        expect(licenseUrl(attr)).toBe('https://creativecommons.org/licenses/by-nd/4.0')
    })
    test('CC BY-NC-ND web', () => {
        const attr = { BY: true, NC: true, ND: true }
        expect(licenseUrl(attr, web)).toBe('https://creativecommons.org/licenses/by-nc-nd/4.0/?ref=chooser-v1')
    })
    test('CC BY-NC-ND no web', () => {
        const attr = { BY: true, NC: true, ND: true }
        expect(licenseUrl(attr)).toBe('https://creativecommons.org/licenses/by-nc-nd/4.0')
    })
})

describe('updateVisibleEnabledStatus', function testUpdateVisibleEnabledStatus() {
    test('empty object', () => {
        const attr = {}
        expect(updateVisibleEnabledStatus(attr)).toEqual({
            enabled: ['FS', 'BY', 'NC', 'ND', 'SA', 'AD'],
            stepsDisabledDue: '',
            visible: ['FS', 'BY', 'NC', 'ND', 'SA', 'AD']
        })
    })
    test('FS: true, BY: false', () => {
        const attr = { FS: true, BY: false }
        expect(updateVisibleEnabledStatus(attr)).toEqual({
            enabled: ['FS', 'DD', 'CW', 'AD'],
            stepsDisabledDue: 'CC0',
            visible: ['FS', 'DD', 'CW', 'AD']
        })
    })
    test('FS: true, BY: true ', () => {
        const attr = { FS: true, BY: true }
        expect(updateVisibleEnabledStatus(attr)).toEqual({
            enabled: ['FS', 'DD', 'AD'],
            stepsDisabledDue: '',
            visible: ['FS', 'DD', 'AD']
        })
    })
    test('FS: false, BY: false', () => {
        const attr = { FS: false, BY: false }
        expect(updateVisibleEnabledStatus(attr)).toEqual({
            enabled: ['FS', 'BY', 'CW', 'AD'],
            stepsDisabledDue: 'CC0',
            visible: ['FS', 'BY', 'NC', 'ND', 'SA', 'CW', 'AD']
        })
    })
    test('FS: false, BY: true, ND: true', () => {
        const attr = { FS: false, BY: true, ND: true }
        expect(updateVisibleEnabledStatus(attr)).toEqual({
            enabled: ['FS', 'BY', 'NC', 'ND', 'AD'],
            stepsDisabledDue: 'CC0',
            visible: ['FS', 'BY', 'NC', 'ND', 'SA', 'AD']
        })
    })
    test('FS: false, BY: true, ND: false', () => {
        const attr = { FS: false, BY: true, ND: false }
        expect(updateVisibleEnabledStatus(attr)).toEqual({
            enabled: ['FS', 'BY', 'NC', 'ND', 'SA', 'AD'],
            stepsDisabledDue: '',
            visible: ['FS', 'BY', 'NC', 'ND', 'SA', 'AD']
        })
    })
})

describe('generateHTML', function testGenerateHTML() {
    const CC_NAMESPACE = {
        NAME: 'xmlns:cc',
        URI: 'http://creativecommons.org/ns#'
    }
    const DCT_NAMESPACE = {
        NAME: 'xmlns:dct',
        URI: 'http://purl.org/dc/terms/'
    }
    const ICON_STYLE='height:22px!important;margin-left:3px;vertical-align:text-bottom;'
    const ICON_BASE_URL = 'https://mirrors.creativecommons.org/presskit/icons/'
    const TEST_DATA = {
        CREATOR: 'John',
        WORK_TITLE: 'Foo',
        PROFILE_URL: 'www.john.com',
        WORK_URL: 'www.john.com/foo.jpg'
    }
    const areIconSourcesCorrect = (sources, licenses) => {
        const urlRef = '?ref=chooser-v1" target="_blank" rel="noopener noreferrer"'
        if (sources.length !== licenses.length) return false
        sources.forEach((source) => {
            if (!source.startsWith(urlRef)) return false
            const license = source
                .replace(ICON_BASE_URL, '')
                .replace(urlRef, '')
                .replace('.svg', '')
            if (!licenses.includes(license)) return false
        })
        return true
        }
    const initialHtmlObject = generateHTML({}, LICENSES.CC0.SHORT)
    const wrapper = mount(TestComponent, {propsData: {attribution: initialHtmlObject}})
    let iconSources
    const licenseLinkElement = (wrapper) => wrapper.find('.license-link').find('a')
    const licenseImages = (wrapper) => wrapper.findAll('img')
    test('Licenses with empty attributes', () => {
        // CC0 license
        expect(wrapper.find('.creator').text()).toBe('')
        const para = wrapper.find('.html-string > p')
        expect(Object.keys(para.attributes()).length).toEqual(3)
        expect(para.attributes()[CC_NAMESPACE.NAME]).toEqual(CC_NAMESPACE.URI)
        expect(para.attributes()[DCT_NAMESPACE.NAME]).toEqual(DCT_NAMESPACE.URI)
        const workTitle = wrapper.find('.work-title')
        expect(workTitle.text()).toBe('')
        expect(licenseLinkElement(wrapper).attributes('rel')).toBe('license')
        expect(licenseLinkElement(wrapper).attributes('href')).toBe(LICENSES.CC0.URL)
        expect(licenseLinkElement(wrapper).text()).toBe(LICENSES.CC0.SHORT)

        expect(licenseImages(wrapper).at(0).attributes().style).toBe(ICON_STYLE)
        iconSources = licenseImages(wrapper).wrappers.map(img => img.attributes().src)
        expect(areIconSourcesCorrect(iconSources, ['cc', 'by'])).toBe(true)

        // CC BY-NC-ND
        wrapper.setProps({
            attribution: generateHTML({}, LICENSES.CC_BY_NC_ND.SHORT)
        })
        expect(licenseLinkElement(wrapper).attributes('rel')).toBe('license')
        expect(licenseLinkElement(wrapper).attributes('href')).toBe(LICENSES.CC_BY_NC_ND.URL)
        expect(licenseLinkElement(wrapper).text()).toBe(LICENSES.CC_BY_NC_ND.SHORT)

        iconSources = licenseImages(wrapper).wrappers.map(img => img.attributes().src)
        expect(areIconSourcesCorrect(iconSources, ['cc', 'by', 'nc', 'nd'])).toBe(true)

    })
    test('Licenses without links', () => {
        const attributionDetails = {
            workTitle: TEST_DATA.WORK_TITLE,
            creatorName: TEST_DATA.CREATOR
        }
        wrapper.setProps({attribution: generateHTML(attributionDetails, LICENSES.CC0.SHORT)})

        // CC0 license
        expect(wrapper.find('.creator').text()).toBe(TEST_DATA.CREATOR)
        const para = wrapper.find('.html-string > p')
        expect(Object.keys(para.attributes()).length).toEqual(3)
        expect(para.attributes()[CC_NAMESPACE.NAME]).toEqual(CC_NAMESPACE.URI)
        expect(para.attributes()[DCT_NAMESPACE.NAME]).toEqual(DCT_NAMESPACE.URI)
        const workTitle = wrapper.find('.work-title')
        expect(workTitle.text()).toBe(TEST_DATA.WORK_TITLE)
        expect(licenseLinkElement(wrapper).attributes('rel')).toBe('license')
        expect(licenseLinkElement(wrapper).attributes('href')).toBe(LICENSES.CC0.URL)
        expect(licenseLinkElement(wrapper).text()).toBe(LICENSES.CC0.SHORT)

        expect(licenseImages(wrapper).at(0).attributes().style).toBe(ICON_STYLE)
        iconSources = licenseImages(wrapper).wrappers.map(img => img.attributes().src)
        expect(areIconSourcesCorrect(iconSources, ['cc', 'by'])).toBe(true)

        // CC BY-NC-ND
        wrapper.setProps({
            attribution: generateHTML(attributionDetails, LICENSES.CC_BY_NC_ND.SHORT)
        })
        expect(licenseLinkElement(wrapper).attributes('rel')).toBe('license')
        expect(licenseLinkElement(wrapper).attributes('href')).toBe(LICENSES.CC_BY_NC_ND.URL)
        expect(licenseLinkElement(wrapper).text()).toBe(LICENSES.CC_BY_NC_ND.SHORT)

        iconSources = licenseImages(wrapper).wrappers.map(img => img.attributes().src)
        expect(areIconSourcesCorrect(iconSources, ['cc', 'by', 'nc', 'nd'])).toBe(true)

    })
    test('Licenses only with links, no name/title', () => {
        const attributionDetails = {
            workUrl: TEST_DATA.WORK_URL,
            creatorProfileUrl: TEST_DATA.PROFILE_URL
        }
        wrapper.setProps({attribution: generateHTML(attributionDetails, LICENSES.CC0.SHORT)})

        // CC0 license
        expect(wrapper.find('.creator').text()).toBe('')
        const para = wrapper.find('.html-string > p')
        expect(Object.keys(para.attributes()).length).toEqual(3)
        expect(para.attributes()[CC_NAMESPACE.NAME]).toEqual(CC_NAMESPACE.URI)
        expect(para.attributes()[DCT_NAMESPACE.NAME]).toEqual(DCT_NAMESPACE.URI)
        const workTitle = wrapper.find('.work-title')
        expect(workTitle.text()).toBe('')
        expect(licenseLinkElement(wrapper).attributes('rel')).toBe('license')
        expect(licenseLinkElement(wrapper).attributes('href')).toBe(LICENSES.CC0.URL)
        expect(licenseLinkElement(wrapper).text()).toBe(LICENSES.CC0.SHORT)

        expect(licenseImages(wrapper).at(0).attributes().style).toBe(ICON_STYLE)
        iconSources = licenseImages(wrapper).wrappers.map(img => img.attributes().src)
        expect(areIconSourcesCorrect(iconSources, ['cc', 'by'])).toBe(true)

        // CC BY-NC-ND
        wrapper.setProps({
            attribution: generateHTML({}, LICENSES.CC_BY_NC_ND.SHORT)
        })
        expect(licenseLinkElement(wrapper).attributes('rel')).toBe('license')
        expect(licenseLinkElement(wrapper).attributes('href')).toBe(LICENSES.CC_BY_NC_ND.URL)
        expect(licenseLinkElement(wrapper).text()).toBe(LICENSES.CC_BY_NC_ND.SHORT)

        iconSources = licenseImages(wrapper).wrappers.map(img => img.attributes().src)
        expect(areIconSourcesCorrect(iconSources, ['cc', 'by', 'nc', 'nd'])).toBe(true)

    })
    test('Licenses with all attributes links', () => {
        const attributionDetails = {
            workTitle: TEST_DATA.WORK_TITLE,
            workUrl: TEST_DATA.WORK_URL,
            creatorName: TEST_DATA.CREATOR,
            creatorProfileUrl: TEST_DATA.PROFILE_URL
        }
        wrapper.setProps({attribution: generateHTML(attributionDetails, LICENSES.CC0.SHORT)})

        // CC0 license
        expect(wrapper.find('.creator').text()).toBe(TEST_DATA.CREATOR)
        const para = wrapper.find('.html-string > p')
        expect(Object.keys(para.attributes()).length).toEqual(3)
        expect(para.attributes()[CC_NAMESPACE.NAME]).toEqual(CC_NAMESPACE.URI)
        expect(para.attributes()[DCT_NAMESPACE.NAME]).toEqual(DCT_NAMESPACE.URI)
        const workTitle = wrapper.find('.work-title')
        expect(workTitle.text()).toBe(TEST_DATA.WORK_TITLE)
        expect(licenseLinkElement(wrapper).attributes('rel')).toBe('license')
        expect(licenseLinkElement(wrapper).attributes('href')).toBe(LICENSES.CC0.URL)
        expect(licenseLinkElement(wrapper).text()).toBe(LICENSES.CC0.SHORT)

        expect(licenseImages(wrapper).at(0).attributes().style).toBe(ICON_STYLE)
        iconSources = licenseImages(wrapper).wrappers.map(img => img.attributes().src)
        expect(areIconSourcesCorrect(iconSources, ['cc', 'by'])).toBe(true)

        // CC BY-NC-ND
        wrapper.setProps({
            attribution: generateHTML({}, LICENSES.CC_BY_NC_ND.SHORT)
        })
        expect(licenseLinkElement(wrapper).attributes('rel')).toBe('license')
        expect(licenseLinkElement(wrapper).attributes('href')).toBe(LICENSES.CC_BY_NC_ND.URL)
        expect(licenseLinkElement(wrapper).text()).toBe(LICENSES.CC_BY_NC_ND.SHORT)

        iconSources = licenseImages(wrapper).wrappers.map(img => img.attributes().src)
        expect(areIconSourcesCorrect(iconSources, ['cc', 'by', 'nc', 'nd'])).toBe(true)

    })
})
