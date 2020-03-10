import { mount, createLocalVue, config } from '@vue/test-utils'
import LicenseDetailsCard from '@/components/LicenseDetailsCard.vue'
import { licenseSlug } from '@/utils/license-utilities'
import VueI18n from 'vue-i18n'
import Vuex from 'vuex'

describe('LicenseDetailsCard.vue', () => {
    let wrapper
    let getters
    let store
    let i18n

    // Always creates a shallow instance of component
    beforeEach(() => {
        const localVue = createLocalVue()
        localVue.use(VueI18n)
        localVue.use(Vuex)
        getters = {
            shortName: () => {
                return 'CC BY-SA 4.0'
            },
            fullName: () => {
                return 'Attribution-ShareAlike 4.0 International'
            },
            licenseUrl: () => {
                return 'https://creativecommons.org/licenses/by-sa/4.0/?ref=ccchooser'
            },
            iconsList: () => {
                return ['by', 'sa']
            }
        }
        store = new Vuex.Store({
            getters
        })
        const messages = require('@/locales/en.json')
        i18n = new VueI18n({
            locale: 'en',
            fallbackLocale: 'en',
            messages: messages,
            silentTranslationWarn: true
        })

        config.mocks.i18n = i18n

        config.mocks.i18n.$t = (key) => {
            return i18n.messages[key]
        }
        wrapper = mount(LicenseDetailsCard, {
            localVue,
            store,
            i18n
        })
    })

    it('Check if LicenseDetailsCard.vue component renders without any errors', () => {
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    // Test for DOM elements which must be present
    it('Check if the main div-tag with class selected-license-card is present in the DOM', () => {
        expect(wrapper.contains('.selected-license-card')).toBe(true)
    })
    it('Check if the heading of the license details card is present in the DOM', () => {
        expect(wrapper.contains('h3')).toBe(true)
    })
    it('Check if the heading with full license name is present in the DOM', () => {
        expect(wrapper.contains('h4')).toBe(true)
    })
    it('Check if the license heading is a link to the license', () => {
        expect(wrapper.contains('.license-name')).toBe(true)
    })
    it('Check if the license description is present in the DOM', () => {
        expect(wrapper.contains('.chooser-selected-description')).toBe(true)
    })
    it('Check if the visual-info section is present in the DOM', () => {
        expect(wrapper.contains('.license-visual-info')).toBe(true)
    })
    it('Check if the license list is present in the DOM', () => {
        expect(wrapper.contains('.license-list')).toBe(true)
    })
    it('Check if the license list elements are present in the DOM', () => {
        expect(wrapper.contains('li')).toBe(true)
    })
    it('Check if the license list elements have description about them', () => {
        expect(wrapper.contains('.readable-string')).toBe(true)
    })

    // Tests for computed props and methods
    it('Check if the slug function returns the correct text', () => {
        expect(wrapper.vm.slug).toBe(licenseSlug('CC BY-SA 4.0'))
    })
    it('Check if the licenseKey function returns the correct text', () => {
        expect(wrapper.vm.licenseKey).toBe(`license-details-card.full-description.${licenseSlug('CC BY-SA 4.0')}`)
    })
    it('Check if the licenseDescription function returns the correct text', () => {
        expect(wrapper.vm.licenseDescription).toBe(`${licenseSlug('CC BY-SA 4.0')}-description`)
    })

    // Snapshot tests
    it('Check if the LicenseDetailsCard.vue component has the expected UI', () => {
        expect(wrapper).toMatchSnapshot()
    })
})
