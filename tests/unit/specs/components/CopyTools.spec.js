import { mount, createLocalVue } from '@vue/test-utils'
import CopyTools from '@/components/CopyTools.vue'
import VueVocabulary from '@creativecommons/vue-vocabulary/vue-vocabulary.common'

describe('CopyTools.vue', () => {
  let wrapper
  let localVue
  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(VueVocabulary)

    wrapper = mount(CopyTools, {
      localVue,
      mocks: {
        $t: key => key,
        $store: {
          commit: jest.fn(),
        },
      },
    })
  })

  it('toggle labels are rendered and changed correctly', async() => {
    const toggle = wrapper.find('.toggle')
    expect(toggle.findAll('.toggle-label').length).toEqual(2)
    expect(toggle.find('#label-short').classes('selected')).toBe(true)
    expect(toggle.find('#label-full').classes('selected')).toBe(false)
    await toggle.find('input').trigger('click')
    expect(wrapper.vm.$store.commit).toHaveBeenCalled()
    expect(toggle.find('#label-short').classes('selected')).toBe(false)
    expect(toggle.find('#label-full').classes('selected')).toBe(true)
  })

  it('copy button works correctly', async() => {
    const copyButton = wrapper.find('button')
    expect(copyButton.text()).toEqual('license-use.copy-label')
    await copyButton.trigger('click')
    expect(copyButton.text()).toEqual('license-use.copied-label')
  })
})
