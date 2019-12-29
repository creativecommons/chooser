import { shallowMount, createLocalVue } from '@vue/test-utils'
import SelectionStep from '@/components/SelectionStep'
import Buefy from 'buefy'

describe('SelectionStep.vue', () => {
    let wrapper

    // Always creates a shallow instance of component
    beforeEach(() => {
        const localVue = createLocalVue()
        localVue.use(Buefy)

        wrapper = shallowMount(SelectionStep, {
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
