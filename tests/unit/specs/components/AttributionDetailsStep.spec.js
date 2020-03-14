import { createLocalVue, mount } from '@vue/test-utils'
import Buefy from 'buefy'
import Vuex from 'vuex'
import AttributionDetailsStep from '@/components/AttributionDetailsStep'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(Buefy)

describe('AttributionDetailsStep Component Rendering', () => {
    
        const wrapper = mount(AttributionDetailsStep, {
            localVue,
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
    
    it('Component not mounted if status is previous', () =>{
        wrapper.setProps({status : 'previous'})
        console.log(wrapper.html())
        console.log(wrapper.find('.step-content'))
        expect(wrapper.find('.step-actions').exists()).toBeFalsy()
    })

    it('Component not mounted if status is inactive', () =>{
        wrapper.setProps({status : 'inactive'})
        expect(wrapper.find('.step-actions').exists()).toBeFalsy()
    })

    it('Component mounted if status is current', () =>{
        wrapper.setProps({status : 'current'})
        expect(wrapper.element).toMatchSnapshot()
    })
})

