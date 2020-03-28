import Vue from 'vue'
import App from './App'
import store from './store/store.js'
import config from'./config/index.js'
import { http } from '@/assets/js/luch-request/index.js'

Vue.prototype.$http = http
Vue.prototype.$store = store
Vue.prototype.$config = config

Vue.config.productionTip = false

App.mpType = 'app'


const app = new Vue({
    ...App
})
app.$mount()
