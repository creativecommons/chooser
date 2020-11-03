import { mount, createLocalVue, config } from '@vue/test-utils'
import LicenseDropdown from '@/components/LicenseDropdown.vue'
import VueI18n from 'vue-i18n'
import Buefy from 'buefy'
import Vuex from 'vuex'

describe('LicenseDropdown.vue',()=>{
    let wrapper
    let getters
    let store
   
    beforeEach(()=>{
        const localVue = createLocalVue()
        localVue.use(VueI18n)
        localVue.use(Buefy)
        localVue.use(Vuex)
        getters= {
            shortName: () => {
                return 'CC BY-SA 4.0'
            },
            fullName: () => {
                return 'Attribution-ShareAlike 4.0 International'
            },
        }
        store = new Vuex.Store({
            getters
        })
        const messages = require('@/locales/en.json')
        const i18n = new VueI18n({
            locale: 'en',
            fallbackLocale: 'en',
            messages: messages,
            silentTranslationWarn: true
        })

        config.mocks.i18n = i18n

        config.mocks.i18n.$t = (key) => {
            return i18n.messages[key]
        }
        wrapper = mount(LicenseDropdown, {
            localVue,
            store,
            i18n
        })
    })

    it('Check if LicenseDropdown.vue component renders without any errors', () => {
        expect(wrapper.isVueInstance()).toBe(true)
    })
    it('Check if b-field tag with class license-dropdown is present in the DOM',()=>{
        expect(wrapper.contains('.license-dropdown')).toBe(true)
    })
    it('Check if select tag is present in the DOM',()=>{
        expect(wrapper.contains('select')).toBe(true)
    })
    it('Check if option tag is present in the DOM',()=>{
        expect(wrapper.contains('option')).toBe(true)
    })

    it('Checks methods: setCurrentLicense',()=>{
        const options = wrapper.find('select').findAll('option')
        options.at(1).setSelected()
        expect(wrapper.emitted().input).toBeTruthy()
    })

    it('Check if the LicenseDropdown.vue component has the expected UI', () => {
        expect(wrapper).toMatchSnapshot()
    })

})