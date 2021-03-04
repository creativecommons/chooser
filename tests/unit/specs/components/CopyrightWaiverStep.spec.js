import { createLocalVue, mount } from '@vue/test-utils'
import VueVocabulary from '@creativecommons/vue-vocabulary/vue-vocabulary.common'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import CopyrightWaiverStep from '@/components/CopyrightWaiverStep'
import { defaultState, toggleCopyrightCheckbox, allCopyrightClausesChecked } from '../../../../src/store'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(VueVocabulary)
localVue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'en',
  messages: {en: require('@/locales/en.json')},
})

describe('Test the functionality of Computed properties', () => {
  /** @type {import('@vue/test-utils').Wrapper<Vue>} */
  let wrapper
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      state: defaultState,
      mutations: {toggleCopyrightCheckbox},
      getters: {allCopyrightClausesChecked},
    })
    wrapper = mount(CopyrightWaiverStep, {
      localVue,
      i18n,
      propsData: {
        selected: true,
        status: 'active',
        id: 6,
        name: 'CW',
      },
      mocks: {
        $t: key => key,
        $store: store,
      },
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it(`Emits the step "change" event with selected: true when all checkboxes are checked.`, async() => {
    const checkboxes = wrapper.findAll('input[type="checkbox"]')
    await checkboxes.trigger('click')
    const changeEvent = wrapper.emitted().change.pop().pop() // Get the last change event

    expect(changeEvent.selected).toBeTruthy()
  })

  it(`Doesn't emit the step "change" event with selected: true when only some checkboxes are checked.`, async() => {
    // we're only checking the first checkbox here
    const checkbox = wrapper.find('input[type="checkbox"]')
    await checkbox.trigger('click')

    const changeEvent = wrapper.emitted().change.pop().pop() // Get the last change event
    expect(changeEvent.selected).toBeUndefined()
  })

})
