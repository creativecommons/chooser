import { mount } from '@vue/test-utils'
import LicenseDescription from '@/components/LicenseDescription'

describe('LicenseDescription.vue', () => {
    test('the initial text starts with the name of the selected license without the version', () => {
        const desc = 'As the most accommodating of                     licenses offered, the CC BY license allows others                     to distribute, remix, tweak, and build upon your                     work, even commercially, as long as they credit                     you for the original creation.'
        const wrapper = mount(LicenseDescription, {
            propsData: {
                selectedLicense: 'CC BY 4.0'
            }
        })
        expect(wrapper.text()).toContain('CC BY  attribution means you allow people to')
        expect(wrapper.text()).toContain(desc)
    })

    test('the license adapt section is shown if the license chosen has an adapt', () => {
        const wrapper = mount(LicenseDescription, {
            propsData: {
                selectedLicense: 'CC BY 4.0'
            }
        })

        expect(wrapper.text()).toContain('Adapt')
    })

    test('the license adapt section is not shown if the license chosen does not have an adapt', () => {
        const wrapper = mount(LicenseDescription, {
            propsData: {
                selectedLicense: 'CC BY-ND 4.0'
            }
        })

        expect(wrapper.text()).not.toContain('Adapt')
    })

    test('description is shown as expected depending on the license that has been selected', () => {
        const wrapper = mount(LicenseDescription, {propsData: {selectedLicense: 'CC BY 4.0'}})
        const sawrapper = mount(LicenseDescription, {propsData: {selectedLicense: 'CC BY-SA 4.0'}})
        const ncwrapper = mount(LicenseDescription, {propsData: {selectedLicense: 'CC BY-NC 4.0'}})
        const ndwrapper = mount(LicenseDescription, {propsData: {selectedLicense: 'CC BY-ND 4.0'}})
        const ncsawrapper = mount(LicenseDescription, {propsData: {selectedLicense: 'CC-BY-NC-SA 4.0'}})
        const ncndwrapper = mount(LicenseDescription, {propsData: {selectedLicense: 'CC BY-NC-ND 4.0'}})

        expect(wrapper.text()).toContain('CC BY  attribution means you allow people to Share the material in any medium or format Adapt it for any purpose, even commercially')
        expect(sawrapper.text()).toContain('CC BY-SA  attribution means you allow people to Share the material in any medium or format Adapt it for any purpose, even commercially                     (must share under the same license)')
        expect(ncwrapper.text()).toContain('CC BY-NC  attribution means you allow people to Share the material in any medium or format Adapt it for any purpose, except commercially ')
        expect(ndwrapper.text()).toContain('CC BY-ND  attribution means you allow people to Share the material in any medium or format')
        expect(ncsawrapper.text()).toContain('CC-BY-NC-SA  attribution means you allow people to Share the material in any medium or format Adapt it for any purpose, except commercially                     (must share under the same license)')
        expect(ncndwrapper.text()).toContain('The CC BY-NC-ND license is the                     least accommodating license that CC offers. BY-NC-ND                     stipulates that others are free to distribute your                     work, but not for commercial purposes, and that                     others may not remix, tweak, or build upon')
    })
})
