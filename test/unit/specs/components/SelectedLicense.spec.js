import { shallowMount, createLocalVue } from '@vue/test-utils'
import licenseUrl from '@/utils/licenseUrl'
import SelectedLicense from '@/components/SelectedLicense'
import LicenseDescription from '@/components/LicenseDescription'

describe('SelectedLicense.vue', () => {

    it('checks prop value of shortLicenseName is assigned correctly', () => {
    	const wrapper = shallowMount(SelectedLicense, {
	    	propsData: {
	    		shortLicenseName: 'CC BY 4.0'
	    	}
    	})
    	const ncWrapper = shallowMount(SelectedLicense, {
	    	propsData: {
	    		shortLicenseName: 'CC BY-NC 4.0'
	    	}
    	})
    	expect(wrapper.props().shortLicenseName).toBe('CC BY 4.0')
    	expect(ncWrapper.props().shortLicenseName).toBe('CC BY-NC 4.0')
    })

    it('checks fullLicenseName prop value is assigned correctly', () => {
    	const wrapper = shallowMount(SelectedLicense, {
	    	propsData: {
	    		shortLicenseName: 'CC BY 4.0',
	    		fullLicenseName: 'Atribution 4.0 International'
	    	}
    	})
    	const ncWrapper = shallowMount(SelectedLicense, {
	    	propsData: {
	    		shortLicenseName: 'CC BY-NC 4.0',
	    		fullLicenseName: 'Atribution-NonCommercial 4.0 International'
	    	}
    	})
    	expect(wrapper.props().fullLicenseName).toBe('Atribution 4.0 International')
    	expect(ncWrapper.props().fullLicenseName).toBe('Atribution-NonCommercial 4.0 International')
    })

    it ('correctly returns object for iconsList function', () => {
    	const wrapper = shallowMount(SelectedLicense, {
	    	propsData: {
	    		shortLicenseName: 'CC BY 4.0'
	    	}
    	})
    	const iconsListObj = wrapper.vm.iconsList
    	expect(typeof iconsListObj).toBe('object')
    })

    it('checks last index in array from iconsList function is correct', () => {
    	const wrapper = shallowMount(SelectedLicense, {
	    	propsData: {
	    		shortLicenseName: 'CC BY 4.0'
	    	}
    	})
    	const ncWrapper = shallowMount(SelectedLicense, {
	    	propsData: {
	    		shortLicenseName: 'CC BY-NC 4.0',
	    		fullLicenseName: 'Atribution-NonCommercial 4.0 International'
	    	}
    	})
    	const lastIndex = wrapper.vm.iconsList
    	const NcLastIndex = ncWrapper.vm.iconsList
    	expect(lastIndex[lastIndex.length-1]).toBe('by')
    	expect(NcLastIndex[NcLastIndex.length-1]).toBe('nc')
    })

    it('sets link for href for license names', () => {
    	const wrapper = shallowMount(SelectedLicense, {
	    	propsData: {
	    		shortLicenseName: 'CC BY 4.0'
	    	}
    	})
    	const ncWrapper = shallowMount(SelectedLicense, {
	    	propsData: {
	    		shortLicenseName: 'CC BY-NC 4.0'
	    	}
    	})
    	expect(licenseUrl(wrapper.props().shortLicenseName)).toBe('https://creativecommons.org/licenses/by/4.0/?ref=ccchooser')
    	expect(licenseUrl(ncWrapper.props().shortLicenseName)).toBe('https://creativecommons.org/licenses/by-nc/4.0/?ref=ccchooser')
    })

    
})