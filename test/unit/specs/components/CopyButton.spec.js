import Vue from 'vue'
import { mount } from '@vue/test-utils'
import CopyButton from '@/components/CopyButton.vue'
import { doesNotThrow } from 'assert';

const DOM_SOURCE_ID = 'el-test';
const DOM_SOURCE_VALUE = 'test clipboard value';

const slots = { default: 'Copy button' };
const propsData = { id: 'copy-button', el: `#${DOM_SOURCE_ID}` }
const defaults = {
  slots,
  propsData,
  attachToDocument: true,
}

let wrapper

// mock dom source
function _mockDOMSource(value) {
  // create the span and append to JSDOM
  const span = document.createElement('span')
  span.setAttribute('id', DOM_SOURCE_ID);
  span.textContent = value;
  document.body.appendChild(span)
}

// mock dom methods
function _mockDomMethodsForClipboardJS(value) {
  window.getSelection = () => ({
    addRange: () => {},
    removeAllRanges: () => {},
    toString: () => value,
  });

  document.execCommand = () => value;
  document.createRange = () => ({ selectNodeContents: () => { } });
}

beforeEach(() => {
  _mockDOMSource(DOM_SOURCE_VALUE)
  _mockDomMethodsForClipboardJS(DOM_SOURCE_VALUE)
  wrapper = mount(CopyButton, defaults)
})

afterEach(() => {
  wrapper.destroy()
})

describe('CopyButton.vue', () => {
  it('should render the right content text', () => {
    expect(wrapper.text()).toBe(slots.default);
  })

  it('should change the text when clicked to \'Copied!\' and 2 secs later swich back to the original text', done => {
    wrapper.trigger('click');
    expect(wrapper.text()).toBe('Copied!');
    setTimeout(() => {
      expect(wrapper.text()).toBe(slots.default);
      done();
    }, 2000);
  })

  it('should emit only the \'copied\' event with a valid value', () => {
    wrapper.trigger('click');

    const emittedEvents = wrapper.emitted()
    expect(emittedEvents).toHaveProperty('copied');
    expect(emittedEvents.copied).toBeTruthy();
    expect(emittedEvents.copied.length).toBe(1);
    expect(emittedEvents.copied[0].length).toBe(1);
    expect(emittedEvents.copied[0][0].content).toBe(DOM_SOURCE_VALUE);
    expect(emittedEvents.copyFailed).toBeFalsy();
  })

  it('should emit only the \'copyFailed\' event', () => {
    document.execCommand = () => false // force error on clipboard.js
    wrapper.trigger('click');

    const emittedEvents = wrapper.emitted()
    expect(emittedEvents).toHaveProperty('copyFailed');
    expect(emittedEvents.copied).toBeFalsy();
  })
})