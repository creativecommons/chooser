import { shallowMount } from '@vue/test-utils'
import SelectedLicense from '@/components/SelectedLicense.vue'

describe('SelectedLicense.spec.js', () => {
    let cmp

    beforeEach(() => {
        cmp = shallowMount(SelectedLicense, {
        // Be aware that props is overridden using `propsData`
            propsData: {
                fullLicenseName: 'Attribution',
                shortLicenseName: 'BY'
            }
        })
    })

    it('has received \'Attribution\' as the fullLicenseName property', () => {
        expect(cmp.vm.fullLicenseName).toEqual('Attribution')
    })

    it('has received \'BY\' as the shortLicenseName property', () => {
        expect(cmp.vm.shortLicenseName).toEqual('BY')
    })

    it('has the expected html structure', () => {
        expect(cmp.element).toMatchSnapshot()
    })
})
