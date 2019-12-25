import { mount } from '@vue/test-utils'
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
    describe('correctly displays initial information and options when mounted', () => {
        it('renders the label', () => {
            const wrapper = mount(SelectedLicenseDropdown, {
                propsData: {
                    value
                }
            })
            expect(wrapper.html()).toContain('Current selection')
        })

        it('initializes with base license names', () => {
            const wrapper = mount(SelectedLicenseDropdown, {
                propsData: {
                    value
                }
            })
            expect(wrapper.vm.$props.value.shortName).toEqual('CC BY 4.0')
            expect(wrapper.vm.$props.value.fullName).toEqual('Attribution 4.0 International')
            expect(wrapper.html()).toContain('CC BY 4.0')
            expect(wrapper.findAll('option')).toHaveLength(7)
        })
    })
})
