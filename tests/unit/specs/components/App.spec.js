import { shallowMount, createLocalVue, config } from '@vue/test-utils'
import App from '@/App'
import Buefy from 'buefy'
import VueI18n from 'vue-i18n'
import Vuex from 'vuex'
import Vue from 'vue'
import store from '@/store'

describe('App.vue', () => {
    let wrapper
    let localVue

    // Always creates a shallow instance of component
    beforeEach(() => {
        localVue = createLocalVue()
        localVue.use(Vuex)
        localVue.use(Buefy)
        Vue.use(VueI18n)
        const messages = require('@/locales/en.js')
        const i18n = new VueI18n({
            locale: 'en',
            fallbackLocale: 'en',
            messages: messages
        })

        config.mocks.i18n = i18n

        config.mocks.$t = key => {
            // key is a string (eg. 'stepper.ND.question')
            // this line converts it into an object reference
            // eg. messages['stepper.ND.question'] -> messages.stepper.ND.question
            return key.split('.').reduce((messages, k) => messages[k], i18n.messages)
        }
        wrapper = shallowMount(App, {
            store,
            localVue
        })
        wrapper.vm.$on('input', (newVal) => {
            wrapper.setProps({ value: newVal })
        })
    })

    it('Check if App.vue component renders without any errors', () => {
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    // Snapshot tests
    it('Check if the App.vue component has the expected UI', () => {
        expect(wrapper).toMatchSnapshot()
    })
})
