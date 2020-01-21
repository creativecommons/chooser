import { mount, createLocalVue, config } from '@vue/test-utils'
import SelectionStep from '@/components/SelectionStep'
import Buefy from 'buefy'
import LicenseUtilities from '@/utils/license-utilities'
import VueI18n from 'vue-i18n'

describe('SelectionStep.vue', () => {
    let wrapper

    beforeEach(() => {
        const localVue = createLocalVue()
        localVue.use(Buefy)
        localVue.use(LicenseUtilities)
        localVue.use(VueI18n)

        const i18n = new VueI18n({
            locale: 'en',
            fallbackLocale: 'en',
            messages: 'src/locales/en.json'
        })

        config.mocks.i18n = i18n

        config.mocks.$t = (key) => {
            return i18n.t(key)
        }

        wrapper = mount(SelectionStep, {
            localVue,
            propsData: {
                selected: true,
                stepId: 'by'
            }
        })
    })

    // Snapshot tests
    it('has the expected UI', () => {
        expect(wrapper).toMatchSnapshot()
    })
})
