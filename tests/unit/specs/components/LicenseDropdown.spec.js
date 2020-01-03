import { createLocalVue, mount } from '@vue/test-utils'
import SelectedLicenseDropdown from '@/components/SelectedLicenseDropdown'
import Buefy from 'buefy'
import LicenseUtilities from '@/utils/license-utilities'

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
        wrapper = mount(SelectedLicenseDropdown, {
            localVue,
            propsData: {
                value: value
            }
        })
    })
    describe('correctly displays initial information and options when mounted', () => {
        it('renders the label', () => {
            expect(wrapper.html()).toContain('Current selection')
        })

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
