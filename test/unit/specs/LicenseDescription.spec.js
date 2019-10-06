import Vue from 'vue'
import { mount } from '@vue/test-utils'
import LicenseDescription from '@/components/LicenseDescription'

describe('LicenseDescription.vue', () => {
  
    test('the initial text starts with the name of the selected license', () => {
      const wrapper = mount(LicenseDescription, {
        propsData: {
          selectedLicense: 'CC BY 4.0',
          selected_license_adapt: 'it for any purpose, even commercially',
          selected_license_description: 'As the most accommodating of \
          licenses offered, the CC BY license allows others \
          to distribute, remix, tweak, and build upon your \
          work, even commercially, as long as they credit \
          you for the original creation.'          
        }
      })
      expect(wrapper.text()).toContain('CC BY  attribution means you allow people to')
    })
})

