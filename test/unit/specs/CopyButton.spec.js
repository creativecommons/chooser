import Vue from 'vue'
// ajuda a montar o componentez de teste de forma que possa
// disparar eventos(simula evento de click nesse caso)
import { mount } from '@vue/test-utils'
import CopyButton from '@/components/CopyButton.vue'

describe('CopyButton.vue', () => {

  it('should render the right content text', () => {
    const slots = { default: 'Copy button' };
    const props = { id: 'copy-button', el: 'button' }
    const wrapper = mount(CopyButton, {
      // slot é o conteudo que está cercado por um elemento nesse caso o botao
      slots,
      props,
    })
    expect(wrapper.text()).toBe(slots.default);
  })
})








