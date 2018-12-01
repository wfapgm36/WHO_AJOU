// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import Master from './components/layout/Master'
import VModal from 'vue-js-modal'

Vue.use(VModal, { dynamic: true })
Vue.prototype.$EventBus = new Vue()
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$cookies = VueCookies

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { Master },
  template: '<Master/>'
})
