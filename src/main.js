// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import ElementUI from 'element-ui'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import 'assets/css/index.scss'

import * as xhr from 'assets/js/index'

Vue.prototype.$xhr = xhr

Vue.prototype.$echarts = echarts

Vue.prototype.$debug = false

Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  data() {
    return {
      dialogAccidentDynamic: false, //事故动态-对话框
      dialogSingle: false,//单一报表-对话框
    }
  },
  template: '<App/>',
  components: { App }
})
