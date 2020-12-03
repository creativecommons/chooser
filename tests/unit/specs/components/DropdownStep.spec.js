import { createLocalVue, mount } from '@vue/test-utils'
import Buefy from 'buefy'
import Vuex from 'vuex'
import DropdownStep from '@/components/DropdownStep'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(Buefy)

describe('DropdownStep', () => {
    let wrapper, store, getters, mutations

    beforeEach(() => {
        getters = {
            fullName: jest.fn().mockReturnValue(undefined),
            shortName: jest.fn().mockReturnValue(undefined)
        }

        mutations = {
            updateAttributesFromShort: jest.fn()
        }

        store = new Vuex.Store({
            getters,
            mutations
        })

        wrapper = mount(DropdownStep, {
            localVue,
            propsData: {
                stepId: 5,
                status: 'active'
            },
            mocks: {
                $t: key => key
            },
            store
        })
    })

    afterEach(() => {
        wrapper.destroy()
    })

    it('Checks conditional rendering of markup: status is active', () => {
        expect(wrapper.find('.step-actions').exists()).toBeTruthy()
    })

    it('Checks methods: updateSelected', () => {
        const options = wrapper.find('select').findAll('option')

        options.at(1).setSelected()
        const emittedChange = wrapper.emitted().change[0][0]
        expect(emittedChange.name).toEqual('DD')
        expect(emittedChange.selected).toEqual(true)
    })
})

describe('DropdownStep', () => {
    let wrapper, store, getters

    beforeEach(() => {
        getters = {
            fullName: jest.fn().mockReturnValue('CC 1.0 Universal')
        }

        store = new Vuex.Store({
            getters
        })

        wrapper = mount(DropdownStep, {
            localVue,
            mocks: {
                $t: key => key
            },
            store
        })
    })

    afterEach(() => {
        wrapper.destroy()
    })

    it('Checks conditional rendering of markup: status  is inactive', () => {
        wrapper.setProps({
            stepId: 5,
            status: 'inactive'
        })
        expect(wrapper.find('.step-description').exists()).toBeFalsy()
        expect(wrapper.find('.step-actions').exists()).toBeFalsy()
    })
})
