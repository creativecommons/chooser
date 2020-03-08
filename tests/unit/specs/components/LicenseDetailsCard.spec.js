import { mount, createLocalVue, config } from '@vue/test-utils'
import LicenseDetailsCard from '@/components/LicenseDetailsCard.vue'
import { licenseSlug } from '@/utils/license-utilities'
import VueI18n from 'vue-i18n'
import Vuex from 'vuex'

describe('LicenseDetailsCard.vue', () => {
    let wrapper
    let getters
    let state
    let store
    let i18n

    // Always creates a shallow instance of component
    beforeEach(() => {
            const localVue = createLocalVue()
            localVue.use(VueI18n)
            localVue.use(Vuex)
            state = {
                attributionDetails: {
                    creatorName: 'J Doe',
                    creatorProfileUrl: 'www.author.com',
                    workTitle: 'My work',
                    workUrl: 'www.author.com/pic.jpg'
                }
            }
            getters = {
                shortName: state => {
                    return 'foo'
                },
                fullName: state => {
                    return 'fooBar'
                },
                licenseUrl: state => (mode) => {
                    return 'http://example.com'
                },
                iconsList: state => {
                    return ['by', 'sa']
                }
            }
            store = new Vuex.Store({
                state,
                getters
            })
            const messages = require('@/locales/en.json')
            i18n = new VueI18n({
                locale: 'en',
                fallbackLocale: 'en',
                messages: messages
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
        // Test for DOM elements which must be present
    it('Has the main div tag', () => {
        expect(wrapper.contains('.selected-license-card')).toBe(true)
    })
    it('Has the h3 tag', () => {
        expect(wrapper.contains('h3')).toBe(true)
    })
    it('Has the h4 tag', () => {
        expect(wrapper.contains('h4')).toBe(true)
    })
    it('Has the a tag', () => {
        expect(wrapper.contains('.license-name')).toBe(true)
    })
    it('Has the p tag', () => {
        expect(wrapper.contains('.chooser-selected-description')).toBe(true)
    })
    it('Has the section tag', () => {
        expect(wrapper.contains('.license-visual-info')).toBe(true)
    })
    it('Has the ul tag', () => {
        expect(wrapper.contains('.license-list')).toBe(true)
    })
    it('Has the li tag', () => {
        expect(wrapper.contains('li')).toBe(true)
    })
    it('Has the span tag', () => {
        expect(wrapper.contains('.readable-string')).toBe(true)
    })

    // Tests for computed props and methods
    it('renders without any errors', () => {
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
    it('Check if the slug function returns the correct text', () => {
        expect(wrapper.vm.slug).toBe(licenseSlug('foo'))
    })
    it('Check if the licenseKey function returns the correct text', () => {
        expect(wrapper.vm.licenseKey).toBe(`license-details-card.full-description.${licenseSlug('foo')}`)
    })
    it('Check if the licenseDescription function returns the correct text', () => {
        expect(wrapper.vm.licenseDescription).toBe(`${licenseSlug('foo')}-description`)
    })

    // Snapshot tests
    it('has the expected UI', () => {
        expect(wrapper).toMatchSnapshot()
    })
})
