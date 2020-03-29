import { mount } from '@vue/test-utils'
import FirstStep from '@/Components/FirstStep.vue'

describe('FirstStep.vue', () => {
    const wrapper = mount(FirstStep)
    it('Has the main div tag', () => {
        expect(wrapper.contains('.step-content')).toBe(true)
    })

    it('renders without any errors', () => {
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('Checks if the cardtext function return the correct answer when selected is true', () => {
        wrapper.setProps({
            selected: true
        })

        expect(wrapper.vm.cardText).toBe('stepper.FS.selected')
    })

    it('Checks if the cardtext function return the correct answer when selected is false', () => {
        wrapper.setProps({
            selected: false
        })

        expect(wrapper.vm.cardText).toBe('stepper.FS.not-selected')
    })

    it('Checks if the yesText function returns correct answer ', () => {
        expect(wrapper.vm.yesText).toBe('stepper.FS.selected')
    })

    it('Checks if the noText function returns correct answer', () => {
        expect(wrapper.vm.noText).toBe('stepper.FS.not-selected')
    })

    it('Checks if the yesSelected function returns the correct boolean when selected is true', () => {
        wrapper.setProps({
            selected: true
        })
        expect(wrapper.vm.yesSelected).toBe('selected')
    })

    it('Checks if the yesSelected function returns the correct boolean when selected is false', () => {
        wrapper.setProps({
            selected: false
        })
        expect(wrapper.vm.yesSelected).toBe('not-selected')
    })

    it('Checks if the get function in radio returns the correct value when selected is undefined', () => {
        wrapper.setProps({
            selected: undefined
        })
        expect(wrapper.vm.radio).toBe(undefined)
    })

    it('Checks if the get function in radio returns the correct value when selected is yes', () => {
        wrapper.setData({
            selected: 'yes'
        })
        expect(wrapper.vm.radio).toBe('yes')
    })

    it('Checks if the noSelected function returns the correct boolean when selected is true', () => {
        wrapper.setProps({
            selected: true
        })
        expect(wrapper.vm.noSelected).toBe('not-selected')
    })

    it('Checks if the noSelected function returns the correct boolean when selected is false', () => {
        wrapper.setProps({
            selected: false
        })
        expect(wrapper.vm.noSelected).toBe('selected')
    })
})
