import { mount, createLocalVue } from '@vue/test-utils'
import SelectedLicenseCode from '@/components/SelectedLicenseCode'
import Buefy from 'buefy'
import sinon from 'sinon'

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
    let spy
    let clipboard

    beforeEach(() => {
        const localVue = createLocalVue()
        localVue.use(Buefy)
        _mockDomMethodsForClipboardJS()
        spy = sinon.stub()
        wrapper = mount(SelectedLicenseCode, {
            localVue,
            propsData: {
                value: value
            },
            attachToDocument: true,
            destroyed() {
                spy()
            }
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
        expect(tabs.at(0).text()).toEqual('Rich Text')
        expect(tabs.at(0).classes()).toContain('is-active')
        expect(tabs.at(1).text()).toEqual('HTML')
        expect(tabs.at(2).text()).toEqual('Copy')
    })

    // Tabs change
    it('Changes tabs on click', () => {
        const tabsNav = wrapper.findAll('li')

        expect(tabsNav.at(0).text()).toEqual('Rich Text')
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
        expect(tabsNav.at(2).text()).toEqual('Copied!')
        setTimeout(() => {
            expect(wrapper.vm.currentTab).toEqual(1)
        }, 2000)
    })

    // Test copying
    it('Copies text from active tab', () => {
        const copyLink = wrapper.findAll('li').at(2).find('a').find('span').find('a')
        expect(wrapper.vm.currentTab).toEqual(0)
        expect(wrapper.vm.clipboardTarget).toEqual('#attribution-richtext')
        wrapper.findAll('li').at(1).find('a').trigger('click')
        expect(wrapper.vm.clipboardTarget).toEqual('#attribution-html')
        copyLink.trigger('click')
        expect(wrapper.vm.clipboardTarget).toEqual('#attribution-html')
        const emittedEvents = wrapper.emitted()
        expect(emittedEvents).toHaveProperty('copyFailed')
        expect(emittedEvents.copyFailed.length).toBe(1)
    })

})
