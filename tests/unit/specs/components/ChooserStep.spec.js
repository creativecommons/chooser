import { shallowMount, createLocalVue, config } from '@vue/test-utils'
import ChooserStep from '@/components/ChooserStep'
import VueVocabulary from '@creativecommons/vue-vocabulary/vue-vocabulary.common'
import Vuex from 'vuex'

describe('ChooserStep.vue', () => {
    let wrapper
    let localVue

    // Always creates a shallow instance of component
    beforeEach(() => {
        localVue = createLocalVue()
        localVue.use(Vuex)
        localVue.use(VueVocabulary)
        wrapper = shallowMount(ChooserStep, {
            localVue,
            mocks: {
                $t: key => key
            }
        })
    })

    it('Check if Step.vue component renders without any errors', () => {
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    // It's only for one state, but this should be enough to test if the logic works properly
    it('Check that all computed i18n props return correct values', () => {
        wrapper.setProps({
            disabledDue: '',
            enabled: true,
            reversed: false,
            selected: undefined,
            status: 'active',
            id: 1,
            name: 'BY'
        })

        expect(wrapper.vm.noSelected).toBe('selected')
        expect(wrapper.vm.noText).toBe('stepper.BY.not-selected')
        expect(wrapper.vm.tPrefix).toBe('stepper.BY')
        expect(wrapper.vm.yesSelected).toBe('not-selected')
        expect(wrapper.vm.yesText).toBe('stepper.BY.selected')
    })

    it('Check that all computed i18n props return correct values after true selected', () => {
        wrapper.setProps({
            disabledDue: undefined,
            enabled: true,
            reversed: false,
            selected: true,
            status: 'active',
            id: 1,
            name: 'BY'
        })

        expect(wrapper.vm.radio).toBe('yes')
        expect(wrapper.vm.noSelected).toBe('not-selected')
        expect(wrapper.vm.noText).toBe('stepper.BY.not-selected')
        expect(wrapper.vm.tPrefix).toBe('stepper.BY')
        expect(wrapper.vm.yesSelected).toBe('selected')
        expect(wrapper.vm.yesText).toBe('stepper.BY.selected')
    })

    it('Check that all computed i18n props return correct values after false selected', () => {
        wrapper.setProps({
            disabledDue: undefined,
            enabled: true,
            reversed: false,
            selected: false,
            status: 'active',
            id: 1,
            name: 'BY'
        })

        expect(wrapper.vm.radio).toBe('no')
        expect(wrapper.vm.noSelected).toBe('selected')
        expect(wrapper.vm.noText).toBe('stepper.BY.not-selected')
        expect(wrapper.vm.tPrefix).toBe('stepper.BY')
        expect(wrapper.vm.yesSelected).toBe('not-selected')
        expect(wrapper.vm.yesText).toBe('stepper.BY.selected')
    })

    // Snapshot tests
    it('Check if the Step.vue component has the expected UI if active', () => {
        wrapper.setProps({
            disabledDue: undefined,
            enabled: true,
            reversed: false,
            selected: false,
            name: 'SA',
            status: 'active'
        })

        expect(wrapper).toMatchSnapshot()
    })
    it('Check if the Step.vue component has the expected UI if completed', () => {
        wrapper.setProps({
            status: 'completed',
            disabledDue: undefined,
            enabled: true,
            reversed: false,
            selected: false,
            name: 'SA'
        })
        expect(wrapper).toMatchSnapshot()
    })
    it('Check if the Step.vue component has the expected UI if inactive', () => {
        wrapper.setProps({
            status: 'inactive',
            disabledDue: undefined,
            enabled: true,
            reversed: false,
            selected: false,
            name: 'SA'
        })
        expect(wrapper).toMatchSnapshot()
    })
    it('Check if the Step.vue component has the expected UI if disabled due is set', () => {
        wrapper.setProps({
            disabledDue: 'ND',
            enabled: false,
            reversed: false,
            selected: false,
            name: 'SA',
            status: 'active'
        })
        expect(wrapper).toMatchSnapshot()
    })
    it('Check if the Step.vue component has the expected UI if reversed', () => {
        wrapper.setProps({
            reversed: true,
            disabledDue: undefined,
            enabled: true,
            selected: false,
            name: 'SA',
            status: 'active'
        })
        expect(wrapper).toMatchSnapshot()
    })
    it('Mark up is correctly rendered', () => {
        wrapper.setProps({
            selected: undefined,
            id: 0,
            status: 'active'
        })

        expect(wrapper.element).toMatchSnapshot()
    })

    it('props:selected false', () => {
        wrapper.setProps({
            selected: false,
            name: 'FS',
            id: 0,
            status: 'active'
        })
        expect(wrapper.vm.radio).toBe('no')
    })

    it('props:selected true', () => {
        wrapper.setProps({
            selected: true,
            name: 'FS',
            id: 0,
            status: 'active'
        })

        expect(wrapper.vm.radio).toBe('yes')
    })
})
