import { shallowMount, createLocalVue, config } from '@vue/test-utils'
import LicenseUseCard from '@/components/LicenseUseCard.vue'
import VueI18n from 'vue-i18n'
import Buefy from 'buefy'

describe('LicenseUseCard.vue', () => {
    let wrapper

    // Always creates a shallow instance of component
    beforeEach(() => {
        const localVue = createLocalVue()
        localVue.use(VueI18n)
        localVue.use(Buefy)
        const messages = require('@/locales/en.json')
        const i18n = new VueI18n({
            locale: 'en',
            fallbackLocale: 'en',
            messages: messages,
            silentTranslationWarn: true
        })

        config.mocks.i18n = i18n

        config.mocks.$t = (key) => {
            return i18n.messages[key]
        }
        wrapper = shallowMount(LicenseUseCard, {
            localVue,
            i18n
        })
    })

    it('Check if the LicenseUseCard.vue component renders without any errors', () => {
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    // Test for DOM elements which must be present
    it('Check if the main div tag with the class license-use-card is present', () => {
        expect(wrapper.contains('.license-use-card')).toBe(true)
    })
    it('Check if the main header is present in the DOM', () => {
        expect(wrapper.contains('.license-use-card h4')).toBe(true)
    })
    it('Check if the common instructions are present in the DOM', () => {
        expect(wrapper.contains('.license-use-instructions')).toBe(true)
    })
    it('Check if the tab and the tab items are present in the DOM', () => {
        expect(wrapper.contains('b-tabs-stub')).toBe(true)
        expect(wrapper.contains('b-tab-item-stub')).toBe(true)
        expect(wrapper.findAll('b-tab-item-stub').length).toBe(2)
    })

    // Snapshot tests
    it('LicenseUseCard.vue component has the expected UI', () => {
        expect(wrapper).toMatchSnapshot()
    })
})
