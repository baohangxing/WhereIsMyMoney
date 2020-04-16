import Vue from "vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import {getTypeIcon, getTypeName, shortifyContent} from './assets/js/help';
import {amountFilter} from './assets/js/filter';
import icon from "./components/icon.vue"
import "./assets/css/font.css";
import "./assets/css/normalize.css";
import "./assets/css/animation.css"

Vue.config.productionTip = false;
Vue.prototype.shortifyContent = shortifyContent;
Vue.prototype.getTypeName = getTypeName;
Vue.prototype.getTypeIcon = getTypeIcon;
Vue.use(ElementUI);

Vue.filter('amount', amountFilter);
Vue.component("my-icon", icon);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
