import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import { mount, createLocalVue } from '@vue/test-utils'
import createStore from '@/store'
import { CCBYAttributes } from '@/utils/license-utilities'
import LicenseHTMLTester from './LicenseHTMLTester'

describe('LicenseHTML.vue', () => {
    let wrapper
    let state
    let localVue

    // Vue i18n is looking for locale key in messages,
    // i.e. $t('app') becomes 'messages.<en>.app'
    const messages = {}
    messages.en = require('@/locales/en.js').messages
    beforeEach(() => {
        localVue = createLocalVue()
        localVue.use(VueI18n)
        localVue.use(Vuex)
        // License Code is only available after the User selects a license,
        // so we do not need to test blank license attributes
        state = { currentLicenseAttributes: CCBYAttributes }
        const store = createStore(state)
        const i18n = new VueI18n({
            locale: 'en',
            messages: messages
        })

        wrapper = mount(LicenseHTMLTester, {
            localVue,
            store,
            i18n
        })
    })

    it('has correct information when no attribution data is provided', () => {
        const rendered = wrapper.find('.rendered-html p')
        expect(rendered.attributes()['xmlns:dct']).toBe('http://purl.org/dc/terms/')
        expect(rendered.attributes()['xmlns:cc']).toBe('http://creativecommons.org/ns#')
        expect(rendered.text()).toBe('This work is licensed under CC BY 4.0')

        const licenseLink = wrapper.find('a')
        expect(licenseLink.attributes().href).toBe('https://creativecommons.org/licenses/by/4.0?ref=chooser-v1')
        // License link should have the following attributes: href, target, rel and style
        expect(Object.keys(licenseLink.attributes()).length).toBe(4)
        expect(licenseLink.attributes().target).toBe('_blank')
        expect(licenseLink.attributes().rel).toBe('license noopener noreferrer')

        const licenseIcons = wrapper.findAll('img')
        expect(licenseIcons.length).toBe(2)
    })
})
