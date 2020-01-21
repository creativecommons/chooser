import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Buefy from 'buefy'
import {config, createLocalVue, mount} from '@vue/test-utils'
import LicenseUtilities from '@/utils/license-utilities'
import SelectedLicenseDropdown from '@/components/SelectedLicenseDropdown'

const value = {
    shortName: 'CC BY 4.0',
    fullName: 'Attribution 4.0 International',
    personalDetails: {
        authorName: '',
        workTitle: '',
        workUrl: '',
        sourceWorkUrl: ''
    }
}

describe('LicenseDropdown.vue', () => {
    let wrapper
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
        wrapper = mount(SelectedLicenseDropdown, {
            localVue,
            propsData: {
                value: value
            }
        })
    })
    describe('correctly displays initial information and options when mounted', () => {
        it('initializes with base license names', () => {
            expect(wrapper.vm.$props.value.shortName).toEqual('CC BY 4.0')
            expect(wrapper.vm.$props.value.fullName).toEqual('Attribution 4.0 International')
            expect(wrapper.html()).toContain('CC BY 4.0')
            expect(wrapper.findAll('option')).toHaveLength(7)
        })
        it('calculate fullLicenseName correctly', () => {
            wrapper.vm.value.shortName = 'CC BY-ND 4.0'
            expect(wrapper.vm.fullLicenseName('CC BY-ND 4.0')).toEqual('Attribution-NoDerivatives 4.0 International')
        })
    })
})
