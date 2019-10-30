import { shallowMount } from '@vue/test-utils';
import Chooser from '@/components/Chooser';
import IconSelector from '@/components/IconSelector';

describe('Chooser.vue', () => {
    describe('correctly displays initial informations and options when mounted', () => {
        it('renders the title', () => {
            const wrapper = shallowMount(Chooser);

            expect(wrapper
                .findAll('b')
                .filter(wrapper => 
                    wrapper.classes().includes('desktop-show') && wrapper.classes().includes('mobile-hide')
                ).length)
                .toEqual(1);
            expect(wrapper
                .findAll('b')
                .filter(wrapper =>
                    wrapper.classes().includes('mobile-show') && wrapper.classes().includes('desktop-hide')
                ).length)
                .toEqual(1);
        });

        it('renders all three icon selectors', () => {
            const wrapper = shallowMount(Chooser);

            expect(wrapper.find('#nc').exists()).toEqual(true);
            expect(wrapper.find('#nd').exists()).toEqual(true);
            expect(wrapper.find('#sa').exists()).toEqual(true);
        });

        it('initializes with base license names', () => {
            const wrapper = shallowMount(Chooser);
            
            expect(wrapper.vm.shortLicenseName).toBe('CC BY 4.0');
            expect(wrapper.vm.fullLicenseName).toBe('Attribution 4.0 International');
        });
    });

    describe('correctly handles changes on internal components', () => {
        it('removes shareAlike icon selector when adaptations are disabled', () => {
            const wrapper = shallowMount(Chooser);

            wrapper.setData({
                allowAdaptations: false
            });

            expect(wrapper.findAll(IconSelector).length).toBe(2);
        });
    });

    describe('correctly updates internal data when requested', () => {
        it('updates license names when setting allowCommercial value to false', () => {
            const wrapper = shallowMount(Chooser);
            const iconsContainer = wrapper.findAll('.column').at(0);

            wrapper.setData({
                allowCommercial: false
            });
            iconsContainer.trigger('change');
            
            expect(wrapper.emitted().input[0][0]).toEqual({
                shortName: 'CC BY-NC 4.0',
                fullName: 'Attribution-NonCommercial 4.0 International'
            });
        });

        it('updates license names when setting isShareAlike value to true', () => {
            const wrapper = shallowMount(Chooser);
            const iconsContainer = wrapper.findAll('.column').at(0);

            wrapper.setData({
                isShareAlike: true
            });
            iconsContainer.trigger('change');
            
            expect(wrapper.emitted().input[0][0]).toEqual({
                shortName: 'CC BY-SA 4.0',
                fullName: 'Attribution-ShareAlike 4.0 International'
            });
        });

        it('updates license names when setting allowAdaptations value to false', () => {
            const wrapper = shallowMount(Chooser);
            const iconsContainer = wrapper.findAll('.column').at(0);

            wrapper.setData({
                allowAdaptations: false
            });
            iconsContainer.trigger('change');
            
            expect(wrapper.emitted().input[0][0]).toEqual({
                shortName: 'CC BY-ND 4.0',
                fullName: 'Attribution-NoDerivatives 4.0 International'
            });
        });
    });
});
