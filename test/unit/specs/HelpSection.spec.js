import { shallowMount } from '@vue/test-utils'
import HelpSection from '@/components/HelpSection';

describe('HelpSection.vue', () => {
    let wrapper;
    
    // Always creates a shallow instance of component
    beforeEach(() => {
        wrapper = shallowMount(HelpSection);
    });

    it("has the expected UI", () => {
        expect(wrapper).toMatchSnapshot();
    });


})
