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
            data() {
                return {
                    currentStepId: 7,
                    showLicense: false,
                    shouldShake: false,
                    windowWidth: window.innerWidth
                }
            },
            mocks: {
                $t: key => key
            }
        })
        wrapper.vm.$on('input', (newVal) => {
            wrapper.setProps({ value: newVal })
        })
    })

    it('Check that all computed i18n props return correct values after true selected', () => {
        expect(wrapper.vm.showLicenseUse).toBe(true)
    })
})
