import { mount } from '@vue/test-utils'
import LicenseDescription from '@/components/LicenseDescription'

describe('LicenseDescription.vue', () => {
  test('the initial text starts with the name of the selected license', () => {
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


})

