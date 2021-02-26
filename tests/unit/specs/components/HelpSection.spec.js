import { mount, createLocalVue } from '@vue/test-utils'
import HelpSection from '@/components/HelpSection.vue'
import VueVocabulary from '@creativecommons/vue-vocabulary/vue-vocabulary.common'

describe('HelpSection.vue', () => {
  let wrapper

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(VueVocabulary)
    wrapper = mount(HelpSection, {
      localVue,
      mocks: {
        $t: key => key,
      },
      data: () => ({
        sixLicensesImg: '',
        modals: [
          'what-are-cc-licenses',
          'how-licenses-work',
          'what-icons-mean',
          'considerations-before-licensing',
          'how-formally-license',
          'six-cc-licenses',
          'how-licenses-communicated',
          'what-free-culture-license',
          'look-earlier-license-ver',
        ],
      }),
    })
  })

  // Test for DOM elements which must be present
  it('Check if the help section is displayed in the DOM', () => {
    expect(wrapper.find('.help-section').exists()).toBe(true)
  })
  it('Check if the main ul tag with help links is present', () => {
    expect(wrapper.find('.help-links').exists()).toBe(true)
  })
  it('Check if all the 9 li tags are present in the DOM', () => {
    expect(wrapper.findAll('.help-link').length).toBe(9)
  })
  it('Check if modals are rendered to DOM', () => {
    const modalId = 0
    const modalButton = `ul > li:nth-child(${modalId + 1}) > button`
    expect(wrapper.find(modalButton).exists()).toBe(true)
    wrapper.find(modalButton).trigger('click')
    expect(wrapper.vm.openModal).toEqual(modalId)
  })
})
