import { mount, createLocalVue } from '@vue/test-utils'
import PersonalizationStep from '@/components/PersonalizationStep'
import Buefy from 'buefy'
import LicenseUtilities from '@/utils/license-utilities'

describe('PersonalizationStep.vue', () => {
    let wrapper

    // Always creates a shallow instance of component
    beforeEach(() => {
        const localVue = createLocalVue()
        localVue.use(Buefy)
        localVue.use(LicenseUtilities)

        wrapper = mount(PersonalizationStep, {
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
