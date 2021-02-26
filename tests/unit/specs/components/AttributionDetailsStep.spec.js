import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import AttributionDetailsStep from '@/components/AttributionDetailsStep'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('AttributionDetailsStep Component Rendering', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(AttributionDetailsStep, {
      localVue,
      mocks: {
        $t: key => key,
        $store: {
          state: {
            attributionDetails: {
              creatorName: '',
              creatorProfileUrl: '',
              workTitle: '',
              workUrl: '',
            },
            currentLicenseAttributes: {},
          },
        },
      },

    })
  })

  afterEach(() => {
    wrapper.destroy()
  })
})

describe('Store is updated when a user provides input', () => {
  let mutations, state, wrapper, store

  beforeEach(() => {
    mutations = {
      setCreatorName: jest.fn(),
      setCreatorProfileUrl: jest.fn(),
      setWorkTitle: jest.fn(),
      setWorkUrl: jest.fn(),
    }

    state = {
      attributionDetails: {
        creatorName: '',
        creatorProfileUrl: '',
        workTitle: '',
        workUrl: '',
      },
      currentLicenseAttributes: {},
    }

    store = new Vuex.Store({
      state,
      mutations,
    })

    wrapper = mount(AttributionDetailsStep, {
      propsData: {
        status: 'active',
      },
      mocks: {
        $t: key => key,
      },
      store,
      localVue,
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('Creator Name is updated', async() => {
    const input = wrapper.find('input[placeholder="stepper.AD.form.creator-name.placeholder"]')
    await input.setValue('Jane Bar')
    expect(mutations.setCreatorName).toHaveBeenCalled()
  })

  // CreatorProfile URL
  it('Profile Url is updated', async() => {
    const input = wrapper.find('input[placeholder="stepper.AD.form.creator-profile.placeholder"]')
    await input.setValue('jane@bar.com')
    expect(mutations.setCreatorProfileUrl).toHaveBeenCalled()
  })

  // Work URL
  it('Work Url is updated', async() => {
    const input = wrapper.find('input[placeholder="stepper.AD.form.work-url.placeholder"]')
    await input.setValue('jane@bar.com/kitty.jpeg')
    expect(mutations.setWorkUrl).toHaveBeenCalled()
  })

  // Work Title
  it('Work Title is updated', async() => {
    const input = wrapper.find('input[placeholder="stepper.AD.form.work-title.placeholder"]')
    await input.setValue('illustrator')
    expect(mutations.setWorkTitle).toHaveBeenCalled()
  })
})
