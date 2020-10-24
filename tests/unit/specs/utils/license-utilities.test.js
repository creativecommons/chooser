/* eslint-disable no-undef */
import {
    attrToFull,
    attrToShort,
    generateHTML,
    licenseIconsArr,
    licenseSlug,
    licenseUrl,
    shortToAttr,
    updateVisibleEnabledStatus,
    LICENSES,
    CC_NAMESPACE,
    DCT_NAMESPACE,
    ICON_BASE_URL,
    ICON_STYLE
} from '@/utils/license-utilities'
import { mount } from '@vue/test-utils'
import TestComponent from './TestComponent'

const attributesToTest = [
    {
        attr: {},
        fullResult: undefined
    },
    {
        attr: {BY: false},
        fullResult: LICENSES.CC0.FULL,
        shortResult: LICENSES.CC0.SHORT
    },
    {
        attr:{ SA: false, BY: false },
        fullResult: LICENSES.CC0.FULL,
        shortResult: LICENSES.CC0.SHORT
    },
    {
        attr:{ BY: true },
        fullResult: LICENSES.CC_BY.FULL,
        shortResult: LICENSES.CC_BY.SHORT
    }

]
describe('attrToFull edge cases', function testAttrToFull() {
    attributesToTest.forEach((option) => {
        const {attr, fullResult} = option
        it(`Attributes ${JSON.stringify(attr)} should return <${fullResult}>`, () => {
            expect(attrToFull(attr)).toEqual(fullResult)
        })
    })
})
describe('attrToFull all licenses', () =>  {
    Object.values(LICENSES).forEach((license) => {
        const {ATTRIBUTES: attr, FULL: result} = license
        it(`${JSON.stringify(attr)} should return <${result}>`, () => {
            expect(attrToFull(attr)).toEqual(result)
        })
    })
})
describe('attrToShort all licenses', () =>  {
    Object.values(LICENSES).forEach((license) => {
        const {ATTRIBUTES: attr, SHORT: result} = license
        it(`${JSON.stringify(attr)} should return <${result}>`, () => {
            expect(attrToShort(attr)).toEqual(result)
        })
    })
})
describe('shortToAttr all licenses', () =>  {
    Object.values(LICENSES).forEach((license) => {
        const {ATTRIBUTES: attr, SHORT: short} = license
        it(`<${short}> should return ${JSON.stringify(attr)}`, () => {
            expect(shortToAttr(short)).toEqual(attr)
        })
    })
})
describe('license slug', () =>  {
    Object.values(LICENSES).forEach((license) => {
        const {SHORT: short, SLUG: slug} = license
        it(`<${short}> should return ${slug}`, () => {
            expect(licenseSlug(short)).toEqual(slug)
        })
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

describe('license url', () =>  {
    Object.values(LICENSES).forEach((license) => {
        const {ATTRIBUTES: attr, URL: url} = license
        it(`${JSON.stringify(attr)} should return ${url}`, () => {
            expect(licenseUrl(attr)).toEqual(url)
        })
        it(`${JSON.stringify(attr)} for web should return ${url} with a ref value`, () => {
            const [urlForWeb, ref] = licenseUrl(attr, 'web').split('/?')
            expect(urlForWeb).toEqual(url)
            expect(ref).toEqual('ref=chooser-v1')
        })
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
    const wrapper = mount(TestComponent, { propsData: { attribution: initialHtmlObject } })
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
        wrapper.setProps({ attribution: generateHTML(attributionDetails, LICENSES.CC0.SHORT) })

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
        wrapper.setProps({ attribution: generateHTML(attributionDetails, LICENSES.CC0.SHORT) })

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
        wrapper.setProps({ attribution: generateHTML(attributionDetails, LICENSES.CC0.SHORT) })

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
