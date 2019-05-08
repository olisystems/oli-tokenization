import Vue from 'vue'
import App from './App.vue'

import SmartTable from 'vuejs-smart-table'
Vue.use(SmartTable)

import './assets/css/main.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFacebook, faTwitter, faGithub)
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
