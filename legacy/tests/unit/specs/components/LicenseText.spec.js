import Vuex from 'vuex';
import VueI18n from 'vue-i18n';
import { mount, createLocalVue } from '@vue/test-utils';
import LicenseText from '@/components/LicenseText.vue';
import createStore from '@/store';
import { CCBYAttributes, LICENSES } from '@/utils/license-utilities';

const TEST_DATA = {
  creatorName: 'Jane Doe',
  creatorProfileUrl: 'https://janedoe.com',
  workTitle: 'My work',
  workUrl: 'https://janedoe.com/best-photo-ever.jpg',
};

describe('LicenseText.vue', () => {
  let wrapper;
  let state;
  let localVue;

  // Vue i18n is looking for locale key in messages,
  // i.e. $t('app') becomes 'messages.<en>.app'
  const messages = {};
  messages.en = require('@/locales/en.json');
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueI18n);
    localVue.use(Vuex);
    // License Code is only available after the User selects a license,
    // so we do not need to test blank license attributes
    state = { currentLicenseAttributes: CCBYAttributes };
    const store = createStore(state);
    const i18n = new VueI18n({
      locale: 'en',
      messages: messages,
    });

    wrapper = mount(LicenseText, {
      localVue,
      store,
      i18n,
    });
  });

  it('has correct information when creator name and work title are provided', async () => {
    await wrapper.vm.$store.commit('setCreatorName', TEST_DATA.creatorName);
    await wrapper.vm.$store.commit('setWorkTitle', TEST_DATA.workTitle);
    const titleElement = wrapper.find('[property="dct:title"]');
    expect(titleElement.text()).toEqual(TEST_DATA.workTitle);
    expect(titleElement.find('span').exists()).toEqual(true);
    expect(Object.keys(titleElement.attributes()).length).toEqual(1);
    const creatorElement = wrapper.find('[property="cc:attributionName"]');
    expect(Object.keys(creatorElement.attributes()).length).toEqual(1);
    expect(creatorElement.text()).toEqual(TEST_DATA.creatorName);
    expect(creatorElement.find('span').exists()).toBe(true);
  });
  it('has correct information when only urls are provided', async () => {
    await wrapper.vm.$store.commit('setWorkTitle', '');
    await wrapper.vm.$store.commit('setCreatorName', '');
    await wrapper.vm.$store.commit(
      'setCreatorProfileUrl',
      TEST_DATA.creatorProfileUrl,
    );
    await wrapper.vm.$store.commit('setWorkUrl', TEST_DATA.workUrl);
    const titleElement = wrapper.find('[rel^="cc:attributionURL"]');
    expect(titleElement.text()).toEqual('This work');
    expect(titleElement.find('a').exists()).toBe(true);
    expect(titleElement.attributes().href).toEqual(TEST_DATA.workUrl);
    // href, rel, target
    expect(Object.keys(titleElement.attributes()).length).toEqual(3);
    const creatorElement = wrapper.findAll('[property^="cc:attributionName"]');
    expect(creatorElement.length).toEqual(0);
  });

  it('has correct information all data are provided', async () => {
    await wrapper.vm.$store.commit('setCreatorName', TEST_DATA.creatorName);
    await wrapper.vm.$store.commit('setWorkTitle', `${TEST_DATA.workTitle}`);
    await wrapper.vm.$store.commit(
      'setCreatorProfileUrl',
      TEST_DATA.creatorProfileUrl,
    );
    await wrapper.vm.$store.commit('setWorkUrl', TEST_DATA.workUrl);
    const titleElement = wrapper.find('[property="dct:title"]');
    expect(titleElement.text()).toEqual(TEST_DATA.workTitle);
    expect(titleElement.attributes().href).toEqual(TEST_DATA.workUrl);
    expect(titleElement.attributes().rel).toEqual(
      'cc:attributionURL noopener noreferrer',
    );
    expect(titleElement.find('a').exists()).toEqual(true);
    // href, rel, target, property
    expect(Object.keys(titleElement.attributes()).length).toEqual(4);
    const creatorElement = wrapper.find('[property="cc:attributionName"]');
    expect(Object.keys(creatorElement.attributes()).length).toEqual(4);
    expect(creatorElement.text()).toEqual(TEST_DATA.creatorName);
    expect(creatorElement.attributes().href).toEqual(
      TEST_DATA.creatorProfileUrl,
    );
    expect(creatorElement.attributes().rel).toEqual(
      'cc:attributionURL noopener noreferrer',
    );
    expect(creatorElement.find('a').exists()).toEqual(true);
  });

  it('updates license name type (full/short)', () => {
    wrapper.vm.$store.state.attributionType = 'full';
    expect(wrapper.vm.licenseName).toEqual(LICENSES.CC_BY.FULL);
    wrapper.vm.$store.state.attributionType = 'short';
    expect(wrapper.vm.licenseName).toEqual(LICENSES.CC_BY.SHORT);
  });
});
