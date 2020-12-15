import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import { mount, createLocalVue } from '@vue/test-utils'
import LicenseHTML from '@/components/LicenseHTML'
import createStore from '@/store'
import { CCBYAttributes } from '@/utils/license-utilities'

const defaultHTML = '<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#">This work   <a rel="license" href="https://creativecommons.org/licenses/by/4.0?ref=chooser-v1" target="_blank"\n' +
    '        rel="license noopener noreferrer" style="display:inline-block;">\n' +
    '        CC BY 4.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"></a></p>'

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

        wrapper = mount(LicenseHTML, {
            localVue,
            store,
            i18n
        })
    })

    it('it renders without any errors', () => {
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('has correct information when creator name and work title are provided', () => {
        expect(wrapper.vm.htmlLicenseParagraph).toEqual(defaultHTML)
    })
})
