import Vue from 'vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import Vocabulary from '@creativecommons/vue-vocabulary/vue-vocabulary.common'
import VueScrollTo from 'vue-scrollto'
import createStore from '@/store'
import App from '@/App'

describe('App.vue', () => {
  let wrapper
  let localVue

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.use(Vocabulary)
    Vue.use(VueScrollTo)
    Vue.use(VueI18n)
    wrapper = shallowMount(App, {
      store: createStore({}),
      localVue,
      mocks: {
        $t: key => key,
      },
    })
    wrapper.vm.$on('input', (newVal) => {
      wrapper.setProps({ value: newVal })
    })
  })

  it('Initially, `Selected License` card and `Mark Your Work` card are not shown', async() => {
    expect(wrapper.findAll('.column').length).toBe(2)
    const rightColumn = wrapper.findAll('.column').at(1)
    expect(rightColumn.find('licensedetailscard-stub').exists()).toBe(false)
  })

  it('Shows `Selected License` card when license attributes have been updated (as by dropdown)', async() => {
    expect(wrapper.findAll('.column').length).toBe(2)
    const rightColumn = wrapper.findAll('.column').at(1)
    expect(rightColumn.find('licensedetailscard-stub').exists()).toBe(false)
    await wrapper.vm.$store.commit('updateAttributesFromShort', 'CC BY 4.0')
    expect(rightColumn.find('licensedetailscard-stub').exists()).toBe(true)
  })

  it('Shows `Selected License` card when an attribute has been selected', async() => {
    const rightColumn = wrapper.findAll('.column').at(1)
    expect(rightColumn.find('licensedetailscard-stub').exists()).toBe(false)
    await wrapper.vm.$store.commit('setSelected', { name: 'BY', selected: false })
    expect(rightColumn.find('licensedetailscard-stub').exists()).toBe(true)
  })
})
