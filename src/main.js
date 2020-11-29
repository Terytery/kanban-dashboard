import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { store } from './store/store'
import { longClickDirective } from 'vue-long-click'
import './firebase'

import './assets/css/global.css'

Vue.config.productionTip = false
Vue.use(Vuex)

const longClickInstance = longClickDirective({ delay: 600, interval: 0 })
Vue.directive('longclick', longClickInstance)

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
