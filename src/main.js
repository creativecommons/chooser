// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import App from './App'
import Buefy from 'buefy'
import VueHead from 'vue-head'
import i18n from './i18n'
import 'buefy/dist/buefy.css'
import 'bulma/css/bulma.min.css'
import '@creativecommons/vocabulary/root.css'
import '@creativecommons/vocabulary/vocabulary.css'

Vue.use(VueAnalytics, {
    id: 'UA-XXX-X',
    autoTracking: {
        screenview: true
    }
})

Vue.config.productionTip = false
Vue.use(Buefy)
Vue.use(VueHead)

/* eslint-disable no-new */
new Vue({
    i18n,
    el: '#app',
    components: { App },
    template: '<App/>'
})
