import { shallowMount } from "@vue/test-utils";
import IconSelector from "@/components/IconSelector";

function createConfig (overrides) {
  const mocks = {};
  const propsData = { };
  return Object.assign({ mocks, propsData }, overrides);
}

describe("IconSelector.vue", () => {

    describe('auto selection when mounting with different props', () => {
        const SA_TEXT_WHEN_ENABLED = 'Not Require Distribution on Same Terms'.toLowerCase()
        const SA_TEXT_WHEN_DISABLED = 'Require Disribution on Same Terms'.toLowerCase()

        const NC_TEXT_WHEN_ENABLED = 'Allow Commercial Uses of Your Work'.toLowerCase()
        const NC_TEXT_WHEN_DISABLED = 'Disallow Commercial Uses of Your Work'.toLowerCase()

        const ND_TEXT_WHEN_ENABLED = 'Allow Others to Modify Your Work'.toLowerCase()
        const ND_TEXT_WHEN_DISABLED = 'Disallow Modifications of Your Work'.toLowerCase()


        describe('SA', () => {
            it('auto selected when mounting with props { value: true }', () => {
                const config = createConfig({
                    propsData: {
                        id: 'sa',
                        icon: 'sa',
                        value: true
                    }
                });
        
                const wrapper = shallowMount(IconSelector, config);
                expect(wrapper.text().toLowerCase()).toContain(SA_TEXT_WHEN_ENABLED)
            })
    
            it('not auto selected when mounting with props { value: false }', () => {
                const config = createConfig({
                    propsData: {
                        id: 'sa',
                        icon: 'sa',
                        value: false
                    }
                });
        
                const wrapper = shallowMount(IconSelector, config);
                expect(wrapper.text().toLowerCase()).toContain(SA_TEXT_WHEN_DISABLED)
            })
        })

        describe('NC', () => {
            it('not auto selected when mounting with props { value: true }', () => {
                const config = createConfig({
                    propsData: {
                        id: 'nc',
                        icon: 'nc',
                        value: true
                    }
                });
        
                const wrapper = shallowMount(IconSelector, config);
                expect(wrapper.text().toLowerCase()).toContain(NC_TEXT_WHEN_DISABLED)
            })
    
            it('not auto selected when mounting with props { value: false }', () => {
                const config = createConfig({
                    propsData: {
                        id: 'nc',
                        icon: 'nc',
                        value: false
                    }
                });
        
                const wrapper = shallowMount(IconSelector, config);
                expect(wrapper.text().toLowerCase()).toContain(NC_TEXT_WHEN_DISABLED)
            })
        })

        describe('ND', () => {
            it('not auto selected when mounting with props { value: true }', () => {
                const config = createConfig({
                    propsData: {
                        id: 'nd',
                        icon: 'nd',
                        value: true
                    }
                });
        
                const wrapper = shallowMount(IconSelector, config);
                expect(wrapper.text().toLowerCase()).toContain(ND_TEXT_WHEN_DISABLED)
            })
    
            it('not auto selected when mounting with props { value: false }', () => {
                const config = createConfig({
                    propsData: {
                        id: 'nd',
                        icon: 'nd',
                        value: false
                    }
                });
        
                const wrapper = shallowMount(IconSelector, config);
                expect(wrapper.text().toLowerCase()).toContain(ND_TEXT_WHEN_DISABLED)
            })
        })

    })

    describe('render description for each license', () => {
        it('SA\'s description exist', () => {
            const config = createConfig({
                propsData: {
                    id: 'sa',
                    icon: 'sa',
                }
            });
    
            const wrapper = shallowMount(IconSelector, config);
            expect(wrapper.find('.icon-description').text().length)
                .toBeGreaterThan(0)
        })

        it('ND\'s description exist', () => {
            const config = createConfig({
                propsData: {
                    id: 'nd',
                    icon: 'nd',
                }
            });
    
            const wrapper = shallowMount(IconSelector, config);
            expect(wrapper.find('.icon-description').text().length)
                .toBeGreaterThan(0)
        })

        it('NC\'s description exist', () => {
            const config = createConfig({
                propsData: {
                    id: 'nc',
                    icon: 'nc',
                }
            });
    
            const wrapper = shallowMount(IconSelector, config);
            expect(wrapper.find('.icon-description').text().length)
                .toBeGreaterThan(0)
        })

        it('description must differs between licenses', () => {    
            const ncWrapper = shallowMount(IconSelector, {
                propsData: {
                    id: 'nc',
                    icon: 'nc',
                }
            });
            const ncDescription = ncWrapper.find('.icon-description').text();

            const ndWrapper = shallowMount(IconSelector, {
                propsData: {
                    id: 'nd',
                    icon: 'nd',
                }
            });
            const ndDescription = ndWrapper.find('.icon-description').text();

            const saWrapper = shallowMount(IconSelector, {
                propsData: {
                    id: 'sa',
                    icon: 'sa',
                }
            });
            const saDescription = saWrapper.find('.icon-description').text();

            expect(ncDescription).not.toEqual(ndDescription)
            expect(ncDescription).not.toEqual(saDescription)
            expect(saDescription).not.toEqual(ndDescription)
        })
    })

    it('click on SA emits true then false', () => {
        const wrapper = shallowMount(IconSelector, {
            propsData: {
                id: 'sa',
                icon: 'sa',
                value: false
            }
        });
        const component = wrapper.find('#component');
        component.trigger('click');
        component.trigger('click');

        expect(wrapper.emitted().input[0][0]).toBe(true)
        expect(wrapper.emitted().input[1][0]).toBe(false)
    })

    it('click on SA emits false then true', () => {
        const wrapper = shallowMount(IconSelector, {
            propsData: {
                id: 'sa',
                icon: 'sa',
                value: true
            }
        });
        const component = wrapper.find('#component');
        component.trigger('click');
        component.trigger('click');

        expect(wrapper.emitted().input[0][0]).toBe(false)
        expect(wrapper.emitted().input[1][0]).toBe(true)
    })

    it('click on ND emits false then true', () => {
        const wrapper = shallowMount(IconSelector, {
            propsData: {
                id: 'nd',
                icon: 'nd',
                value: true
            }
        });
        const component = wrapper.find('#component');
        component.trigger('click');
        component.trigger('click');

        expect(wrapper.emitted().input[0][0]).toBe(false)
        expect(wrapper.emitted().input[1][0]).toBe(true)
    })

    it('click on NC emits false then true', () => {
        const wrapper = shallowMount(IconSelector, {
            propsData: {
                id: 'nc',
                icon: 'nc',
                value: true
            }
        });
        const component = wrapper.find('#component');
        component.trigger('click');
        component.trigger('click');

        expect(wrapper.emitted().input[0][0]).toBe(false)
        expect(wrapper.emitted().input[1][0]).toBe(true)
    })

});