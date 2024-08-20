import { createLocalVue, mount } from '@vue/test-utils';
import StepNavigation from '@/components/StepNavigation';
import VueVocabulary from '@creativecommons/vocabulary-components';

describe('StepNavigation.vue', () => {
  let wrapper;

  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(VueVocabulary);
    wrapper = mount(StepNavigation, {
      localVue,
      propsData: {
        stepName: 'FS',
      },
      mocks: {
        $t: key => key,
      },
    });
  });
  describe('renders correctly', () => {
    it('has correct buttons for first step', () => {
      expect(wrapper.findComponent(StepNavigation).exists()).toBe(true);
      const buttons = wrapper.findAll('button');
      expect(buttons.length).toEqual(1);
      expect(buttons.at(0).text()).toEqual('stepper.nav.next-label');
      expect(buttons.at(0).attributes().disabled).toBeTruthy();
    });
    it('has correct buttons for SA with next button enabled', async () => {
      await wrapper.setProps({
        stepName: 'SA',
        isNextEnabled: true,
      });
      const buttons = wrapper.findAll('button');
      expect(buttons.length).toEqual(2);
      const backButton = buttons.at(0);
      expect(backButton.text()).toEqual('stepper.nav.previous-label');
      expect(backButton.attributes().disabled).toBeFalsy();
    });
    it('has correct buttons for Attribution Details step', async () => {
      await wrapper.setProps({
        stepName: 'AD',
      });
      const buttons = wrapper.findAll('button');
      expect(buttons.length).toEqual(3);
      const backButton = buttons.at(0);
      expect(backButton.text()).toEqual('stepper.nav.previous-label');
      expect(backButton.attributes().disabled).toBeFalsy();
    });
  });

  describe('handles clicks correctly', () => {
    it('handles clicks correctly in the first step', async () => {
      const button = wrapper.find('button');
      await button.trigger('click');
      expect(wrapper.emitted().navigate).toBeFalsy();
      await wrapper.setProps({ isNextEnabled: true });
      await button.trigger('click');
      const emittedEvent = wrapper.emitted().navigate;
      const payload = emittedEvent[0][0];
      expect(emittedEvent).toBeTruthy();
      expect(payload.direction).toEqual('next');
      expect(payload.name).toEqual('FS');
    });

    it('handles clicks correctly in the middle step', async () => {
      const stepName = 'ND';
      await wrapper.setProps({
        stepName: stepName,
      });
      const buttons = wrapper.findAll('button');
      const backButton = buttons.at(0);

      await backButton.trigger('click');
      let emittedEvent = wrapper.emitted().navigate;
      let payload = emittedEvent[0][0];
      expect(emittedEvent).toBeTruthy();
      expect(payload.direction).toEqual('back');
      expect(payload.name).toEqual(stepName);

      await wrapper.setProps({ isNextEnabled: true });

      const nextButton = wrapper.findAll('button').at(1);
      await nextButton.trigger('click');
      emittedEvent = wrapper.emitted().navigate;
      payload = emittedEvent[1][0];
      expect(emittedEvent).toBeTruthy();
      expect(payload.direction).toEqual('next');
      expect(payload.name).toEqual(stepName);
    });
  });
});
