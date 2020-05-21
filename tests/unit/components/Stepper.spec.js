import Vuex from 'vuex'
import { shallowMount, createLocalVue, config } from '@vue/test-utils'
import Stepper from '@/components/Stepper'
import Buefy from 'buefy'
import VueI18n from 'vue-i18n'
import Vue from 'vue'
import store from '@/store'

function getNextButton(wrapper) {
    return wrapper.find('.pagination-next')
}
function clickNext(wrapper) {
    getNextButton(wrapper).trigger('click')
}
function getStepId(wrapper, stepName) {
    return wrapper.vm.steps.filter((step) => { return step.name === stepName })[0].id
}
function setStepSelected(wrapper, stepName, isSelected) {
    const stepId = getStepId(wrapper, stepName)
    wrapper.vm.changeStepSelected(stepName, stepId, isSelected)
}
function stepHeadingText(steps, index) {
    return steps.at(index).find('h5').text()
}
function advanceStep(wrapper, actions) {
    for (const { stepName, isSelected, license } of actions) {
        const stepId = getStepId(wrapper, stepName)
        if (stepName === 'DD') {
            wrapper.vm.$store.commit('updateAttributesFromShort', license)
        }
        wrapper.vm.changeStepSelected(stepName, stepId, isSelected)
        wrapper.vm.handleNext(stepName)
    }
}

let wrapper
let localVue

function setUp() {
    localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.use(Buefy)
    Vue.use(VueI18n)
    const messages = require('@/locales/en.json')
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
    wrapper = shallowMount(Stepper, {
        store,
        localVue
    })
    wrapper.vm.$on('input', (newVal) => {
        wrapper.setProps({ value: newVal })
    })
}

beforeEach(() => setUp())

describe('Stepper.vue', () => {
    describe('renders correctly', () => {
        it('is called', () => {
            expect(wrapper.name()).toBe('Stepper')
            expect(wrapper.isVueInstance()).toBeTruthy()
        })
        it('has expected UI initially', () => {
            expect(wrapper).toMatchSnapshot()
        })
        it('has expected UI on ND step', () => {
            advanceStep(wrapper, [
                { stepName: 'FS', isSelected: false },
                { stepName: 'BY', isSelected: true },
                { stepName: 'NC', isSelected: false }
            ])
            expect(wrapper).toMatchSnapshot()
        })
        it('has expected UI on CW step after DD', () => {
            advanceStep(wrapper, [
                { stepName: 'FS', isSelected: true },
                { stepName: 'DD', isSelected: true, license: 'CC0 1.0' }
            ])
            expect(wrapper).toMatchSnapshot()
        })
    })

    describe('Step headings', () => {
        it('inactive step headings are not clickable', () => {
            const stepHeaders = wrapper.findAll('.step-header')
            const steps = wrapper.findAll('.step-container')
            stepHeaders.at(0).trigger('click')
            expect(steps.at(0).classes('current')).toBe(true)
            stepHeaders.at(1).trigger('click')
            expect(steps.at(1).classes('inactive')).toBe(true)
        })
        it('clicking on disabled previous step does not change current step', () => {
            advanceStep(wrapper,
                [
                    { stepName: 'FS', isSelected: false },
                    { stepName: 'BY', isSelected: false }
                ])
            expect(wrapper.find('.current').classes()).toContain('CW')
            wrapper.findAll('.step-header').at(2).trigger('click')
            expect(wrapper.find('.current').classes()).toContain('CW')
        })
    })
    describe('Next button', () => {
        it('becomes clickable only after selection is made', () => {
            const nextButton = wrapper.find('.pagination-next')
            expect(nextButton.classes('disabled')).toBe(true)
            setStepSelected(wrapper, 'FS', false)
            expect(nextButton.classes('disabled')).toBe(false)
        })
        it('clicking on Next button advances the step', () => {
            setStepSelected(wrapper, 'FS', true)
            clickNext(wrapper)
            const steps = wrapper.findAll('.step-container')
            expect(steps.at(0).classes('previous')).toBe(true)
            expect(steps.at(1).classes('current')).toBe(true)
        })
    })
    describe('Previous button', () => {
        it('AttributionDetails Step opens correct step when Previous button is clicked', () => {
            // For BY- licenses, it should open SA step
            advanceStep(wrapper, [
                { stepName: 'FS', isSelected: false },
                { stepName: 'BY', isSelected: true },
                { stepName: 'NC', isSelected: false },
                { stepName: 'ND', isSelected: false },
                { stepName: 'SA', isSelected: false }])
            wrapper.find('.pagination-previous').trigger('click')
            expect(wrapper.find('.current').classes()).toContain('SA')
            // for CC0 license, it should open CW step
            wrapper.findAll('.step-header').at(1).trigger('click')
            setStepSelected(wrapper, 'BY', false)
            clickNext(wrapper)
            setStepSelected(wrapper, 'CW', true)
            clickNext(wrapper)
            wrapper.find('.pagination-previous').trigger('click')
            expect(wrapper.find('.current').classes()).toContain('CW')
            // if using dropdown with a BY- license, it should open DD step
            wrapper.findAll('.step-header').at(0).trigger('click')
            advanceStep(wrapper, [{ stepName: 'FS', isSelected: true }])
            advanceStep(wrapper, [{ stepName: 'DD', isSelected: true, license: 'CC BY-NC-ND 4.0' }])
            wrapper.find('.pagination-previous').trigger('click')
            expect(wrapper.find('.current').classes()).toContain('DD')
            console.log(wrapper.emitted())
        })
    })
    describe('FirstStep interactions', () => {
        it('choosing Yes sets 3 steps visible: FS, Dropdown and AttributionDetails, opens DD', () => {
            advanceStep(wrapper, [
                { stepName: 'FS', isSelected: true }])
            const steps = wrapper.findAll('.step-container')
            expect(steps.length).toEqual(3)
            expect(steps.at(0).classes('previous')).toBe(true)
            expect(wrapper.find('.current').classes('DD')).toBe(true)
        })
        it('choosing No sets 6 steps visible: FS, BY, NC, ND, SA and AttributionDetails, opens BY', () => {
            setStepSelected(wrapper, 'FS', false)
            clickNext(wrapper)
            const steps = wrapper.findAll('.step-container')
            expect(steps.length).toEqual(6)
            expect(wrapper.vm.currentStepId).toEqual(1)
            expect(stepHeadingText(steps, 1)).toEqual(wrapper.vm.$t('stepper.BY.question'))
        })
    })
    describe('Step interactions', () => {
        it('BY: selecting No updates enabled steps; disables NC, ND and SA; opens CopyrightWaiverStep', () => {
            advanceStep(wrapper, [{ stepName: 'FS', isSelected: false }])
            setStepSelected(wrapper, 'BY', false)
            const nextButton = getNextButton(wrapper)
            expect(nextButton.classes('disabled')).toBe(false)
            const steps = wrapper.findAll('.step-container')
            const disabledSteps = wrapper.findAll('.disabled')
            expect(disabledSteps.length).toEqual(3)
            expect(steps.length).toEqual(7)
            clickNext(wrapper)
            expect(wrapper.find('.current').classes()).toContain('CW')
        })
        it('ND: selecting ND license updates enabled steps; disables SA step; opens AttributionDetailsStep', () => {
            advanceStep(wrapper, [
                { stepName: 'FS', isSelected: false },
                { stepName: 'BY', isSelected: true },
                { stepName: 'NC', isSelected: false }])
            setStepSelected(wrapper, 'ND', true)
            const steps = wrapper.findAll('.step-container')
            const disabledSteps = wrapper.findAll('.disabled')
            expect(disabledSteps.length).toEqual(1)
            expect(steps.length).toEqual(6)
            clickNext(wrapper)
            expect(wrapper.find('.current').classes()).toContain('AD')
        })
    })
    describe('DropdownStep interactions', () => {
        beforeEach(() => {
            // setUp()
            advanceStep(wrapper, [
                { stepName: 'FS', isSelected: true }])
        })
        it('selecting CC0 makes 4 steps visible and opens Copyright Waiver step', async() => {
            const shortName = 'CC0 1.0'
            advanceStep(wrapper, [{ stepName: 'DD', isSelected: true, license: shortName }])
            const steps = wrapper.findAll('.step-container')
            expect(steps.length).toEqual(4)
            expect(wrapper.find('.current').classes()).toContain('CW')
        })
        it('selecting a BY license and clicking Next makes 3 steps visible and opens AttributionDetails step', async() => {
            advanceStep(wrapper, [{ stepName: 'DD', isSelected: true, license: 'CC BY 4.0' }])
            const steps = wrapper.findAll('.step-container')
            expect(steps.length).toEqual(3)
            expect(wrapper.find('.current').classes()).toContain('AD')
        })
    })
})
