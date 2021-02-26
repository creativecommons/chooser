import { createLocalVue, shallowMount } from '@vue/test-utils'
import StepHeader from '@/components/StepHeader'
import VueVocabulary from '@creativecommons/vue-vocabulary/vue-vocabulary.common'
import Vue from 'vue'
import { initialSteps } from '@/utils/steps'

const steps = [...initialSteps]

describe('StepHeader.vue', () => {
  let wrapper

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(VueVocabulary)
    wrapper = shallowMount(StepHeader, {
      localVue,
      propsData: {
        step: steps[0],
      },
      mocks: {
        $t: key => key,
      },
    })
  })
  describe('renders correctly', () => {
    it('renders correctly for first step', () => {
      expect(wrapper.findComponent(StepHeader).exists()).toBe(true)
      const title = wrapper.find('.step-header__title')
      expect(title.text()).toEqual('stepper.FS.question')
      const caption = wrapper.find('.step-header__caption')
      expect(caption.exists()).toBe(false)
    })
    it('renders correctly when first step is selected completed', async() => {
      await wrapper.setProps({ step: { ...steps[0], status: 'completed', selected: true } })
      const title = wrapper.find('.step-header__title')
      expect(title.text()).toEqual('stepper.FS.heading')
      const caption = wrapper.find('.step-header__caption')
      expect(caption.text()).toEqual('stepper.FS.selected')
    })
    it('emits activate event when clicked', async() => {
      const id = 0
      wrapper.setProps({ step: { ...steps[id], status: 'completed' } })
      await wrapper.find('.step-header').trigger('click')
      Vue.nextTick()
      expect(wrapper.emitted().activate[0][0]).toEqual(id)
    })
  })
})
