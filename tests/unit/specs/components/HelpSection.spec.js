import { mount, createLocalVue, config } from '@vue/test-utils'
import HelpSection from '@/components/HelpSection.vue'
import VueI18n from 'vue-i18n'
import Buefy from 'buefy'

describe('HelpSection.vue', () => {
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

        config.mocks.i18n.$t = (key) => {
            return i18n.messages[key]
        }
        config.mocks.$ga = {
            event: (sentObj) => {
                return sentObj
            }
        }
        wrapper = mount(HelpSection, {
            localVue,
            i18n
        })
        wrapper.setData({
            sixLicensesImg: '<img src="../assets/license-openness-scale.png">',
            modals: {
                1: {
                    status: false,
                    title: 'what-are-cc-licenses'
                },
                2: {
                    status: false,
                    title: 'how-licenses-work'
                },
                3: {
                    status: false,
                    title: 'what-icons-mean'
                },
                4: {
                    status: false,
                    title: 'considerations-before-licensing'
                },
                5: {
                    status: false,
                    title: 'how-formally-license'
                },
                6: {
                    status: false,
                    title: 'six-cc-licenses'
                },
                7: {
                    status: false,
                    title: 'how-licenses-communicated'
                },
                8: {
                    status: false,
                    title: 'what-free-culture-license'
                }
            }
        })
    })

    it('Check if HelpSection.vue component renders without any errors', () => {
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    // Test for DOM elements which must be present
    it('Check if the help section is displayed in the DOM', () => {
        expect(wrapper.contains('.help-section')).toBe(true)
    })
    it('Check if the main ul tag with help links is present', () => {
        expect(wrapper.contains('.help-links')).toBe(true)
    })
    it('Check if all the 8 li tags are present in the DOM', () => {
        expect(wrapper.findAll('.help-link').length).toBe(8)
    })
    it('Check if "What Are Creative Commons Licenses?" modal is rendered to DOM', () => {
        expect(wrapper.contains('ul > li:nth-child(1) > a')).toBe(true)
        wrapper.find('ul > li:nth-child(1) > a').trigger('click')
        expect(wrapper.contains('.modal-content')).toBe(true)
    })
    it('Check if "How do the Licenses Work?" modal is rendered to DOM', () => {
        expect(wrapper.contains('ul > li:nth-child(2) > a')).toBe(true)
        wrapper.find('ul > li:nth-child(2) > a').trigger('click')
        expect(wrapper.contains('.modal-content')).toBe(true)
    })
    it('Check if "What do the Icons Mean?" modal is rendered to DOM', () => {
        expect(wrapper.contains('ul > li:nth-child(3) > a')).toBe(true)
        wrapper.find('ul > li:nth-child(3) > a').trigger('click')
        expect(wrapper.contains('.modal-content')).toBe(true)
    })
    it('Check if "Considerations Before Licensing" modal is rendered to DOM', () => {
        expect(wrapper.contains('ul > li:nth-child(4) > a')).toBe(true)
        wrapper.find('ul > li:nth-child(4) > a').trigger('click')
        expect(wrapper.contains('.modal-content')).toBe(true)
    })
    it('Check if "How do I Formally License my Work?" modal is rendered to DOM', () => {
        expect(wrapper.contains('ul > li:nth-child(5) > a')).toBe(true)
        wrapper.find('ul > li:nth-child(5) > a').trigger('click')
        expect(wrapper.contains('.modal-content')).toBe(true)
    })
    it('Check if "The Six Creative Commons Licenses" modal is rendered to DOM', () => {
        expect(wrapper.contains('ul > li:nth-child(6) > a')).toBe(true)
        wrapper.find('ul > li:nth-child(6) > a').trigger('click')
        expect(wrapper.contains('.modal-content')).toBe(true)
    })
    it('Check if "How are Licenses Communicated?" modal is rendered to DOM', () => {
        expect(wrapper.contains('ul > li:nth-child(7) > a')).toBe(true)
        wrapper.find('ul > li:nth-child(7) > a').trigger('click')
        expect(wrapper.contains('.modal-content')).toBe(true)
    })
    it('Check if " What is a Free Culture License?" modal is rendered to DOM', () => {
        expect(wrapper.contains('ul > li:nth-child(8) > a')).toBe(true)
        wrapper.find('ul > li:nth-child(8) > a').trigger('click')
        expect(wrapper.contains('.modal-content')).toBe(true)
    })

    // Tests for methods
    it('Check if the data has the sixLicensesImg', () => {
        expect(wrapper.vm.sixLicensesImg).toBe('<img src="../assets/license-openness-scale.png">')
    })
    it('Check if the is clickHandler working correctly', () => {
        wrapper.vm.clickHandler(1)
        expect(wrapper.vm.modals[1].status).toBe(true)
    })
    it('Check if the $ga event is working in production', () => {
        process.env.NODE_ENV = 'production'
        expect(wrapper.vm.clickHandler(2)).toStrictEqual({ eventAction: 'clicked', eventCategory: 'HelpSection', eventLabel: 'how-licenses-work' })
        expect(wrapper.vm.modals[2].status).toBe(true)
        expect(wrapper.vm.modals[1].status).toBe(false)
    })

    // Snapshot tests
    it('Check if the HelpSection.vue component has the expected UI', () => {
        expect(wrapper).toMatchSnapshot()
    })
})
