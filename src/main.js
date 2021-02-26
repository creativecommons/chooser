import Vue from 'vue'
import VueVocabulary from '@creativecommons/vue-vocabulary/vue-vocabulary.common.js'
import i18n from './i18n'
import App from './App.vue'
import createStore from './store'
import './styles/vocab.scss'
import VueScrollTo from 'vue-scrollto'

// Analytics
import * as Sentry from '@sentry/vue'
import Hotjar from 'vue-hotjar'
import VueAnalytics from 'vue-analytics'

Vue.config.productionTip = false
Vue.use(VueVocabulary)
Vue.use(VueScrollTo)

if (process.env.NODE_ENV === 'production') {
  Vue.use(VueAnalytics, {
    id: 'UA-2010376-41',
    autoTracking: {
      screenview: true,
    },
  })
}

Sentry.init({
  dsn: process.env.NODE_ENV === 'production'
    ? 'https://8c09726e231d4cf780c541f40d3639a9@sentry.io/3009295' // cc-chooser-prod project
    : 'https://ab63acb8c1464466869182dd53c7046d@sentry.io/3009597', // cc-chooser-dev project
  logErrors: process.env.NODE_ENV !== 'production', // Only log errors in dev env
})

// Production only since we only have a prod id
if (process.env.NODE_ENV === 'production') {
  Vue.use(Hotjar, {
    id: '1803702',
    isProduction: true,
  })
}

const store = createStore({})
new Vue({
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
