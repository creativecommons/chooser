import Vue from 'vue'
import Buefy from 'buefy'
import i18n from './i18n'
import VueAnalytics from 'vue-analytics'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
// internal icons
import {
    faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle,
    faArrowUp, faAngleRight, faAngleLeft, faAngleDown, faUserCircle, faQuestionCircle,
    faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload, faCopy, faCircle
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import LicenseUtilities from './utils/license-utilities'

library.add(faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle,
    faArrowUp, faAngleRight, faAngleLeft, faAngleDown, faUserCircle, faQuestionCircle,
    faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload, faCopy, faCircle)
Vue.component('vue-fontawesome', FontAwesomeIcon)
Vue.config.productionTip = false
Vue.use(Buefy, {
    defaultIconComponent: 'vue-fontawesome',
    defaultIconPack: 'fas'
})
if (process.env.NODE_ENV === 'production') {
    Vue.use(VueAnalytics, {
        id: 'UA-2010376-41',
        autoTracking: {
            screenview: true
        }
    })
}

Vue.use(LicenseUtilities)

new Vue({
    i18n,
    render: h => h(App)
}).$mount('#app')
