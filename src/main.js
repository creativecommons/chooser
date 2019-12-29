import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'

import i18n from './i18n'
import { library } from '@fortawesome/fontawesome-svg-core'
// internal icons
import {
    faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle,
    faArrowUp, faAngleRight, faAngleLeft, faAngleDown,
    faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload, faCopy
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle,
    faArrowUp, faAngleRight, faAngleLeft, faAngleDown,
    faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload, faCopy)
Vue.component('vue-fontawesome', FontAwesomeIcon)
Vue.config.productionTip = false
Vue.use(Buefy, {
    defaultIconComponent: 'vue-fontawesome',
    defaultIconPack: 'fas'
})

new Vue({
    i18n,
    render: h => h(App)
}).$mount('#app')
