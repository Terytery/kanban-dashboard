import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify'
import { store } from './store/store'
import { routes } from './route/route'
import './firebase'

import './assets/css/global.css'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
