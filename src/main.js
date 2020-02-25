import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import i18n from './i18n'
import VueAnalytics from 'vue-analytics'
import App from './App.vue'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCopy } from '@fortawesome/free-solid-svg-icons/faCopy'
import { faCreativeCommons } from '@fortawesome/free-brands-svg-icons/faCreativeCommons'
import { faCreativeCommonsBy } from '@fortawesome/free-brands-svg-icons/faCreativeCommonsBy'
import { faCreativeCommonsNc } from '@fortawesome/free-brands-svg-icons/faCreativeCommonsNc'
import { faCreativeCommonsNd } from '@fortawesome/free-brands-svg-icons/faCreativeCommonsNd'
import { faCreativeCommonsSa } from '@fortawesome/free-brands-svg-icons/faCreativeCommonsSa'
import { faCreativeCommonsZero } from '@fortawesome/free-brands-svg-icons/faCreativeCommonsZero'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(
    faCopy,
    faCreativeCommons,
    faCreativeCommonsBy,
    faCreativeCommonsNc,
    faCreativeCommonsNd,
    faCreativeCommonsSa,
    faCreativeCommonsZero
)
Vue.component('vue-fontawesome', FontAwesomeIcon)
Vue.config.productionTip = false
Vue.use(Buefy)

if (process.env.NODE_ENV === 'production') {
    Vue.use(VueAnalytics, {
        id: 'UA-2010376-41',
        autoTracking: {
            screenview: true
        }
    })
}

new Vue({
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
