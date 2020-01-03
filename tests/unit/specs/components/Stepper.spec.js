import { shallowMount, createLocalVue } from '@vue/test-utils'
import Stepper from '@/components/Stepper'
import Buefy from 'buefy'
import LicenseUtilities from '@/utils/license-utilities'

describe('Stepper.vue', () => {
    let wrapper

    // Always creates a shallow instance of component
    beforeEach(() => {
        const localVue = createLocalVue()
        localVue.use(Buefy)
        localVue.use(LicenseUtilities)

        wrapper = shallowMount(Stepper, {
            localVue,
            propsData: {
                value: {
                    shortName: 'CC BY 4.0',
                    fullName: 'Attribution 4.0 International'
                }
            }
        })
    })

    // Snapshot tests
    it('has the expected UI', () => {
        expect(wrapper).toMatchSnapshot()
    })
})
