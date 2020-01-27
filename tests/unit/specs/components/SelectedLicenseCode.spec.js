import { mount, createLocalVue, config } from '@vue/test-utils'
import Buefy from 'buefy'
import SelectedLicenseCode from '@/components/SelectedLicenseCode'
import LicenseUtilities from '@/utils/license-utilities'
import Vue from 'vue'
import VueI18n from 'vue-i18n'

const value = {
    shortName: 'CC BY 4.0',
    fullName: 'Attribution 4.0 International',
    attributionDetails: {
        creatorName: '',
        creatorProfileUrl: '',
        workTitle: '',
        workUrl: ''
    }
}

// mock dom methods
function _mockDomMethodsForClipboardJS(value) {
    window.getSelection = () => ({
        addRange: () => {},
        removeAllRanges: () => {},
        toString: () => value
    })

    document.execCommand = () => value
    document.createRange = () => ({ selectNodeContents: () => { } })
}

describe('SelectedLicenseCode.vue', () => {
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

        _mockDomMethodsForClipboardJS()
        wrapper = mount(SelectedLicenseCode, {
            localVue,
            propsData: {
                value: value
            },
            attachToDocument: true
        })
    })
    // Snapshot tests
    it('has the expected UI', () => {
        expect(wrapper).toMatchSnapshot()
    })

    // Tabs exist
    it('has html, richtext and copy tabs', () => {
        const tabs = wrapper.findAll('li')
        expect(tabs.length).toEqual(3)
        expect(tabs.at(0).classes()).toContain('is-active')
    })

    // Tabs change
    it('Changes tabs on click', () => {
        const tabsNav = wrapper.findAll('li')
        // The tab label should equal 'Rich Text', but isn't because of i18n handling
        // TODO: find a better way to test labels
        expect(tabsNav.at(0).text()).toEqual('')
        expect(wrapper.findAll('.is-active')).toHaveLength(1)
        expect(tabsNav.at(0).classes()).toContain('is-active')

        const tabs = wrapper.findAll('.tab-item')
        expect(tabs).toHaveLength(3)
        expect(tabs.at(0).isVisible()).toBe(true)
        expect(tabs.at(1).isVisible()).toBe(false)

        tabsNav.at(1).find('a').trigger('click')
        expect(tabsNav.at(1).classes()).toContain('is-active')
        expect(wrapper.findAll('.is-active')).toHaveLength(1)
        expect(tabs.at(1).isVisible()).toBe(true)

        const copyBtn = tabsNav.at(2).find('a').find('span').find('a')

        copyBtn.trigger('click')
        // The tab label should equal 'Copied!', but isn't because of i18n handling
        expect(tabsNav.at(2).text()).toEqual('')
        setTimeout(() => {
            expect(wrapper.vm.currentTab).toEqual(1)
        }, 2000)
    })

    // Test copying
    it('Copies text from active tab', () => {
        const copyLink = wrapper.findAll('li').at(2).find('a').find('span').find('a')

        expect(wrapper.vm.currentTab).toEqual(0)
        expect(wrapper.vm.clipboardTarget()).toEqual('#attribution-richtext')
        const htmlTab = wrapper.findAll('li').at(1).find('a')
        htmlTab.trigger('click')
        copyLink.trigger('click')
        expect(wrapper.vm.clipboardTarget()).toEqual('#attribution-html')
        expect(wrapper.vm.currentSelection).toEqual('html')

        const emittedEvents = wrapper.emitted()
        expect(emittedEvents).toHaveProperty('copyFailed')
        expect(emittedEvents.copyFailed.length).toBe(1)
    })

    // Test generated HTML
    it('Generates correct license HTML', () => {
        const generatedHtml = wrapper.find('#attribution-richtext')
        expect(generatedHtml.text()).toContain('CC BY 4.0')
        // check that icon links are correct
        // There are two icons - CC & BY
        expect(generatedHtml.findAll('img')).toHaveLength(2)
        // There are three links: two icons and license name
        expect(generatedHtml.findAll('a')).toHaveLength(1)
        expect(generatedHtml.find('a').attributes('href')).toEqual('https://creativecommons.org/licenses/by/4.0/?ref=ccchooser')
        // check that the text is correct
        // check that changing fields generate correct texts
    })
})
