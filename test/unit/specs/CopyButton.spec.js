import Vue from 'vue'
// ajuda a montar o componentes de teste de forma que possa
// disparar eventos(simula evento de click nesse caso)
import { mount } from '@vue/test-utils'
import CopyButton from '@/components/CopyButton.vue'
import { doesNotThrow } from 'assert';

const DOM_SOURCE_ID = 'el-test';

// mock dom source
function _mockDOMSource(value) {
  // creates the span and append to JSDOM
  const span = document.createElement('span')
  span.setAttribute('id', DOM_SOURCE_ID);
  span.textContent = value;
  document.body.appendChild(span)
}

// mock dom methods
function _mockDomMethodsForClipboardJS(value) {
  window.getSelection = () => ({
    addRange: () => { },
    removeAllRanges: () => { },
    toString: () => value,
  });

  document.execCommand = () => value;
  document.createRange = () => ({ selectNodeContents: () => { } });
}

beforeEach(() => {
  const domValue = 'test clipboard value'
  _mockDOMSource(domValue)
  _mockDomMethodsForClipboardJS(domValue)
})

describe('CopyButton.vue', () => {
  const slots = { default: 'Copy button' };
  const props = { id: 'copy-button', el: `#${DOM_SOURCE_ID}` }
  const wrapper = mount(CopyButton, {
    // slot é o conteudo que está cercado por um elemento nesse caso o botao
    slots,
    propsData: props,
    attachToDocument: true,
  })

  it('should render the right content text', () => {
    expect(wrapper.text()).toBe(slots.default);
  })

  it('should change the text when clicked to Copied and 2 seconds after that come back to original text', done => {
    wrapper.trigger('click');
    expect(wrapper.text()).toBe('Copied!');
    setTimeout(() => {
      expect(wrapper.text()).toBe(slots.default);
      done();
    }, 2000);
  })
})
