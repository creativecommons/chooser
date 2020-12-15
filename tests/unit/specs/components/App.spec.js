import { shallowMount, createLocalVue } from '@vue/test-utils'
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

        wrapper = shallowMount(App, {
            store,
            localVue,
            mocks: {
                $t: key => key
            }
        })
        wrapper.vm.$on('input', (newVal) => {
            wrapper.setProps({ value: newVal })
        })
    })

    it('Check if App.vue component renders without any errors', () => {
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
