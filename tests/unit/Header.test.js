import Vue from 'vue';
import jsdom from 'jsdom';
import Header from '@/components/Header';
import { shallowMount } from '@vue/test-utils';



describe('header', () => {
  


const wrapper = shallowMount(Header,{mocks: {
  $t: key => key}
});
wrapper.vm;

  it('verirification of the html contain', () => {
    
    expect(wrapper.html()).toContain('<b-navbar wrapper-class=\"container\"><template></template> <template></template></b-navbar>')
    
  })
  it('verification of the app.title', () => {
    
    
    expect(wrapper.find("h1").text()).toBe('app.title');
   
  })
  it('verification of the image', () => {
 
    expect(wrapper.find("img").html()).toBe('<img src="https://creativecommons.org/wp-content/uploads/2016/05/cc-site-icon-300x300.png" alt="Creative Commons License chooser">');
    
  })

    
})
