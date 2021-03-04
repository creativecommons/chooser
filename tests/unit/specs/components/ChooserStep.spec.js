import { shallowMount, createLocalVue } from '@vue/test-utils'
import ChooserStep from '@/components/ChooserStep'
import VueVocabulary from '@creativecommons/vue-vocabulary/vue-vocabulary.common'

describe('ChooserStep.vue', () => {
  let wrapper
  let localVue

  // Always creates a shallow instance of component
  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(VueVocabulary)
    wrapper = shallowMount(ChooserStep, {
      localVue,
      mocks: {
        $t: key => key,
      },
    })
  })

  // It's only for one state, but this should be enough to test if the logic works properly
  it('Check that all computed i18n props return correct values', async () => {
    await wrapper.setProps({
      disabledDue: '',
      enabled: true,
      reversed: false,
      selected: undefined,
      status: 'active',
      id: 1,
      name: 'BY',
    })

    expect(wrapper.vm.noSelected).toBe('selected')
    expect(wrapper.vm.noText).toBe('stepper.BY.not-selected')
    expect(wrapper.vm.tPrefix).toBe('stepper.BY')
    expect(wrapper.vm.yesSelected).toBe('not-selected')
    expect(wrapper.vm.yesText).toBe('stepper.BY.selected')
  })

  it('Check that all computed i18n props return correct values after true selected', async () => {
    await wrapper.setProps({
      disabledDue: undefined,
      enabled: true,
      reversed: false,
      selected: true,
      status: 'active',
      id: 1,
      name: 'BY',
    })

    expect(wrapper.vm.radio).toBe('yes')
    expect(wrapper.vm.noSelected).toBe('not-selected')
    expect(wrapper.vm.noText).toBe('stepper.BY.not-selected')
    expect(wrapper.vm.tPrefix).toBe('stepper.BY')
    expect(wrapper.vm.yesSelected).toBe('selected')
    expect(wrapper.vm.yesText).toBe('stepper.BY.selected')
  })

  it('Check that all computed i18n props return correct values after false selected', async () => {
    await wrapper.setProps({
      disabledDue: undefined,
      enabled: true,
      reversed: false,
      selected: false,
      status: 'active',
      id: 1,
      name: 'BY',
    })

    expect(wrapper.vm.radio).toBe('no')
    expect(wrapper.vm.noSelected).toBe('selected')
    expect(wrapper.vm.noText).toBe('stepper.BY.not-selected')
    expect(wrapper.vm.tPrefix).toBe('stepper.BY')
    expect(wrapper.vm.yesSelected).toBe('not-selected')
    expect(wrapper.vm.yesText).toBe('stepper.BY.selected')
  })

  it('props:selected false', () => {
    wrapper.setProps({
      selected: false,
      name: 'FS',
      id: 0,
      status: 'active',
    })
    expect(wrapper.vm.radio).toBe('no')
  })

  it('props:selected true', async () => {
    await wrapper.setProps({
      selected: true,
      name: 'FS',
      id: 0,
      status: 'active',
    })

    expect(wrapper.vm.radio).toBe('yes')
  })
})
