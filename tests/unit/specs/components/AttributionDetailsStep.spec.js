import { createLocalVue, mount } from '@vue/test-utils'
import Buefy from 'buefy'
import Vuex from 'vuex'
import AttributionDetailsStep from '@/components/AttributionDetailsStep'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(Buefy)

it('AttributionDetailsStep Component is mounted if status is current', () => {
    const wrapper = mount(AttributionDetailsStep, {
        localVue,
        propsData: {
            status: 'current'

        },
        mocks: {
            $t: key => key,
            $store: {
                state: {
                    attributionDetails: {
                        creatorName: '',
                        creatorProfileUrl: '',
                        workTitle: '',
                        workUrl: ''
                    }
                }
            }
        }

    })
    expect(wrapper.element).toMatchSnapshot()
})
