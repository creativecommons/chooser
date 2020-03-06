/* eslint-disable eol-last */
import { mount, createLocalVue, config } from '@vue/test-utils'
import LicenseCode from '@/components/LicenseCode.vue'
import VueI18n from 'vue-i18n'
import Vuex from 'vuex'

describe('LicenseCode.vue', () => {
    let wrapper
    let getters
    let state
    let store

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
            const i18n = new VueI18n({
                locale: 'en',
                fallbackLocale: 'en',
                messages: messages
            })

            config.mocks.i18n = i18n

            config.mocks.$t = (key) => {
                return i18n.messages[key]
            }
            wrapper = mount(LicenseCode, {
                localVue,
                store
            })
        })
        // Test for DOM elements which must be present
    it('Has the main p tag', () => {
        expect(wrapper.contains('.license-text')).toBe(true)
    })

    // Tests for computed props and methods
    it('renders without any errors', () => {
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
    it('Check if the byString function returns the correct text', () => {
        expect(wrapper.vm.byString).toBe('license-use.richtext.by')
    })
    it('Check if the creatorSpan function returns the correct text', () => {
        expect(wrapper.vm.creatorSpan).toBe('<span rel="cc:attributionName">J Doe</span>')
    })
    it('Check if the creatorName function returns the correct text', () => {
        expect(wrapper.vm.creatorName).toBe('J Doe')
    })
    it('Check if the creatorProfileUrl function returns the correct text', () => {
        expect(wrapper.vm.creatorProfileUrl).toBe('www.author.com')
    })
    it('Check if the workTitle function returns the correct text', () => {
        expect(wrapper.vm.workTitle).toBe('My work')
    })
    it('Check if the workUrl function returns the correct text', () => {
        expect(wrapper.vm.workUrl).toBe('www.author.com/pic.jpg')
    })
    it('Check if the isWeb function returns the correct boolean', () => {
        wrapper.setProps({
            attributionType: {
                type: String,
                default: 'web'
            }
        })
        expect(wrapper.vm.isWeb).toBe(false)
    })

    // Snapshot tests
    it('has the expected UI', () => {
        expect(wrapper).toMatchSnapshot()
    })
})