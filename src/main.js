import Vue from 'vue'
import Buefy from 'buefy'
import VueVocabulary from '@creativecommons/vue-vocabulary/vue-vocabulary.common.js'
import i18n from './i18n'
import App from './App.vue'
import createStore from './store'
import './styles/vocab.scss'
import VueScrollTo from 'vue-scrollto'

// Analytics
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'
import Hotjar from 'vue-hotjar'
import VueAnalytics from 'vue-analytics'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCopy } from '@fortawesome/free-solid-svg-icons/faCopy'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faCreativeCommons } from '@fortawesome/free-brands-svg-icons/faCreativeCommons'
import { faCreativeCommonsBy } from '@fortawesome/free-brands-svg-icons/faCreativeCommonsBy'
import { faCreativeCommonsNc } from '@fortawesome/free-brands-svg-icons/faCreativeCommonsNc'
import { faCreativeCommonsNd } from '@fortawesome/free-brands-svg-icons/faCreativeCommonsNd'
import { faCreativeCommonsSa } from '@fortawesome/free-brands-svg-icons/faCreativeCommonsSa'
import { faCreativeCommonsZero } from '@fortawesome/free-brands-svg-icons/faCreativeCommonsZero'

library.add(
    faCopy, faCreativeCommons, faCreativeCommonsBy,
    faCreativeCommonsNc, faCreativeCommonsNd, faCreativeCommonsSa,
    faCreativeCommonsZero
)
Vue.component('vue-fontawesome', FontAwesomeIcon)
Vue.config.productionTip = false
Vue.use(Buefy)
Vue.use(VueVocabulary)
Vue.use(VueScrollTo)

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
            logErrors: process.env.NODE_ENV !== 'production' // Only log errors in dev env
        })
    ]
})

// Production only since we only have a prod id
if (process.env.NODE_ENV === 'production') {
    Vue.use(Hotjar, {
        id: '1803702',
        isProduction: true
    })
}

const store = createStore({})
new Vue({
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
