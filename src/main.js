import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'
import { Message } from 'element-ui'
import Moment from 'moment'
import store from './store'
import MyBreadMenu from './components/part/BreadMenu'
import echarts from 'echarts'

Vue.config.productionTip = false

Vue.prototype.$echart = echarts

axios.defaults.baseURL = 'http://localhost:8081'
Vue.prototype.$http = axios
Vue.prototype.$axios = axios

Vue.prototype.$message = Message
Vue.prototype.$moment = Moment

Vue.component('my-bread-menu', MyBreadMenu)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
