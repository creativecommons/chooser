import { shallowMount, createLocalVue, config } from '@vue/test-utils'
import Step from '@/components/Step'
import Buefy from 'buefy'
import VueI18n from 'vue-i18n'
import Vuex from 'vuex'
import Vue from 'vue'
import store from '@/store'

describe('Step.vue', () => {
    let wrapper
    let localVue

    // Always creates a shallow instance of component
    beforeEach(() => {
      localVue = createLocalVue()
      localVue.use(Vuex)
      localVue.use(Buefy)
      Vue.use(VueI18n)
      const messages = require('@/locales/en.json')
      const i18n = new VueI18n({
          locale: 'en',
          fallbackLocale: 'en',
          messages: messages
      })
  
      config.mocks.i18n = i18n
  
      config.mocks.$t = key => {}
      wrapper = shallowMount(Step, {
          store,
          localVue
      })
    })

    it('Check if Step.vue component renders without any errors', () => {
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    // It's only for one state, but this should be enough to test if the logic works properly
    it('Check that all computed i18n props return correct values', () => {
      wrapper.setProps({
        disabledDue: "",
        enabled: true,
        reversed: false,
        selected: undefined,
        status: "current",
        stepId: 1,
        stepName: "BY"
      })

      expect(wrapper.vm.cardText).toBe('stepper.BY.not-selected')
      expect(wrapper.vm.noSelected).toBe('selected')
      expect(wrapper.vm.noText).toBe('stepper.BY.not-selected')
      expect(wrapper.vm.question).toBe('stepper.BY.question')
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
        status: "current",
        stepId: 1,
        stepName: "BY"
      })

      expect(wrapper.vm.radio).toBe("yes")
      expect(wrapper.vm.cardText).toBe('stepper.BY.selected')
      expect(wrapper.vm.noSelected).toBe('not-selected')
      expect(wrapper.vm.noText).toBe('stepper.BY.not-selected')
      expect(wrapper.vm.question).toBe('stepper.BY.question')
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
        status: "current",
        stepId: 1,
        stepName: "BY"
      })

      expect(wrapper.vm.radio).toBe("no")
      expect(wrapper.vm.cardText).toBe('stepper.BY.not-selected')
      expect(wrapper.vm.noSelected).toBe('selected')
      expect(wrapper.vm.noText).toBe('stepper.BY.not-selected')
      expect(wrapper.vm.question).toBe('stepper.BY.question')
      expect(wrapper.vm.tPrefix).toBe('stepper.BY')
      expect(wrapper.vm.yesSelected).toBe('not-selected')
      expect(wrapper.vm.yesText).toBe('stepper.BY.selected')
    })

    // Snapshot tests
    it('Check if the Step.vue component has the expected UI', () => {
        expect(wrapper).toMatchSnapshot()
    })
})