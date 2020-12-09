/* eslint-disable no-undef */
import {
    attrToFull,
    attrToShort,
    generateHTML,
    licenseIconsArr,
    licenseSlug,
    licenseURL,
    shortToAttr,
    updateVisibleEnabledStatus,
    LICENSES,
    CC_NAMESPACE,
    DCT_NAMESPACE,
    ICON_BASE_URL,
    ICON_STYLE,
    chooserRef
} from '@/utils/license-utilities'
import { mount } from '@vue/test-utils'
import TestComponent from './TestComponent'

const attributesToTest = [
    {
        attr: {},
        fullResult: undefined
    },
    {
        attr: { BY: false },
        fullResult: LICENSES.CC0.FULL,
        shortResult: LICENSES.CC0.SHORT
    },
    {
        attr: { SA: false, BY: false },
        fullResult: LICENSES.CC0.FULL,
        shortResult: LICENSES.CC0.SHORT
    },
    {
        attr: { BY: true },
        fullResult: LICENSES.CC_BY.FULL,
        shortResult: LICENSES.CC_BY.SHORT
    }

]
describe('attrToFull edge cases', function testAttrToFull() {
    attributesToTest.forEach((option) => {
        const { attr, fullResult } = option
        it(`Attributes ${JSON.stringify(attr)} should return <${fullResult}>`, () => {
            expect(attrToFull(attr)).toEqual(fullResult)
        })
    })
})
describe('attrToFull all licenses', () => {
    Object.values(LICENSES).forEach((license) => {
        const { ATTRIBUTES: attr, FULL: result } = license
        it(`${JSON.stringify(attr)} should return <${result}>`, () => {
            expect(attrToFull(attr)).toEqual(result)
        })
    })
})
describe('attrToShort all licenses', () => {
    Object.values(LICENSES).forEach((license) => {
        const { ATTRIBUTES: attr, SHORT: result } = license
        it(`${JSON.stringify(attr)} should return <${result}>`, () => {
            expect(attrToShort(attr)).toEqual(result)
        })
    })
})
describe('shortToAttr all licenses', () => {
    Object.values(LICENSES).forEach((license) => {
        const { ATTRIBUTES: attr, SHORT: short } = license
        it(`<${short}> should return ${JSON.stringify(attr)}`, () => {
            expect(shortToAttr(short)).toEqual(attr)
        })
    })
})
describe('license slug', () => {
    Object.values(LICENSES).forEach((license) => {
        const { SHORT: short, SLUG: slug } = license
        it(`<${short}> should return ${slug}`, () => {
            expect(licenseSlug(short)).toEqual(slug)
        })
    })
    it('should raise an error if non-license string is provided', () => {
        // No version number:
        expect(() => licenseSlug('CC BY-NC-ND')).toThrowError()
        // lower case
        expect(() => licenseSlug('cc by-nc-nd 4.0')).toThrowError()
    })
})

describe('shortToAttr', function testAttrToShort() {
    test('gibberish string #1', () => {
        const str = 'CC 4.0'
        expect(shortToAttr(str)).toEqual(undefined)
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

describe('license url', () => {
    Object.values(LICENSES).forEach((license) => {
        const { ATTRIBUTES: attr, URL: url } = license
        it(`${JSON.stringify(attr)} should return ${url} for print mode`, () => {
            expect(licenseURL(attr, 'print')).toEqual(url)
        })

        it(`${JSON.stringify(attr)} for web should return ${url} with a ref value by default`, () => {
            const [urlForWeb, ref] = licenseURL(attr).split('?')
            expect(urlForWeb).toEqual(url)
            expect(ref).toEqual('ref=chooser-v1')
        })

        it('Should raise an error if BY is not selected', () => {
            expect(() => { licenseURL({ ...LICENSES.CC0.ATTRIBUTES, BY: undefined }) }).toThrowError()
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
    // For each kind of Attribution data present, check:
    // 1. Correct namespaces of RDFa data a applied
    // 2. License link has correct rel and href attributes
    // 3. License link has correct text
    // 4. There are corresponding icons for the license
    // 5. Creator text and link are correct, and have proper metadata
    // 6. Work text and link are correct, and have proper metadata
    const hasIconSourcesErrors = (sources, licenses) => {
        const urlRef = '?ref=chooser-v1" target="_blank" rel="noopener noreferrer"'
        if (sources.length !== licenses.length) {
            return `Incorrect number of licenses, expected ${licenses.length}, got ${sources.length}`
        }
        sources.forEach((source) => {
            if (!source.startsWith(urlRef)) {
                return `${source} doesn't start with correct base`
            }
            const license = source
                .replace(ICON_BASE_URL, '')
                .replace(urlRef, '')
                .replace('.svg', '')
            if (!licenses.includes(license)) {
                return `${license} is not supposed to be present`
            }
        })
        return false
    }

    const attributionOptions = {
        blank: {},
        onlyCreator: { creatorName: TEST_DATA.CREATOR },
        onlyWork: { workTitle: TEST_DATA.WORK_TITLE },
        onlyCreatorUrl: { creatorProfileUrl: TEST_DATA.PROFILE_URL },
        onlyWorkUrl: { workUrl: TEST_DATA.WORK_URL },
        allData: {
            creatorName: TEST_DATA.CREATOR,
            workUrl: TEST_DATA.WORK_URL,
            workTitle: TEST_DATA.WORK_TITLE,
            creatorProfileUrl: TEST_DATA.PROFILE_URL
        }
    }
    Object.keys(attributionOptions).forEach((option) => {
        describe(`${option} with CC0 license should return correct HTML`, () => {
            const currentLicense = LICENSES.CC0
            const currentAttributionOptions = attributionOptions[option]
            const generatedHtml = generateHTML(currentAttributionOptions, currentLicense.SHORT)
            const wrapper = mount(TestComponent, { propsData: { attribution: generatedHtml } })
            const expectedWorkTitle = currentAttributionOptions.workTitle || ''
            const expectedCreatorName = currentAttributionOptions.creatorName || ''
            const expectedWorkUrl = currentAttributionOptions.workUrl || ''
            const expectedCreatorProfileUrl = currentAttributionOptions.creatorProfileUrl || ''

            it('has correct wrapper', () => {
                const para = wrapper.find('.html-string > p')
                // expect(Object.keys(para.attributes()).length).toEqual(3)
                expect(para.attributes()[CC_NAMESPACE.NAME]).toEqual(CC_NAMESPACE.URI)
                expect(para.attributes()[DCT_NAMESPACE.NAME]).toEqual(DCT_NAMESPACE.URI)
            })
            it(`has correct license link ${currentLicense.SHORT} and license icons `, () => {
                Object.values(LICENSES).forEach((license) => {
                    const licenseLinkElement = wrapper.find('.license-link').find('a')
                    const licenseImages = (wrapper) => wrapper.findAll('img')

                    expect(licenseLinkElement.attributes('rel')).toBe('license')
                    expect(licenseLinkElement.attributes('href')).toBe(currentLicense.URL + chooserRef)
                    expect(licenseLinkElement.text()).toBe(currentLicense.SHORT)

                    expect(licenseImages(wrapper).at(0).attributes().style).toBe(ICON_STYLE)
                    const iconSources = licenseImages(wrapper).wrappers.map(img => img.attributes().src)
                    expect(hasIconSourcesErrors(iconSources, currentLicense.ICONS)).toBe(false)
                })
            })
            it(`has correct work attribution: "${expectedWorkTitle}" at url "${expectedWorkUrl}"`, () => {
                const workTitle = wrapper.find('.work-title')
                if (!expectedWorkTitle) {
                    expect(workTitle.text()).toBeFalsy()
                } else {
                    expect(workTitle.text()).toBe(expectedWorkTitle)
                    if (!expectedWorkUrl) {
                        const titleMetaAttribute = workTitle.find('span').attributes().property
                        expect(titleMetaAttribute).toEqual('dct:title')
                    } else {
                        const titleLink = workTitle.find('a')
                        expect(titleLink.attributes().rel).toEqual('cc:attributionURL')
                        expect(titleLink.attributes().property).toEqual('dct:title')
                        expect(titleLink.attributes().href).toEqual(`http://${expectedWorkUrl}`)
                    }
                }
            })
            it(`has correct creator attribution: "${expectedCreatorName}" at url "${expectedCreatorProfileUrl}"`, () => {
                const creator = wrapper.find('.creator')
                expect(creator.text()).toBe(expectedCreatorName)
                if (expectedCreatorName) {
                    if (expectedCreatorProfileUrl) {
                        const creatorLinkAttributes = creator.find('a').attributes()
                        expect(creatorLinkAttributes.rel).toEqual('cc:attributionURL dct:creator')
                        expect(creatorLinkAttributes.property).toEqual('cc:attributionName')
                        expect(creatorLinkAttributes.href).toEqual(`http://${expectedCreatorProfileUrl}`)
                    } else {
                        expect(creator.find('span').attributes().property).toEqual('cc:attributionName')
                    }
                } else {
                    expect(creator.find('span').exists()).toBeFalsy()
                    expect(creator.find('a').exists()).toBeFalsy()
                }
            })
        })
    })
})
