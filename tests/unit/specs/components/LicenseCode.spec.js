import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import { mount, createLocalVue } from '@vue/test-utils'
import LicenseCode from '@/components/LicenseCode.vue'
import createStore from '@/store'
import { CCBYAttributes } from '@/utils/license-utilities'

const TEST_DATA = {
    creatorName: 'Jane Doe',
    creatorProfileUrl: 'www.author.com',
    workTitle: 'My work',
    workUrl: 'www.author.com/picture.jpg'
}

describe('LicenseCode.vue', () => {
    let wrapper
    let state
    let localVue

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
        const store = createStore(state)
        const i18n = new VueI18n({
            locale: 'en',
            messages: messages
        })

        wrapper = mount(LicenseCode, {
            localVue,
            store,
            i18n
        })
    })

    it('it renders without any errors', () => {
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
    it('Check if the creatorSpan function returns the correct text', () => {
        state.attributionDetails.creatorName = 'J Doe'
        expect(wrapper.vm.creatorSpan).toBe('<span property="cc:attributionName">J Doe</span>')
    })
    it('has the expected UI', () => {
        expect(wrapper).toMatchSnapshot()
    })
    it('has correct information when creator name and work title are provided', () => {
        wrapper.vm.$store.commit('setCreatorName', TEST_DATA.creatorName)
        wrapper.vm.$store.commit('setWorkTitle', TEST_DATA.workTitle)
        expect(wrapper).toMatchSnapshot()
    })
    it('has correct information when only urls are provided', () => {
        wrapper.vm.$store.commit('setCreatorProfileUrl', TEST_DATA.creatorProfileUrl)
        wrapper.vm.$store.commit('setWorkUrl', TEST_DATA.workUrl)
        expect(wrapper).toMatchSnapshot()
    })
    it('has correct information all data are provided', () => {
        wrapper.vm.$store.commit('setCreatorName', TEST_DATA.creatorName)
        wrapper.vm.$store.commit('setWorkTitle', TEST_DATA.workTitle)
        wrapper.vm.$store.commit('setCreatorProfileUrl', TEST_DATA.creatorProfileUrl)
        wrapper.vm.$store.commit('setWorkUrl', TEST_DATA.workUrl)
        expect(wrapper).toMatchSnapshot()
    })
})
