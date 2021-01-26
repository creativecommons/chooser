import { mount, createLocalVue } from '@vue/test-utils'
import ChooserStep from '@/src/components/ChooserStep'
import VueVocabulary from '@creativecommons/vue-vocabulary/vue-vocabulary.common'

describe('ChooserStep.vue', () => {
    let wrapper
    let localVue

    // Always creates a shallow instance of component
    beforeEach(() => {
        localVue = createLocalVue()
        localVue.use(VueVocabulary)
        wrapper = mount(ChooserStep, {
            localVue,
            mocks: {
                $t: key => key
            }
        })
    })
    it('Check that ChooserStep renders correctly', async () => {
        await wrapper.setProps({
            id: 1,
            name: 'BY',
            selected: false
        })
        const yesField = wrapper.findAll('.v-radio').at(0)
        expect(yesField.text()).toBe('stepper.yes'+'stepper.BY.selected')
        const noField = wrapper.findAll('.v-radio').at(1)
        expect(noField.text()).toBe('stepper.no'+'stepper.BY.not-selected')
    })

    it('Check that selecting "Yes" emits correct value', async () => {
        await wrapper.setProps({
            id: 1,
            name: 'BY',
            selected: undefined
        })
        const yesField = wrapper.findAll('.v-radio').at(0)
        expect(yesField.text()).toBe('stepper.yes'+'stepper.BY.selected')
        const noField = wrapper.findAll('.v-radio').at(1)
        expect(noField.text()).toBe('stepper.no'+'stepper.BY.not-selected')
        const radioYes = wrapper.find('input[value="yes"]')
        await radioYes.setChecked()
        expect(wrapper.emitted().change[0]).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: 'BY',
                    id: 1,
                    selected: true
                })
            ])
        )
    })

    it('Check reversed step emits reversed value', async () => {
        await wrapper.setProps({
            id: 3,
            name: 'ND',
            selected: undefined
            }
        )
        const radioYes = wrapper.find('input[value="yes"]')
        await radioYes.setChecked()
        expect(wrapper.emitted().change[0]).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    selected: false
                })
            ])
        )
    })
})
