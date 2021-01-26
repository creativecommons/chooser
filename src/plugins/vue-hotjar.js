import Vue from 'vue'
import Hotjar from 'vue-hotjar'

// Production only since we only have a prod id
Vue.use(Hotjar, {
  id: '1803702',
  isProduction: true,
})
