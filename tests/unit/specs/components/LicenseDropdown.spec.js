import { createLocalVue, mount } from '@vue/test-utils'
import LicenseDropdown from '@/components/LicenseDropdown.vue'
import VueI18n from 'vue-i18n'
import Buefy from 'buefy'

describe('LicenseDropdown.vue', () => {
    let wrapper
    let getters
    let storeMock

    beforeEach(() => {
        const localVue = createLocalVue()
        localVue.use(VueI18n)
        localVue.use(Buefy)

        getters = {
            shortName: () => {
                return 'CC BY-SA 4.0'
            },
            fullName: () => {
                return 'Attribution-ShareAlike 4.0 International'
            }
        }
        storeMock = {
            commit: jest.fn(),
            getters: getters
        }

        const options = {
            mocks: {
                $store: storeMock,
                $t: (key) => key
            },
            localVue
        }
        wrapper = mount(LicenseDropdown, options)
    })

    it('Check if LicenseDropdown.vue component renders without any errors', () => {
        expect(wrapper.isVueInstance()).toBe(true)
    })

    it('Checks methods: setCurrentLicense', () => {
        const options = wrapper.find('select').findAll('option')
        options.at(1).setSelected()
        const SELECTED_SHORT = options.at(1).text()
        expect(storeMock.commit).toHaveBeenCalledWith('updateAttributesFromShort', SELECTED_SHORT)

        expect(wrapper.emitted().input).toBeTruthy()
    })

    it('Check if the LicenseDropdown.vue component has the expected UI', () => {
        expect(wrapper).toMatchSnapshot()
    })
})
