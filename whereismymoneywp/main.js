import Vue from 'vue'
import App from './App'
import store from './store/store.js'
import config from './config/index.js'

Vue.prototype.$store = store
Vue.prototype.$config = config

Vue.config.productionTip = false

App.mpType = 'app'

import icon from "./components/icon.vue"
Vue.component("icon", icon)


const app = new Vue({
	...App
})
app.$mount()
