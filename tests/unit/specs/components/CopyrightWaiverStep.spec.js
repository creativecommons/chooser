import { createLocalVue, mount } from '@vue/test-utils'
import VueVocabulary from '@creativecommons/vue-vocabulary/vue-vocabulary.common'
import Vuex from 'vuex'
import CopyrightWaiverStep from '@/components/CopyrightWaiverStep'
import Vue from 'vue'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(VueVocabulary)

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
                $t: key => key
            },
            propsData: {
                id: 6,
                name: 'CW'
            }
        })
    })

    afterEach(() => {
        wrapper.destroy()
    })

    it('Step Actions block mounted if status is active', () => {
        wrapper.setProps({ status: 'active', id: 6, name: 'CW' })

        expect(wrapper.find('.step-actions').exists()).toBeTruthy()
        expect(wrapper.vm.copyrightWaiverAgreed).toBe(false)
    })
})

describe('Test the functionality of Computed properties', () => {
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
            propsData: {
                selected: true,
                status: 'active',
                id: 6,
                name: 'CW'
            },
            mocks: {
                $t: key => key
            }
        })
    })

    afterEach(() => {
        wrapper.destroy()
    })

    it('User checks confirmed then checks agreed', () => {
        const checkbox1 = wrapper.findAll('input[type="checkbox"]').at(1)
        checkbox1.setChecked()

        const checkbox = wrapper.findAll('input[type="checkbox"]').at(0)
        checkbox.setChecked()
        Vue.nextTick()
        const emittedChange = wrapper.emitted().change[0][0]
        expect(emittedChange.id).toEqual(6)
        expect(emittedChange.name).toEqual('CW')
        expect(wrapper.vm.copyrightWaiverAgreed).toBe(true)
    })

    it('User checks agreed and then checks confirmed', () => {
        const checkbox = wrapper.findAll('input[type="checkbox"]').at(0)
        checkbox.setChecked()

        const checkbox1 = wrapper.findAll('input[type="checkbox"]').at(1)
        checkbox1.setChecked()
        Vue.nextTick()
        const emittedChange = wrapper.emitted().change[1][0]

        expect(emittedChange.name).toEqual('CW')
        expect(emittedChange.id).toEqual(6)
        expect(emittedChange.selected).toEqual(true)

        expect(wrapper.vm.copyrightWaiverConfirmed).toBe(true)
    })

    it('User unchecks agreed', () => {
        const checkbox = wrapper.findAll('input[type="checkbox"]').at(0)
        checkbox.setChecked()
        checkbox.setChecked(false)
        Vue.nextTick()

        const emittedChange = wrapper.emitted().change[1][0]
        expect(emittedChange.name).toEqual('CW')
        expect(emittedChange.id).toEqual(6)
        expect(emittedChange.selected).toEqual(undefined)
        expect(wrapper.vm.copyrightWaiverAgreed).toBe(false)
    })

    it('User unchecks confirmed', () => {
        const checkbox = wrapper.findAll('input[type="checkbox"]').at(1)

        checkbox.setChecked()
        checkbox.setChecked(false)
        Vue.nextTick()

        const emittedChange = wrapper.emitted().change[1][0]
        expect(emittedChange.name).toEqual('CW')
        expect(emittedChange.id).toEqual(6)
        expect(emittedChange.selected).toEqual(undefined)
        expect(wrapper.vm.copyrightWaiverConfirmed).toBe(false)
    })
})
