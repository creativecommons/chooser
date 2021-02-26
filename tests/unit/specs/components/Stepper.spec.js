import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Stepper from '@/components/Stepper'
import VueVocabulary from '@creativecommons/vue-vocabulary/vue-vocabulary.common'
import Vue from 'vue'
import store from '@/store'
import VueScrollTo from 'vue-scrollto'

function getStepId(wrapper, name) {
  return wrapper.vm.steps.filter((step) => { return step.name === name })[0].id
}
async function setStepSelected(wrapper, name, selected) {
  const stepId = getStepId(wrapper, name)
  await wrapper.vm.changeStepSelected({ name, id: stepId, selected })
}

async function advanceStep(wrapper, actions) {
  for (const [name, data] of Object.entries(actions)) {
    let selected, license
    if (Array.isArray(data)) {
      [selected, license] = data
    } else {
      selected = data
    }
    const stepId = getStepId(wrapper, name)
    if (name === 'DD') {
      wrapper.vm.$store.commit('updateAttributesFromShort', license)
      await Vue.nextTick()
    }
    wrapper.vm.changeStepSelected({ name, id: stepId, selected })
    await Vue.nextTick()
    wrapper.vm.navigate({ direction: 'next', name })
  }
}

let wrapper
let localVue

function setUp() {
  localVue = createLocalVue()
  localVue.use(Vuex)
  localVue.use(VueVocabulary)
  localVue.use(VueScrollTo)

  wrapper = shallowMount(Stepper, {
    store,
    localVue,
    mocks: {
      $t: key => key,
    },
    propsData: {
      value: 0,
    },
  })
  wrapper.vm.$on('input', (newVal) => {
    wrapper.setProps({ value: newVal })
  })
}

beforeEach(() => setUp())

describe('Stepper.vue', () => {
  describe('renders correctly', () => {
    it('is called', () => {
      expect(wrapper.findComponent(Stepper).exists()).toBe(true)
    })
    it('has expected UI on ND step', async() => {
      await advanceStep(wrapper, { FS: false, BY: true, NC: false })
      const stepContainers = wrapper.findAll('.step-container')
      expect(stepContainers.length).toEqual(6)
      const activeStep = wrapper.findAll('.step-container.active')
      expect(activeStep.length).toEqual(1)
    })
    it('has expected UI on CW step after DD', async() => {
      await advanceStep(wrapper, { FS: true, DD: [true, 'CC0 1.0'] },
      )
    })
  })

  describe('FirstStep interactions', () => {
    it('choosing Yes sets 3 steps visible: FS, Dropdown and AttributionDetails, opens DD', async() => {
      await advanceStep(wrapper, { FS: true })
      const steps = wrapper.findAll('.step-container')
      expect(steps.length).toEqual(3)
      expect(steps.at(0).classes('completed')).toBe(true)
      expect(wrapper.find('.active').classes('DD')).toBe(true)
    })
    it('choosing No sets 6 steps visible: FS, BY, NC, ND, SA and AttributionDetails, opens BY', () => {
      setStepSelected(wrapper, 'FS', false)
      wrapper.find('stepnavigation-stub').vm.$emit('navigate', { direction: 'next', name: 'FS' })
      Vue.nextTick()
      const steps = wrapper.findAll('.step-container')
      expect(steps.length).toEqual(6)
      expect(wrapper.vm.activeStepId).toEqual(1)
    })
  })

  describe('DropdownStep interactions', () => {
    beforeEach(async() => {
      // setUp()
      await advanceStep(wrapper, { FS: true })
    })
    it('selecting CC0 makes 4 steps visible and opens Copyright Waiver step', async() => {
      const shortName = 'CC0 1.0'
      await advanceStep(wrapper, { DD: [true, shortName] })
      const steps = wrapper.findAll('.step-container')
      expect(steps.length).toEqual(4)
      expect(wrapper.find('.active').classes()).toContain('CW')
    })
    it('selecting a BY license and clicking Next makes 3 steps visible and opens AttributionDetails step', async() => {
      await advanceStep(wrapper, { DD: [true, 'CC BY 4.0'] })
      const steps = wrapper.findAll('.step-container')
      expect(steps.length).toEqual(3)
      expect(wrapper.find('.active').classes()).toContain('AD')
    })
  })

  describe('Steps are disabled correctly', () => {
    it('selecting CC0 makes NC, ND, SA disabled', async() => {
      await advanceStep(wrapper, { FS: false, BY: false })

      const steps = wrapper.findAll('.step-container')
      expect(steps.length).toEqual(7)
      const disabledSteps = wrapper.findAll('.step-container.disabled')
      expect(disabledSteps.length).toEqual(3)
      expect(wrapper.find('.NC').classes()).toContain('disabled')
      expect(wrapper.find('.ND').classes()).toContain('disabled')
      expect(wrapper.find('.SA').classes()).toContain('disabled')
    })
    it('selecting ND makes SA  license and clicking Next makes 3 steps visible and opens AttributionDetails step', async() => {
      await advanceStep(wrapper, { FS: false, BY: true, NC: true, ND: true })

      const steps = wrapper.findAll('.step-container')
      expect(steps.length).toEqual(6)
      const disabledSteps = wrapper.findAll('.step-container.disabled')
      expect(disabledSteps.length).toEqual(1)
      expect(wrapper.find('.SA').classes()).toContain('disabled')
    })
  })
})
