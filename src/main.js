import Vue from 'vue';
import App from './App.vue';
import './styles/vocab.scss';
import VueScrollTo from 'vue-scrollto';
import VueVocabulary from '@creativecommons/vocabulary-components';

// Analytics
import * as Sentry from '@sentry/vue';

Vue.config.productionTip = false;
Vue.use(VueVocabulary);
Vue.use(VueScrollTo);


Sentry.init({
  dsn:
    process.env.NODE_ENV === 'production'
      ? 'https://8c09726e231d4cf780c541f40d3639a9@sentry.io/3009295' // cc-chooser-prod project
      : 'https://ab63acb8c1464466869182dd53c7046d@sentry.io/3009597', // cc-chooser-dev project
  logErrors: process.env.NODE_ENV !== 'production', // Only log errors in dev env
});


if(process.env.VUE_APP_CC_OUTPUT!=='embedded') {
  new Vue({
    render: h => h(App),
  }).$mount('#app');
}

export default App;