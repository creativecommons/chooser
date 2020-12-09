import { createLocalVue, shallowMount } from '@vue/test-utils'
import StepHeader from '@/components/StepHeader'
import VueVocabulary from '@creativecommons/vue-vocabulary/vue-vocabulary.common'
import Vue from 'vue'

const steps = [
    { id: 0, name: 'FS', visible: true, enabled: true, status: 'active', selected: undefined },
    { id: 1, name: 'BY', visible: true, enabled: true, status: 'inactive', selected: undefined },
    { id: 2, name: 'NC', visible: true, enabled: true, status: 'inactive', selected: undefined },
    { id: 3, name: 'ND', visible: true, enabled: true, status: 'inactive', selected: undefined },
    { id: 4, name: 'SA', visible: true, enabled: true, status: 'inactive', selected: undefined },
    { id: 5, name: 'DD', visible: false, enabled: true, status: 'inactive', selected: undefined },
    { id: 6, name: 'CW', visible: false, enabled: true, status: 'inactive', selected: undefined },
    { id: 7, name: 'AD', visible: true, enabled: true, status: 'inactive', selected: undefined }
]

describe('StepHeader.vue', () => {
    let wrapper

    beforeEach(() => {
        const localVue = createLocalVue()
        localVue.use(VueVocabulary)
        wrapper = shallowMount(StepHeader, {
            localVue,
            propsData: {
                step: steps[0]
            },
            mocks: {
                $t: key => key
            }
        })
    })
    describe('renders correctly', () => {
        it('renders correctly for first step', () => {
            expect(wrapper.name()).toBe('StepHeader')
            const title = wrapper.find('.step-header__title')
            expect(title.text()).toEqual('stepper.FS.question')
            const caption = wrapper.find('.step-header__caption')
            expect(caption.exists()).toBe(false)
        })
        it('renders correctly when first step is selected completed', () => {
            wrapper.setProps({ step: { ...steps[0], status: 'completed', selected: true } })
            const title = wrapper.find('.step-header__title')
            expect(title.text()).toEqual('stepper.FS.heading')
            const caption = wrapper.find('.step-header__caption')
            expect(caption.text()).toEqual('stepper.FS.selected')
        })
        it('emits activate event when clicked', () => {
            const id = 0
            wrapper.setProps({ step: { ...steps[id], status: 'completed' } })
            wrapper.find('.step-header').trigger('click')
            Vue.nextTick()
            expect(wrapper.emitted().activate[0][0]).toEqual(id)
        })
    })
})
