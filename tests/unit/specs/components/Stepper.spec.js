import { createLocalVue, shallowMount } from '@vue/test-utils'
import Buefy from 'buefy'
import Vuex from 'vuex'
import Stepper from '@/components/Stepper'

const localVue = createLocalVue()
 
localVue.use(Vuex)
localVue.use(Buefy)

describe('Stepper Component Unit Tests', () => {
    let wrapper,store

    beforeEach(() => {

        store = new Vuex.Store({});

        wrapper = shallowMount(Stepper, {
            mocks: {
                $t: key => key
            }, 
            store,
            localVue,    
        });
    })

    afterEach(()=> {
        wrapper.destroy()
    })

    it('Stepper Component is initially rendered correctly', () =>{
        expect(wrapper.element).toMatchSnapshot()
    })
})