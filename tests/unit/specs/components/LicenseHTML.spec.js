import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import { mount, createLocalVue } from '@vue/test-utils'
import createStore from '@/store'
import { CCBYAttributes } from '@/utils/license-utilities'
import LicenseHTMLTester from './LicenseHTMLTester'

describe('LicenseHTML.vue', () => {
  let wrapper
  let state
  let localVue
  let store

  // Vue i18n is looking for locale key in messages,
  // i.e. $t('app') becomes 'messages.<en>.app'
  const messages = {}
  messages.en = require('@/locales/en.json')
  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(VueI18n)
    localVue.use(Vuex)
    // License Code is only available after the User selects a license,
    // so we do not need to test blank license attributes
    state = { currentLicenseAttributes: CCBYAttributes }
    store = createStore(state)
    const i18n = new VueI18n({
      locale: 'en',
      messages: messages,
    })

    wrapper = mount(LicenseHTMLTester, {
      localVue,
      store,
      i18n,
    })
  })

  it('has correct information when no attribution data is provided', () => {
    const rendered = wrapper.find('.rendered-html p')
    // When no title is provided, we should not have 'xmlns:dct' namespace
    expect(rendered.attributes()['xmlns:dct']).toBe(undefined)
    expect(rendered.attributes()['xmlns:cc']).toBe('http://creativecommons.org/ns#')
    expect(rendered.text()).toBe('This work is licensed under CC BY 4.0')

    const licenseLink = wrapper.find('a')
    expect(licenseLink.attributes().href).toBe('http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1')
    // License link should have the following attributes: href, target, rel and style
    expect(Object.keys(licenseLink.attributes()).length).toBe(4)
    expect(licenseLink.attributes().target).toBe('_blank')
    expect(licenseLink.attributes().rel).toBe('license noopener noreferrer')

    const licenseIcons = wrapper.findAll('img')
    expect(licenseIcons.length).toBe(2)
  })

  it('has correct information when all attribution data is provided', async() => {
    const workUrl = 'www.john.com/foo.jpg'
    const creatorUrl = 'www.john.com'
    await store.commit('setCreatorName', 'John')
    await store.commit('setWorkUrl', workUrl)
    await store.commit('setWorkTitle', 'Foo')
    await store.commit('setCreatorProfileUrl', creatorUrl)

    const rendered = wrapper.find('.rendered-html p')
    expect(rendered.attributes()['xmlns:dct']).toBe('http://purl.org/dc/terms/')
    expect(rendered.attributes()['xmlns:cc']).toBe('http://creativecommons.org/ns#')
    expect(rendered.text()).toBe('Foo by John is licensed under CC BY 4.0')

    const creatorLink = wrapper.find(`a[href="http://${creatorUrl}"]`)
    expect(creatorLink.attributes().property).toBe('cc:attributionName')
    expect(creatorLink.attributes().rel).toBe('cc:attributionURL dct:creator')
    expect(Object.keys(creatorLink.attributes()).length).toBe(3)
    expect(creatorLink.text()).toBe('John')

    const workLink = wrapper.find(`a[href="http://${workUrl}"]`)
    expect(workLink.attributes().property).toBe('dct:title')
    expect(workLink.attributes().rel).toBe('cc:attributionURL')
    expect(Object.keys(workLink.attributes()).length).toBe(3)
    expect(workLink.text()).toBe('Foo')

    const licenseLink = wrapper.find('a[rel="license noopener noreferrer"]')
    expect(licenseLink.attributes().href).toBe('http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1')
    // License link should have the following attributes: href, target, rel and style
    expect(Object.keys(licenseLink.attributes()).length).toBe(4)
    expect(licenseLink.attributes().target).toBe('_blank')

    const licenseIcons = wrapper.findAll('img')
    expect(licenseIcons.length).toBe(2)
  })
})
