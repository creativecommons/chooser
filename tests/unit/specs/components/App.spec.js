import Vue from 'vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import Vocabulary from '@creativecommons/vue-vocabulary/vue-vocabulary.common'
import VueScrollTo from 'vue-scrollto'
import Stepper from '@/src/components/Stepper'
import index from '../../../../src/pages/index'

describe('index.vue', () => {
    let wrapper
    let localVue
    let NuxtStore
    let store

    beforeAll(async () => {
        // note the store will mutate across tests
        const storePath = `${process.env.buildDir}/store.js`
        NuxtStore = await import(storePath)
    })
    beforeEach(async() => {
        localVue = createLocalVue()
        localVue.use(Vuex)
        localVue.use(Vocabulary)
        Vue.use(VueScrollTo)
        Vue.use(VueI18n)
        store = await NuxtStore.createStore()

        wrapper = shallowMount(index, {
            localVue,
            store,
            mocks: {
                $t: key => key
            }
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
        await store.commit('updateAttributesFromShort', 'CC BY 4.0')
        expect(rightColumn.find('licensedetailscard-stub').exists()).toBe(true)
    })

    it('Shows `Selected License` card when an attribute has been selected', async() => {
        const rightColumn = wrapper.findAll('.column').at(1)
        expect(rightColumn.find('licensedetailscard-stub').exists()).toBe(false)
        await store.commit('setSelected', { name: 'BY', selected: false })
        expect(rightColumn.find('licensedetailscard-stub').exists()).toBe(true)
    })

    it('Check that showLicenseUse returns true if currentStepId is equal to 7', async() => {
        expect(wrapper.find('licenseusecard-stub').exists()).toBe(false)
        await wrapper.findComponent(Stepper).vm.$emit('input', 7)
        expect(wrapper.find('licenseusecard-stub').exists()).toBe(true)
    })
})
