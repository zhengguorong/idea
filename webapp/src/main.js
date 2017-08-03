// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import RouterConfig from './router'
import Store from './vuex/store'
import 'element-ui/lib/theme-default/index.css'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: new VueRouter({routes: RouterConfig}),
  store: new Vuex.Store(Store),
  render: h => h(App)
})
