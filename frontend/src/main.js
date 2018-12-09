// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import Master from './components/layout/Master'
import VModal from 'vue-js-modal'
import StarRating from 'vue-star-rating'
import VueScrollTo from 'vue-scrollto'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
import LetItSnow from 'vue-let-it-snow'
import moment from 'moment'
import VueMomentJS from 'vue-momentjs'
Vue.use(VueMomentJS, moment)
Vue.use(Vuetify)
Vue.use(VueScrollTo)
Vue.use(VModal, { dynamic: true })
Vue.prototype.$EventBus = new Vue()
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$cookies = VueCookies
Vue.component('star-rating', StarRating);
Vue.use(Vuetify, {
  iconfont: 'mdi'
})
Vue.use(LetItSnow)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { Master },
  template: '<Master/>'
})

Vue.use(VueScrollTo, {
  container: "body",
  duration: 500,
  easing: "ease",
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})