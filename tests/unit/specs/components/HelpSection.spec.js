import {shallowMount, createLocalVue, config} from '@vue/test-utils'
import HelpSection from '@/components/HelpSection'
import Buefy from 'buefy'
import LicenseUtilities from '@/utils/license-utilities'
import Vue from 'vue'
import VueI18n from 'vue-i18n'

describe('HelpSection.vue', () => {
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
        wrapper = shallowMount(HelpSection, {
            localVue
        })
    })

    // Snapshot tests
    it('has the expected UI', () => {
        expect(wrapper).toMatchSnapshot()
    })

    // Variables tests
    it('equals isModal1Active to false', () => {
        expect(wrapper.vm.isModal1Active).toEqual(false)
    })

    it('expects isModal1Active to be true after clicking it', () => {
        const button = wrapper.find('#cc_license_btn')
        button.trigger('click')
        expect(wrapper.vm.isModal1Active).toEqual(true)
    })

    it('equals isModal2Active to false', () => {
        expect(wrapper.vm.isModal2Active).toEqual(false)
    })

    it('expects isModal2Active to be true after clicking it', () => {
        const button = wrapper.find('#license_work_btn')
        button.trigger('click')
        expect(wrapper.vm.isModal2Active).toEqual(true)
    })

    it('equals isModal3Active to false', () => {
        expect(wrapper.vm.isModal3Active).toEqual(false)
    })

    it('expects isModal3Active to be true after clicking it', () => {
        const button = wrapper.find('#icons_meaning_btn')
        button.trigger('click')
        expect(wrapper.vm.isModal3Active).toEqual(true)
    })

    it('equals isModal4Active to false', () => {
        expect(wrapper.vm.isModal4Active).toEqual(false)
    })

    it('expects isModal4Active to be true after clicking it', () => {
        const button = wrapper.find('#consideration_btn')
        button.trigger('click')
        expect(wrapper.vm.isModal4Active).toEqual(true)
    })

    it('equals isModal5Active to false', () => {
        expect(wrapper.vm.isModal5Active).toEqual(false)
    })

    it('expects isModal5Active to be true after clicking it', () => {
        const button = wrapper.find('#formal_license_btn')
        button.trigger('click')
        expect(wrapper.vm.isModal5Active).toEqual(true)
    })

    it('equals isModal6Active to false', () => {
        expect(wrapper.vm.isModal6Active).toEqual(false)
    })

    it('expects isModal6Active to be true after clicking it', () => {
        const button = wrapper.find('#license_description_btn')
        button.trigger('click')
        expect(wrapper.vm.isModal6Active).toEqual(true)
    })
})
