import Vue from 'vue'
import App from './App'
import store from './store/store.js'
import config from './config/index.js'
import icon from "./components/icon.vue"
import cuCustom from "./components/cu-custom.vue"

Vue.prototype.$store = store
Vue.prototype.$config = config

Vue.config.productionTip = false

App.mpType = 'app'

Vue.component("icon", icon)

Vue.component("cu-custom", cuCustom)

const app = new Vue({
    ...App
})
app.$mount()
