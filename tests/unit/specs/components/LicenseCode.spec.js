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

    it('has correct information when creator name and work title are provided', () => {
        wrapper.vm.$store.commit('setCreatorName', TEST_DATA.creatorName)
        wrapper.vm.$store.commit('setWorkTitle', TEST_DATA.workTitle)
        const titleElement = wrapper.find('[property="dct:title"]')
        expect(titleElement.text()).toEqual(TEST_DATA.workTitle)
        expect(titleElement.name()).toEqual('span')
        expect(Object.keys(titleElement.attributes()).length).toEqual(1)
        // const creatorElement = wrapper.find('[property="cc:attributionName"]')
        // expect(Object.keys(creatorElement.attributes()).length).toEqual(1)
        // expect(creatorElement.text()).toEqual(TEST_DATA.creatorName)
        // expect(creatorElement.name()).toEqual('span')
    })
    it('has correct information when only urls are provided', () => {
        wrapper.vm.$store.commit('setWorkTitle', '')
        wrapper.vm.$store.commit('setCreatorName', '')
        wrapper.vm.$store.commit('setCreatorProfileUrl', TEST_DATA.creatorProfileUrl)
        wrapper.vm.$store.commit('setWorkUrl', TEST_DATA.workUrl)
        const titleElement = wrapper.find('[rel="cc:attributionURL"]')
        expect(titleElement.text()).toEqual('This work')
        expect(titleElement.name()).toEqual('a')
        expect(titleElement.attributes().href).toEqual(TEST_DATA.workUrl)
        expect(Object.keys(titleElement.attributes()).length).toEqual(2)
        const creatorElement = wrapper.findAll('[property="cc:attributionName"]')
        expect(creatorElement.length).toEqual(0)
    })

    it('has correct information all data are provided', () => {
        wrapper.vm.$store.commit('setCreatorName', TEST_DATA.creatorName)
        wrapper.vm.$store.commit('setWorkTitle', TEST_DATA.workTitle)
        wrapper.vm.$store.commit('setCreatorProfileUrl', TEST_DATA.creatorProfileUrl)
        wrapper.vm.$store.commit('setWorkUrl', TEST_DATA.workUrl)
        const titleElement = wrapper.find('[property="dct:title"]')
        expect(titleElement.text()).toEqual(TEST_DATA.workTitle)
        expect(titleElement.attributes().href).toEqual(TEST_DATA.workUrl)
        expect(titleElement.attributes().rel).toEqual('cc:attributionURL')
        expect(titleElement.name()).toEqual('a')
        expect(Object.keys(titleElement.attributes()).length).toEqual(3)
        const creatorElement = wrapper.find('[property="cc:attributionName"]')
        // expect(Object.keys(creatorElement.attributes()).length).toEqual(3)
        // expect(creatorElement.text()).toEqual(TEST_DATA.creatorName)
        // expect(creatorElement.attributes().href).toEqual('http://' + TEST_DATA.creatorProfileUrl)
        // expect(creatorElement.attributes().rel).toEqual('cc:attributionURL')
        // expect(creatorElement.name()).toEqual('a')
    })
})
