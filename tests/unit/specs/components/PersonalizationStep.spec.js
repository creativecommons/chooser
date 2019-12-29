import { mount, createLocalVue } from '@vue/test-utils'
import PersonalizationStep from '@/components/PersonalizationStep'
import Buefy from 'buefy'

describe('PersonalizationStep.vue', () => {
    let wrapper

    // Always creates a shallow instance of component
    beforeEach(() => {
        const localVue = createLocalVue()
        localVue.use(Buefy)

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
