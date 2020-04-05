import { createLocalVue, mount } from '@vue/test-utils'
import Buefy from 'buefy'
import FirstStep from '@/components/FirstStep.vue'

const localVue = createLocalVue()

localVue.use(Buefy)

describe('FirstStep Component', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(FirstStep, {
            localVue,
            mocks: {
                $t: key => key
            }
        })
    })

    afterEach(() => {
        wrapper.destroy()
    })

    it('Mark up is correctly rendered', () => {
        wrapper.setProps({
            selected: undefined,
            stepId: 0,
            status: 'current'
        })

        expect(wrapper.element).toMatchSnapshot()
    })

    it('Radio Input value is YES', () => {
        wrapper.setProps({
            selected: undefined,
            stepId: 0,
            status: 'current'
        })

        const radio = wrapper.findAll('input[type="radio"]').at(0)
        radio.trigger('change')

        expect(wrapper.emitted().change[0]).toEqual(['FS', 0, true])
    })

    it('Radio Input value is NO', () => {
        wrapper.setProps({
            selected: undefined,
            stepId: 0,
            status: 'current'
        })

        const radio = wrapper.findAll('input[type="radio"]').at(1)
        radio.trigger('change')

        expect(wrapper.emitted().change[0]).toEqual(['FS', 0, false])
    })

    it('props:selected false', () => {
        wrapper.setProps({
            selected: false,
            stepId: 0,
            status: 'current'
        })

        expect(wrapper.vm.radio).toBe('no')
        expect(wrapper.vm.cardText).toBe('stepper.FS.not-selected')
    })

    it('props:selected true', () => {
        wrapper.setProps({
            selected: true,
            stepId: 0,
            status: 'current'
        })

        expect(wrapper.vm.radio).toBe('yes')
        expect(wrapper.vm.cardText).toBe('stepper.FS.selected')
    })
})
