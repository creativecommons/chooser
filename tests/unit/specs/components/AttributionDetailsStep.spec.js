import { createLocalVue, mount } from '@vue/test-utils'
import Buefy from 'buefy'
import Vuex from 'vuex'
import AttributionDetailsStep from '@/components/AttributionDetailsStep'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(Buefy)

describe('AttributionDetailsStep Component Rendering', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(AttributionDetailsStep, {
            localVue,
            mocks: {
                $t: key => key,
                $store: {
                    state: {
                        attributionDetails: {
                            creatorName: '',
                            creatorProfileUrl: '',
                            workTitle: '',
                            workUrl: ''
                        }
                    }
                }
            }

        })
    })

    afterEach(() => {
        wrapper.destroy()
    })

    it('Component not mounted if status is previous', () => {
        wrapper.setProps({ status: 'previous' })
        expect(wrapper.find('.step-actions').exists()).toBeFalsy()
    })

    it('Component not mounted if status is inactive', () => {
        wrapper.setProps({ status: 'inactive' })
        expect(wrapper.find('.step-actions').exists()).toBeFalsy()
    })

    it('Component mounted if status is current', () => {
        wrapper.setProps({ status: 'current' })
        expect(wrapper.element).toMatchSnapshot()
    })
})

describe('Store is updated when a user provides input', () => {
    let mutations, state, wrapper, store

    beforeEach(() => {
        mutations = {
            setCreatorName: jest.fn(),
            setCreatorProfileUrl: jest.fn(),
            setWorkTitle: jest.fn(),
            setWorkUrl: jest.fn()
        }

        state = {
            attributionDetails: {
                creatorName: '',
                creatorProfileUrl: '',
                workTitle: '',
                workUrl: ''
            }
        }

        store = new Vuex.Store({
            state,
            mutations
        })

        wrapper = mount(AttributionDetailsStep, {
            propsData: {
                status: 'current'
            },
            mocks: {
                $t: key => key
            },
            store,
            localVue
        })
    })

    afterEach(() => {
        wrapper.destroy()
    })

    it('Creator Name is updated', async() => {
        const input = wrapper.find('input[placeholder="stepper.AD.form.creator-name.placeholder"]')
        await input.setValue('Jane Bar')
        expect(mutations.setCreatorName).toHaveBeenCalled()
    })

    // CreatorProfile URL
    it('Profile Url is updated', async() => {
        const input = wrapper.find('input[placeholder="stepper.AD.form.creator-profile.placeholder"]')
        await input.setValue('jane@bar.com')
        expect(mutations.setCreatorProfileUrl).toHaveBeenCalled()
    })

    // Work URL
    it('Work Url is updated', async() => {
        const input = wrapper.find('input[placeholder="stepper.AD.form.work-url.placeholder"]')
        await input.setValue('jane@bar.com/kitty.jpeg')
        expect(mutations.setWorkUrl).toHaveBeenCalled()
    })

    // Work Title
    it('Work Title is updated', async() => {
        const input = wrapper.find('input[placeholder="stepper.AD.form.work-title.placeholder"]')
        await input.setValue('illustrator')
        expect(mutations.setWorkTitle).toHaveBeenCalled()
    })
})
