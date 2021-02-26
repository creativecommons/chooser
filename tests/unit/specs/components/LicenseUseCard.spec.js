import { shallowMount, createLocalVue } from '@vue/test-utils'
import LicenseUseCard from '@/components/LicenseUseCard'
import VueVocabulary from '@creativecommons/vue-vocabulary/vue-vocabulary.common'

describe('LicenseUseCard.vue', () => {
  let wrapper
  let localVue
  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(VueVocabulary)
    wrapper = shallowMount(LicenseUseCard, {
      localVue,
      mocks: {
        $t: key => key,
        $store: {
          commit: jest.fn(),
        },
      },
    })
  })

  it('Renders the heading and instructions', () => {
    const heading = wrapper.find('h3')
    expect(heading.text()).toEqual('license-use.heading')
    const instructions = wrapper.find('.license-use-instructions')
    expect(instructions.text()).toEqual('license-use.common-instructions')
  })

  it('Renders Web and Print/Media tabs', () => {
    const topTabs = wrapper.findAll('.top-tabs > tab-stub')
    expect(topTabs.length).toEqual(2)
    expect(topTabs.at(0).text()).toEqual('license-use.web-instructions')
    expect(topTabs.at(1).text()).toEqual('license-use.print-media-instructions')
    expect(wrapper.vm.copyTarget).toEqual('.richtext')
  })
})
