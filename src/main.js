// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import 'bulma/css/bulma.min.css'

import '@creativecommons/vocabulary/root.css'
import '@creativecommons/vocabulary/vocabulary.css'

Vue.config.productionTip = false
Vue.use(Buefy)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { App },
    template: '<App/>'
})
