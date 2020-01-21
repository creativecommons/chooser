import { mount, createLocalVue } from '@vue/test-utils'
import AttributionDetailsStep from '@/components/AttributionDetailsStep'
import Buefy from 'buefy'
import LicenseUtilities from '@/utils/license-utilities'

describe('AttributionDetailsStep.vue', () => {
    let wrapper

    // Always creates a shallow instance of component
    beforeEach(() => {
        const localVue = createLocalVue()
        localVue.use(Buefy)
        localVue.use(LicenseUtilities)

        wrapper = mount(AttributionDetailsStep, {
            localVue,
            propsData: {
                value: {
                    authorName: '',
                    workTitle: '',
                    workUrl: '',
                    sourceWorkUrl: ''
                }
            }
        })
    })

    // Snapshot tests
    it('has the expected UI', () => {
        expect(wrapper).toMatchSnapshot()
    })
})
