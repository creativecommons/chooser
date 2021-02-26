import { createLocalVue, shallowMount } from '@vue/test-utils'
import LicenseDetailsCard from '@/components/LicenseDetailsCard'
import { LICENSES } from '@/utils/license-utilities'
import VueI18n from 'vue-i18n'
import Vuex from 'vuex'

const getters = (slug) => ({
  fullName: jest.fn().mockReturnValue(LICENSES[slug].FULL),
  shortName: jest.fn().mockReturnValue(LICENSES[slug].SHORT),
  licenseUrl: jest.fn().mockReturnValue(() => LICENSES[slug].URL),
  iconsList: jest.fn().mockReturnValue(LICENSES[slug].ICONS.slice(1)),
})

describe('LicenseDetailsCard.vue', () => {
  let wrapper
  let store
  let currentLicense

  // Always creates a shallow instance of component
  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(VueI18n)
    localVue.use(Vuex)
    const currentLicenseSlug = 'CC_BY_NC_ND'
    currentLicense = LICENSES[currentLicenseSlug]
    store = new Vuex.Store({
      getters: getters(currentLicenseSlug),
    })

    wrapper = shallowMount(LicenseDetailsCard, {
      localVue,
      mocks: {
        $t: key => key,
        $store: store,
      },
    })
  })

  // Test for DOM elements which must be present
  it('Check if the main div and heading are rendered', () => {
    expect(wrapper.find('.recommended-card').exists()).toBe(true)
    expect(wrapper.find('h3').text()).toEqual('license-details-card.heading')
  })

  it('Check if the license short name is displayed correctly', () => {
    const shortNameElement = wrapper.find('.license-short-name')
    expect(shortNameElement.text()).toEqual(currentLicense.SHORT)
    expect(shortNameElement.findAll('.icon').length).toEqual(currentLicense.ICONS.length)
  })
  it('Check if the license full name is displayed correctly', () => {
    const fullNameElement = wrapper.findAll('h4').at(1)
    expect(fullNameElement.text()).toEqual(currentLicense.FULL)
  })

  it('Check if the license description is displayed correctly', () => {
    const fullDescription = wrapper.find('.license-full-description')
    expect(fullDescription.text()).toEqual('license-details-card.full-description.cc-by-nc-nd')
  })

  it('Check if the license description is displayed correctly', () => {
    const itemsDescription = wrapper.find('.items-description')
    expect(itemsDescription.findAll('li').length).toEqual(currentLicense.ICONS.length - 1)
  })

  it('Check if the license deed url is displayed correctly', () => {
    const licenseDeedLink = wrapper.find('a.license-deed-link')
    expect(licenseDeedLink.attributes().href).toEqual(currentLicense.URL)
  })
})

describe('LicenseDetailsCard.vue', () => {
  it('Check if Recommended section renders correctly for CC0', () => {
    const localVue = createLocalVue()
    localVue.use(VueI18n)
    localVue.use(Vuex)
    const currentLicense = LICENSES.CC0
    const store = new Vuex.Store({
      getters: getters('CC0'),
    })

    const wrapper = shallowMount(LicenseDetailsCard, {
      localVue,
      mocks: {
        $t: key => key,
        $store: store,
      },
    })
    const shortNameElement = wrapper.find('.license-short-name')
    expect(shortNameElement.text()).toEqual(currentLicense.SHORT)
    expect(shortNameElement.findAll('.icon').length).toEqual(currentLicense.ICONS.length)
    const fullNameElement = wrapper.findAll('h4').at(1)
    expect(fullNameElement.text()).toEqual(currentLicense.FULL)
  })
})
