import {shallowMount, createLocalVue, config} from '@vue/test-utils'
import SelectedLicenseInfo from '@/components/SelectedLicenseInfo'
import Buefy from 'buefy'
import LicenseUtilities from '@/utils/license-utilities'
import Vue from 'vue'
import VueI18n from 'vue-i18n'

describe('SelectedLicenseInfo.vue', () => {
    let wrapper

    // Always creates a shallow instance of component
    beforeEach(() => {
        const localVue = createLocalVue()
        localVue.use(Buefy)
        localVue.use(LicenseUtilities)
        Vue.use(VueI18n)
        const messages = require('@/locales/en.json')
        const i18n = new VueI18n({
            locale: 'en',
            fallbackLocale: 'en',
            messages: messages
        })

        config.mocks.i18n = i18n

        config.mocks.$t = (key) => {
            return i18n.messages[key]
        }

        wrapper = shallowMount(SelectedLicenseInfo, {
            localVue,
            propsData: {
                value: {
                    shortName: 'CC BY 4.0',
                    fullName: 'Attribution 4.0 International'
                }
            }
        })
    })

    // Snapshot tests
    it('has the expected UI', () => {
        expect(wrapper).toMatchSnapshot()
    })
})
