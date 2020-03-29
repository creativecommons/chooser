import {
    attrToFull,
    attrToShort,
    generateHTML,
    licenseIconsArr,
    licenseSlug,
    licenseUrl,
    shortToAttr,
    updateVisibleEnabledStatus
} from '../../../../src/utils/license-utilities'

describe('attrToFull', function testAttrToFull() {
    test('CC0 #1', () => {
        const attr = {}
        expect(attrToFull(attr)).toBeUndefined()
    })
    test('CC0 #2', () => {
        const attr = { BY: false }
        expect(attrToFull(attr)).toBe('CC0 1.0 Universal')
    })
    test('CC0 #3', () => {
        const attr = { SA: false, BY: false }
        expect(attrToFull(attr)).toBe('CC0 1.0 Universal')
    })
    test('CC BY', () => {
        const attr = { BY: true }
        expect(attrToFull(attr)).toBe('Attribution 4.0 International')
    })
    test('CC BY-SA', () => {
        const attr = { BY: true, SA: true }
        expect(attrToFull(attr)).toBe(
            'Attribution-ShareAlike 4.0 International'
        )
    })
    test('CC BY-NC', () => {
        const attr = { BY: true, NC: true }
        expect(attrToFull(attr)).toBe(
            'Attribution-NonCommercial 4.0 International'
        )
    })
    test('CC BY-NC-SA', () => {
        const attr = { BY: true, NC: true, SA: true }
        expect(attrToFull(attr)).toBe(
            'Attribution-NonCommercial-ShareAlike 4.0 International'
        )
    })
    test('CC BY-ND', () => {
        const attr = { BY: true, ND: true }
        expect(attrToFull(attr)).toBe(
            'Attribution-NoDerivatives 4.0 International'
        )
    })
    test('CC BY-NC-ND', () => {
        const attr = { BY: true, ND: true, NC: true }
        expect(attrToFull(attr)).toBe(
            'Attribution-NonCommercial-NoDerivatives 4.0 International'
        )
    })
    test('SA, ND: true', () => {
        const attr = { BY: true, SA: true, ND: true }
        expect(attrToFull(attr)).toBe(
            'Attribution-NoDerivatives 4.0 International'
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
        expect(attrToShort(attr)).toBe('CC0 1.0')
    })
    test('CC0 #2', () => {
        const attr = { SA: false, BY: false }
        expect(attrToShort(attr)).toBe('CC0 1.0')
    })
    test('CC BY', () => {
        const attr = { BY: true }
        expect(attrToShort(attr)).toBe('CC BY 4.0')
    })
    test('CC BY-SA', () => {
        const attr = { BY: true, SA: true }
        expect(attrToShort(attr)).toBe('CC BY-SA 4.0')
    })
    test('CC BY-NC', () => {
        const attr = { BY: true, NC: true }
        expect(attrToShort(attr)).toBe('CC BY-NC 4.0')
    })
    test('CC BY-NC-SA', () => {
        const attr = { BY: true, NC: true, SA: true }
        expect(attrToShort(attr)).toBe('CC BY-NC-SA 4.0')
    })
    test('CC BY-ND', () => {
        const attr = { BY: true, ND: true }
        expect(attrToShort(attr)).toBe('CC BY-ND 4.0')
    })
    test('CC BY-NC-ND', () => {
        const attr = { BY: true, ND: true, NC: true }
        expect(attrToShort(attr)).toBe('CC BY-NC-ND 4.0')
    })
})

describe('shortToAttr', function testAttrToShort() {
    test('gibrish string #1', () => {
        const str = 'gibrish'
        expect(shortToAttr(str)).not.toEqual({ BY: true })
    })
    test('gibrish string #2', () => {
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
        const str = 'CC0 1.0'
        expect(licenseSlug(str)).toBe('cc0')
    })
    test('CC BY 4.0', () => {
        const str = 'CC BY 4.0'
        expect(licenseSlug(str)).toBe('cc-by')
    })
    test('CC BY-SA 4.0', () => {
        const str = 'CC BY-SA 4.0'
        expect(licenseSlug(str)).toBe('cc-by-sa')
    })
    test('CC BY-NC 4.0', () => {
        const str = 'CC BY-NC 4.0'
        expect(licenseSlug(str)).toBe('cc-by-nc')
    })
    test('CC BY-NC-SA 4.0', () => {
        const str = 'CC BY-NC-SA 4.0'
        expect(licenseSlug(str)).toBe('cc-by-nc-sa')
    })
    test('CC BY-ND 4.0', () => {
        const str = 'CC BY-ND 4.0'
        expect(licenseSlug(str)).toBe('cc-by-nd')
    })
    test('CC BY-NC-ND 4.0', () => {
        const str = 'CC BY-NC-ND 4.0'
        expect(licenseSlug(str)).toBe('cc-by-nc-nd')
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
        expect(licenseUrl(attr, web)).toBe('https://creativecommons.org/publicdomain/zero/1.0/?ref=ccchooser')
    })
    test('CC0 no web', () => {
        const attr = { BY: false }
        expect(licenseUrl(attr)).toBe('https://creativecommons.org/publicdomain/zero/1.0')
    })
    test('CC BY web', () => {
        const attr = { BY: true }
        expect(licenseUrl(attr, web)).toBe('https://creativecommons.org/licenses/by/4.0/?ref=ccchooser')
    })
    test('CC BY no web', () => {
        const attr = { BY: true }
        expect(licenseUrl(attr)).toBe('https://creativecommons.org/licenses/by/4.0')
    })
    test('CC BY-SA web', () => {
        const attr = { BY: true, SA: true }
        expect(licenseUrl(attr, web)).toBe('https://creativecommons.org/licenses/by-sa/4.0/?ref=ccchooser')
    })
    test('CC BY-SA no web', () => {
        const attr = { BY: true, SA: true }
        expect(licenseUrl(attr)).toBe('https://creativecommons.org/licenses/by-sa/4.0')
    })
    test('CC BY-NC web', () => {
        const attr = { BY: true, NC: true }
        expect(licenseUrl(attr, web)).toBe('https://creativecommons.org/licenses/by-nc/4.0/?ref=ccchooser')
    })
    test('CC BY-NC no web', () => {
        const attr = { BY: true, NC: true }
        expect(licenseUrl(attr)).toBe('https://creativecommons.org/licenses/by-nc/4.0')
    })
    test('CC BY-NC-SA web', () => {
        const attr = { BY: true, NC: true, SA: true }
        expect(licenseUrl(attr, web)).toBe('https://creativecommons.org/licenses/by-nc-sa/4.0/?ref=ccchooser')
    })
    test('CC BY-NC-SA no web', () => {
        const attr = { BY: true, NC: true, SA: true }
        expect(licenseUrl(attr)).toBe('https://creativecommons.org/licenses/by-nc-sa/4.0')
    })
    test('CC BY-ND web', () => {
        const attr = { BY: true, ND: true }
        expect(licenseUrl(attr, web)).toBe('https://creativecommons.org/licenses/by-nd/4.0/?ref=ccchooser')
    })
    test('CC BY-ND no web', () => {
        const attr = { BY: true, ND: true }
        expect(licenseUrl(attr)).toBe('https://creativecommons.org/licenses/by-nd/4.0')
    })
    test('CC BY-NC-ND web', () => {
        const attr = { BY: true, NC: true, ND: true }
        expect(licenseUrl(attr, web)).toBe('https://creativecommons.org/licenses/by-nc-nd/4.0/?ref=ccchooser')
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

describe('generateHTML CC0', function testGenerateHTML() {
    const license = 'CC0 1.0'
    test('empty attr', () => {
        const attr = {}
        expect(generateHTML(attr, license)).toEqual({
            creator: '',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/publicdomain/zero/1.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-cc0_icon.svg" /></a>',
            workTitle: ''
        })
    })
    test('creator name', () => {
        const attr = { creatorName: 'John' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '<span rel="cc:attributionName">John</span>',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/publicdomain/zero/1.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-cc0_icon.svg" /></a>',
            workTitle: ''
        })
    })
    test('creator name + url', () => {
        const attr = { creatorName: 'John', creatorProfileUrl: 'j@doe.com' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '<a rel="cc:attributionURL" href="j@doe.com"><span rel="cc:attributionName">John</span></a>',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/publicdomain/zero/1.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-cc0_icon.svg" /></a>',
            workTitle: ''
        })
    })
    test('work title', () => {
        const attr = { workTitle: 'Foo' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/publicdomain/zero/1.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-cc0_icon.svg" /></a>',
            workTitle: '<span rel="dc:title">Foo</span>'
        })
    })
    test('work title + url', () => {
        const attr = { workTitle: 'Foo', workUrl: 'www.foo.bar' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/publicdomain/zero/1.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-cc0_icon.svg" /></a>',
            workTitle: '<a rel="cc:attributionURL" href="www.foo.bar"><span rel="dc:title">Foo</span></a>'
        })
    })
    test('creator name; work title', () => {
        const attr = { workTitle: 'Foo', creatorName: 'Jane' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '<span rel="cc:attributionName">Jane</span>',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/publicdomain/zero/1.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-cc0_icon.svg" /></a>',
            workTitle: '<span rel="dc:title">Foo</span>'
        })
    })
    test('creator name + url; work title', () => {
        const attr = { creatorName: 'Jane', creatorProfileUrl: 'j@doe.com', workTitle: 'Foo' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '<a rel="cc:attributionURL" href="j@doe.com"><span rel="cc:attributionName">Jane</span></a>',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/publicdomain/zero/1.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-cc0_icon.svg" /></a>',
            workTitle: '<span rel="dc:title">Foo</span>'
        })
    })
    test('creator name; work title + url', () => {
        const attr = { creatorName: 'Jane', workTitle: 'Foo', workUrl: 'www.foo.bar' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '<span rel="cc:attributionName">Jane</span>',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/publicdomain/zero/1.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-cc0_icon.svg" /></a>',
            workTitle: '<a rel="cc:attributionURL" href="www.foo.bar"><span rel="dc:title">Foo</span></a>'
        })
    })
    test('creator name + url; work title + url', () => {
        const attr = { creatorName: 'Jane', creatorProfileUrl: 'j@doe.com', workTitle: 'Foo', workUrl: 'www.foo.bar' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '<a rel="cc:attributionURL" href="j@doe.com"><span rel="cc:attributionName">Jane</span></a>',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/publicdomain/zero/1.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-cc0_icon.svg" /></a>',
            workTitle: '<a rel="cc:attributionURL" href="www.foo.bar"><span rel="dc:title">Foo</span></a>'
        })
    })
})

describe('generateHTML CC BY', function testGenerateHTML() {
    const license = 'CC BY 4.0'
    test('empty attr', () => {
        const attr = {}
        expect(generateHTML(attr, license)).toEqual({
            creator: '',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /></a>',
            workTitle: ''
        })
    })
    test('creator name', () => {
        const attr = { creatorName: 'John' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '<span rel="cc:attributionName">John</span>',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /></a>',
            workTitle: ''
        })
    })
    test('creator name + url', () => {
        const attr = { creatorName: 'John', creatorProfileUrl: 'j@doe.com' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '<a rel="cc:attributionURL" href="j@doe.com"><span rel="cc:attributionName">John</span></a>',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /></a>',
            workTitle: ''
        })
    })
    test('work title', () => {
        const attr = { workTitle: 'Foo' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /></a>',
            workTitle: '<span rel="dc:title">Foo</span>'
        })
    })
    test('work title + url', () => {
        const attr = { workTitle: 'Foo', workUrl: 'www.foo.bar' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /></a>',
            workTitle: '<a rel="cc:attributionURL" href="www.foo.bar"><span rel="dc:title">Foo</span></a>'
        })
    })
    test('creator name; work title', () => {
        const attr = { workTitle: 'Foo', creatorName: 'Jane' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '<span rel="cc:attributionName">Jane</span>',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /></a>',
            workTitle: '<span rel="dc:title">Foo</span>'
        })
    })
    test('creator name + url; work title', () => {
        const attr = { creatorName: 'Jane', creatorProfileUrl: 'j@doe.com', workTitle: 'Foo' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '<a rel="cc:attributionURL" href="j@doe.com"><span rel="cc:attributionName">Jane</span></a>',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /></a>',
            workTitle: '<span rel="dc:title">Foo</span>'
        })
    })
    test('creator name; work title + url', () => {
        const attr = { creatorName: 'Jane', workTitle: 'Foo', workUrl: 'www.foo.bar' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '<span rel="cc:attributionName">Jane</span>',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /></a>',
            workTitle: '<a rel="cc:attributionURL" href="www.foo.bar"><span rel="dc:title">Foo</span></a>'
        })
    })
    test('creator name + url; work title + url', () => {
        const attr = { creatorName: 'Jane', creatorProfileUrl: 'j@doe.com', workTitle: 'Foo', workUrl: 'www.foo.bar' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '<a rel="cc:attributionURL" href="j@doe.com"><span rel="cc:attributionName">Jane</span></a>',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /></a>',
            workTitle: '<a rel="cc:attributionURL" href="www.foo.bar"><span rel="dc:title">Foo</span></a>'
        })
    })
})

describe('generateHTML CC BY-SA', function testGenerateHTML() {
    const license = 'CC BY-SA 4.0'
    test('empty attr', () => {
        const attr = {}
        expect(generateHTML(attr, license)).toEqual({
            creator: '',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-sa/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-sa_icon.svg" /></a>',
            workTitle: ''
        })
    })
    test('creator name', () => {
        const attr = { creatorName: 'John' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '<span rel="cc:attributionName">John</span>',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-sa/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-sa_icon.svg" /></a>',
            workTitle: ''
        })
    })
    test('creator name + url', () => {
        const attr = { creatorName: 'John', creatorProfileUrl: 'j@doe.com' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '<a rel="cc:attributionURL" href="j@doe.com"><span rel="cc:attributionName">John</span></a>',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-sa/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-sa_icon.svg" /></a>',
            workTitle: ''
        })
    })
    test('work title', () => {
        const attr = { workTitle: 'Foo' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-sa/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-sa_icon.svg" /></a>',
            workTitle: '<span rel="dc:title">Foo</span>'
        })
    })
    test('work title + url', () => {
        const attr = { workTitle: 'Foo', workUrl: 'www.foo.bar' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-sa/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-sa_icon.svg" /></a>',
            workTitle: '<a rel="cc:attributionURL" href="www.foo.bar"><span rel="dc:title">Foo</span></a>'
        })
    })
    test('creator name; work title', () => {
        const attr = { workTitle: 'Foo', creatorName: 'Jane' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '<span rel="cc:attributionName">Jane</span>',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-sa/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-sa_icon.svg" /></a>',
            workTitle: '<span rel="dc:title">Foo</span>'
        })
    })
    test('creator name + url; work title', () => {
        const attr = { creatorName: 'Jane', creatorProfileUrl: 'j@doe.com', workTitle: 'Foo' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '<a rel="cc:attributionURL" href="j@doe.com"><span rel="cc:attributionName">Jane</span></a>',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-sa/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-sa_icon.svg" /></a>',
            workTitle: '<span rel="dc:title">Foo</span>'
        })
    })
    test('creator name; work title + url', () => {
        const attr = { creatorName: 'Jane', workTitle: 'Foo', workUrl: 'www.foo.bar' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '<span rel="cc:attributionName">Jane</span>',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-sa/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-sa_icon.svg" /></a>',
            workTitle: '<a rel="cc:attributionURL" href="www.foo.bar"><span rel="dc:title">Foo</span></a>'
        })
    })
    test('creator name + url; work title + url', () => {
        const attr = { creatorName: 'Jane', creatorProfileUrl: 'j@doe.com', workTitle: 'Foo', workUrl: 'www.foo.bar' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '<a rel="cc:attributionURL" href="j@doe.com"><span rel="cc:attributionName">Jane</span></a>',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-sa/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-sa_icon.svg" /></a>',
            workTitle: '<a rel="cc:attributionURL" href="www.foo.bar"><span rel="dc:title">Foo</span></a>'
        })
    })
})

describe('generateHTML CC BY-NC', function testGenerateHTML() {
    const license = 'CC BY-NC 4.0'
    test('empty attr', () => {
        const attr = {}
        expect(generateHTML(attr, license)).toEqual({
            creator: '',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-nc/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nc_icon.svg" /></a>',
            workTitle: ''
        })
    })
    test('creator name', () => {
        const attr = { creatorName: 'John' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '<span rel="cc:attributionName">John</span>',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-nc/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nc_icon.svg" /></a>',
            workTitle: ''
        })
    })
    test('creator name + url', () => {
        const attr = { creatorName: 'John', creatorProfileUrl: 'j@doe.com' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '<a rel="cc:attributionURL" href="j@doe.com"><span rel="cc:attributionName">John</span></a>',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-nc/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nc_icon.svg" /></a>',
            workTitle: ''
        })
    })
    test('work title', () => {
        const attr = { workTitle: 'Foo' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-nc/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nc_icon.svg" /></a>',
            workTitle: '<span rel="dc:title">Foo</span>'
        })
    })
    test('work title + url', () => {
        const attr = { workTitle: 'Foo', workUrl: 'www.foo.bar' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-nc/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nc_icon.svg" /></a>',
            workTitle: '<a rel="cc:attributionURL" href="www.foo.bar"><span rel="dc:title">Foo</span></a>'
        })
    })
    test('creator name; work title', () => {
        const attr = { workTitle: 'Foo', creatorName: 'Jane' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '<span rel="cc:attributionName">Jane</span>',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-nc/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nc_icon.svg" /></a>',
            workTitle: '<span rel="dc:title">Foo</span>'
        })
    })
    test('creator name + url; work title', () => {
        const attr = { creatorName: 'Jane', creatorProfileUrl: 'j@doe.com', workTitle: 'Foo' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '<a rel="cc:attributionURL" href="j@doe.com"><span rel="cc:attributionName">Jane</span></a>',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-nc/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nc_icon.svg" /></a>',
            workTitle: '<span rel="dc:title">Foo</span>'
        })
    })
    test('creator name; work title + url', () => {
        const attr = { creatorName: 'Jane', workTitle: 'Foo', workUrl: 'www.foo.bar' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '<span rel="cc:attributionName">Jane</span>',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-nc/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nc_icon.svg" /></a>',
            workTitle: '<a rel="cc:attributionURL" href="www.foo.bar"><span rel="dc:title">Foo</span></a>'
        })
    })
    test('creator name + url; work title + url', () => {
        const attr = { creatorName: 'Jane', creatorProfileUrl: 'j@doe.com', workTitle: 'Foo', workUrl: 'www.foo.bar' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '<a rel="cc:attributionURL" href="j@doe.com"><span rel="cc:attributionName">Jane</span></a>',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-nc/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nc_icon.svg" /></a>',
            workTitle: '<a rel="cc:attributionURL" href="www.foo.bar"><span rel="dc:title">Foo</span></a>'
        })
    })
})

describe('generateHTML CC BY-NC-SA', function testGenerateHTML() {
    const license = 'CC BY-NC-SA 4.0'
    test('empty attr', () => {
        const attr = {}
        expect(generateHTML(attr, license)).toEqual({
            creator: '',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-nc-sa/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-sa_icon.svg" /></a>',
            workTitle: ''
        })
    })
    test('creator name', () => {
        const attr = { creatorName: 'John' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '<span rel="cc:attributionName">John</span>',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-nc-sa/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-sa_icon.svg" /></a>',
            workTitle: ''
        })
    })
    test('creator name + url', () => {
        const attr = { creatorName: 'John', creatorProfileUrl: 'j@doe.com' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '<a rel="cc:attributionURL" href="j@doe.com"><span rel="cc:attributionName">John</span></a>',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-nc-sa/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-sa_icon.svg" /></a>',
            workTitle: ''
        })
    })
    test('work title', () => {
        const attr = { workTitle: 'Foo' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-nc-sa/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-sa_icon.svg" /></a>',
            workTitle: '<span rel="dc:title">Foo</span>'
        })
    })
    test('work title + url', () => {
        const attr = { workTitle: 'Foo', workUrl: 'www.foo.bar' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-nc-sa/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-sa_icon.svg" /></a>',
            workTitle: '<a rel="cc:attributionURL" href="www.foo.bar"><span rel="dc:title">Foo</span></a>'
        })
    })
    test('creator name; work title', () => {
        const attr = { workTitle: 'Foo', creatorName: 'Jane' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '<span rel="cc:attributionName">Jane</span>',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-nc-sa/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-sa_icon.svg" /></a>',
            workTitle: '<span rel="dc:title">Foo</span>'
        })
    })
    test('creator name + url; work title', () => {
        const attr = { creatorName: 'Jane', creatorProfileUrl: 'j@doe.com', workTitle: 'Foo' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '<a rel="cc:attributionURL" href="j@doe.com"><span rel="cc:attributionName">Jane</span></a>',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-nc-sa/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-sa_icon.svg" /></a>',
            workTitle: '<span rel="dc:title">Foo</span>'
        })
    })
    test('creator name; work title + url', () => {
        const attr = { creatorName: 'Jane', workTitle: 'Foo', workUrl: 'www.foo.bar' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '<span rel="cc:attributionName">Jane</span>',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-nc-sa/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-sa_icon.svg" /></a>',
            workTitle: '<a rel="cc:attributionURL" href="www.foo.bar"><span rel="dc:title">Foo</span></a>'
        })
    })
    test('creator name + url; work title + url', () => {
        const attr = { creatorName: 'Jane', creatorProfileUrl: 'j@doe.com', workTitle: 'Foo', workUrl: 'www.foo.bar' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '<a rel="cc:attributionURL" href="j@doe.com"><span rel="cc:attributionName">Jane</span></a>',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-nc-sa/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-sa_icon.svg" /></a>',
            workTitle: '<a rel="cc:attributionURL" href="www.foo.bar"><span rel="dc:title">Foo</span></a>'
        })
    })
})

describe('generateHTML CC BY-ND', function testGenerateHTML() {
    const license = 'CC BY-ND 4.0'
    test('empty attr', () => {
        const attr = {}
        expect(generateHTML(attr, license)).toEqual({
            creator: '',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-nd/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nd_icon.svg" /></a>',
            workTitle: ''
        })
    })
    test('creator name', () => {
        const attr = { creatorName: 'John' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '<span rel="cc:attributionName">John</span>',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-nd/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nd_icon.svg" /></a>',
            workTitle: ''
        })
    })
    test('creator name + url', () => {
        const attr = { creatorName: 'John', creatorProfileUrl: 'j@doe.com' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '<a rel="cc:attributionURL" href="j@doe.com"><span rel="cc:attributionName">John</span></a>',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-nd/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nd_icon.svg" /></a>',
            workTitle: ''
        })
    })
    test('work title', () => {
        const attr = { workTitle: 'Foo' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-nd/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nd_icon.svg" /></a>',
            workTitle: '<span rel="dc:title">Foo</span>'
        })
    })
    test('work title + url', () => {
        const attr = { workTitle: 'Foo', workUrl: 'www.foo.bar' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-nd/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nd_icon.svg" /></a>',
            workTitle: '<a rel="cc:attributionURL" href="www.foo.bar"><span rel="dc:title">Foo</span></a>'
        })
    })
    test('creator name; work title', () => {
        const attr = { workTitle: 'Foo', creatorName: 'Jane' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '<span rel="cc:attributionName">Jane</span>',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-nd/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nd_icon.svg" /></a>',
            workTitle: '<span rel="dc:title">Foo</span>'
        })
    })
    test('creator name + url; work title', () => {
        const attr = { creatorName: 'Jane', creatorProfileUrl: 'j@doe.com', workTitle: 'Foo' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '<a rel="cc:attributionURL" href="j@doe.com"><span rel="cc:attributionName">Jane</span></a>',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-nd/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nd_icon.svg" /></a>',
            workTitle: '<span rel="dc:title">Foo</span>'
        })
    })
    test('creator name; work title + url', () => {
        const attr = { creatorName: 'Jane', workTitle: 'Foo', workUrl: 'www.foo.bar' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '<span rel="cc:attributionName">Jane</span>',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-nd/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nd_icon.svg" /></a>',
            workTitle: '<a rel="cc:attributionURL" href="www.foo.bar"><span rel="dc:title">Foo</span></a>'
        })
    })
    test('creator name + url; work title + url', () => {
        const attr = { creatorName: 'Jane', creatorProfileUrl: 'j@doe.com', workTitle: 'Foo', workUrl: 'www.foo.bar' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '<a rel="cc:attributionURL" href="j@doe.com"><span rel="cc:attributionName">Jane</span></a>',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-nd/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nd_icon.svg" /></a>',
            workTitle: '<a rel="cc:attributionURL" href="www.foo.bar"><span rel="dc:title">Foo</span></a>'
        })
    })
})

describe('generateHTML CC BY-NC-ND', function testGenerateHTML() {
    const license = 'CC BY-NC-ND 4.0'
    test('empty attr', () => {
        const attr = {}
        expect(generateHTML(attr, license)).toEqual({
            creator: '',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-nc-nd/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nd_icon.svg" /></a>',
            workTitle: ''
        })
    })
    test('creator name', () => {
        const attr = { creatorName: 'John' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '<span rel="cc:attributionName">John</span>',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-nc-nd/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nd_icon.svg" /></a>',
            workTitle: ''
        })
    })
    test('creator name + url', () => {
        const attr = { creatorName: 'John', creatorProfileUrl: 'j@doe.com' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '<a rel="cc:attributionURL" href="j@doe.com"><span rel="cc:attributionName">John</span></a>',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-nc-nd/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nd_icon.svg" /></a>',
            workTitle: ''
        })
    })
    test('work title', () => {
        const attr = { workTitle: 'Foo' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-nc-nd/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nd_icon.svg" /></a>',
            workTitle: '<span rel="dc:title">Foo</span>'
        })
    })
    test('work title + url', () => {
        const attr = { workTitle: 'Foo', workUrl: 'www.foo.bar' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-nc-nd/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nd_icon.svg" /></a>',
            workTitle: '<a rel="cc:attributionURL" href="www.foo.bar"><span rel="dc:title">Foo</span></a>'
        })
    })
    test('creator name; work title', () => {
        const attr = { workTitle: 'Foo', creatorName: 'Jane' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '<span rel="cc:attributionName">Jane</span>',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-nc-nd/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nd_icon.svg" /></a>',
            workTitle: '<span rel="dc:title">Foo</span>'
        })
    })
    test('creator name + url; work title', () => {
        const attr = { creatorName: 'Jane', creatorProfileUrl: 'j@doe.com', workTitle: 'Foo' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '<a rel="cc:attributionURL" href="j@doe.com"><span rel="cc:attributionName">Jane</span></a>',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-nc-nd/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nd_icon.svg" /></a>',
            workTitle: '<span rel="dc:title">Foo</span>'
        })
    })
    test('creator name; work title + url', () => {
        const attr = { creatorName: 'Jane', workTitle: 'Foo', workUrl: 'www.foo.bar' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '<span rel="cc:attributionName">Jane</span>',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-nc-nd/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nd_icon.svg" /></a>',
            workTitle: '<a rel="cc:attributionURL" href="www.foo.bar"><span rel="dc:title">Foo</span></a>'
        })
    })
    test('creator name + url; work title + url', () => {
        const attr = { creatorName: 'Jane', creatorProfileUrl: 'j@doe.com', workTitle: 'Foo', workUrl: 'www.foo.bar' }
        expect(generateHTML(attr, license)).toEqual({
            creator: '<a rel="cc:attributionURL" href="j@doe.com"><span rel="cc:attributionName">Jane</span></a>',
            htmlString: '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text">',
            licenseIconsLink: '<a href="https://creativecommons.org/licenses/by-nc-nd/4.0"><img style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nc_icon.svg" /><img  style="height:22px!important;margin-left: 3px;vertical-align:text-bottom;" src="https://search.creativecommons.org/static/img/cc-nd_icon.svg" /></a>',
            workTitle: '<a rel="cc:attributionURL" href="www.foo.bar"><span rel="dc:title">Foo</span></a>'
        })
    })
})
