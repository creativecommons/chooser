import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import i18n from './i18n'
import VueAnalytics from 'vue-analytics'
import App from './App.vue'
import store from './store'
import './assets/css/vocab.css'

import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCopy } from '@fortawesome/free-solid-svg-icons/faCopy'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
    faCreativeCommons, faCreativeCommonsBy, faCreativeCommonsNc,
    faCreativeCommonsNd, faCreativeCommonsSa, faCreativeCommonsZero
} from '@fortawesome/free-brands-svg-icons'

library.add(
    faCopy, faCreativeCommons, faCreativeCommonsBy,
    faCreativeCommonsNc, faCreativeCommonsNd, faCreativeCommonsSa,
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

Sentry.init({
    dsn: process.env.NODE_ENV === 'production'
        ? 'https://8c09726e231d4cf780c541f40d3639a9@sentry.io/3009295' // cc-chooser-prod project
        : 'https://ab63acb8c1464466869182dd53c7046d@sentry.io/3009597', // cc-chooser-dev project
    integrations: [
        new Integrations.Vue({
            Vue,
            attachProps: true,
            logErrors: !process.env.NODE_ENV === 'production' // Only log errors in dev env
        })
    ]
})

new Vue({
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
