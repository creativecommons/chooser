import { shallowMount, createLocalVue } from '@vue/test-utils'
import HelpSection from '@/components/HelpSection';
import Buefy from 'buefy';

describe('HelpSection.vue', () => {
    let wrapper;
    
    // Always creates a shallow instance of component
    beforeEach(() => {
        const localVue = createLocalVue();
        localVue.use(Buefy);

        wrapper = shallowMount(HelpSection, { 
            localVue 
        });
    });

    // Snapshot tests
    it("has the expected UI", () => {
        expect(wrapper).toMatchSnapshot();
    });

    // Variables tests
    it("equals isModal1Active to false", () => {
        expect(wrapper.vm.isModal1Active).toEqual(false);
    });

    it("expects isModal1Active to be true after clicking it", () => {
        const button = wrapper.find('button');
        button.trigger('click');
        expect(wrapper.vm.isModal1Active).toEqual(true);
    });

    it("equals isModal2Active to false", () => {
        expect(wrapper.vm.isModal1Active).toEqual(false);
    });

    it("expects isModal2Active to be true after clicking it", () => {
        const button = wrapper.find('button');
        button.trigger('click');
        expect(wrapper.vm.isModal1Active).toEqual(true);
    });

    it("equals isModal3Active to false", () => {
        expect(wrapper.vm.isModal1Active).toEqual(false);
    });

    it("expects isModal3Active to be true after clicking it", () => {
        const button = wrapper.find('button');
        button.trigger('click');
        expect(wrapper.vm.isModal1Active).toEqual(true);
    });

    it("equals isModal4Active to false", () => {
        expect(wrapper.vm.isModal1Active).toEqual(false);
    });

    it("expects isModal4Active to be true after clicking it", () => {
        const button = wrapper.find('button');
        button.trigger('click');
        expect(wrapper.vm.isModal1Active).toEqual(true);
    });

    it("equals isModal5Active to false", () => {
        expect(wrapper.vm.isModal1Active).toEqual(false);
    });

    it("expects isModal5Active to be true after clicking it", () => {
        const button = wrapper.find('button');
        button.trigger('click');
        expect(wrapper.vm.isModal1Active).toEqual(true);
    });

    it("equals isModal6Active to false", () => {
        expect(wrapper.vm.isModal1Active).toEqual(false);
    });

    it("expects isModal6Active to be true after clicking it", () => {
        const button = wrapper.find('button');
        button.trigger('click');
        expect(wrapper.vm.isModal1Active).toEqual(true);
    });

})
