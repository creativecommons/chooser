import { createLocalVue, mount } from '@vue/test-utils'
import Buefy from 'buefy'
import Vuex from 'vuex'
import CopyrightWaiverStep from '@/components/CopyrightWaiverStep'

const localVue = createLocalVue()
 
localVue.use(Vuex)
localVue.use(Buefy)

describe('CopyrightWaiver Step: Check conditional rendering of markup', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(CopyrightWaiverStep, {
            localVue,
            data() {
                return {
                    agreed: false,
                    confirmed: false
                }
            },
            mocks: {
                $t: key => key,
            }
        })
    })

    afterEach(()=> {
        wrapper.destroy()
    })

    it('Component not mounted if status is inactive', () =>{
        wrapper.setProps({
            selected: undefined,
            status : 'inactive',
            stepId: 6,
            stepName: 'CW', 
        })

       expect(wrapper.find('.step-description').exists()).toBeFalsy()
       expect(wrapper.find('.step-actions').exists()).toBeFalsy()
    })

    it('Step Description block mounted if status is previous', () =>{
        wrapper.setProps({status : 'previous'})
        
        expect(wrapper.find('.step-description').exists()).toBeTruthy()
        expect(wrapper.find('.step-actions').exists()).toBeFalsy()
    })

   it('Step Actions block mounted if status is current', () =>{
        wrapper.setProps({status : 'current'})

        expect(wrapper.find('.step-description').exists()).toBeFalsy()
        expect(wrapper.find('.step-actions').exists()).toBeTruthy()
        expect(wrapper.vm.copyrightWaiverAgreed).toBe(false)
    })

})

describe('Test functionality of computed properties', () => {
    let wrapper 

    beforeEach(() => {
        wrapper = mount(CopyrightWaiverStep, {
            localVue,
            propsData:{
                selected: undefined,
            status : 'current',
            stepId: 6,
            stepName: 'CW', 
            },
            mocks: {
                $t: key => key,
            }
        })
    })

    afterEach(()=> {
        wrapper.destroy()
    })

    it('User checks agreed with confirmed checked', () => {
        wrapper.setData({
            agreed: false,
            confirmed: true
        })

        const checkbox = wrapper.findAll('input[type="checkbox"]').at(0)
        checkbox.setChecked();

        expect(wrapper.emitted().change[0]).toStrictEqual(['CW', 6, true])
    })

    it('User checks confirmed with agreed checked', () => {
        wrapper.setData({
            agreed: true,
            confirmed: false
        })

        const checkbox = wrapper.findAll('input[type="checkbox"]').at(1)
        checkbox.setChecked();

        expect(wrapper.emitted().change[0]).toStrictEqual(['CW', 6, true])
    })

})