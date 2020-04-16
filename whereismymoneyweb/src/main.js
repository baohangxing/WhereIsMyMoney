import Vue from "vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import {getTypeIcon, getTypeName, shortifyContent} from './assets/js/help';
import icon from "./components/icon.vue"


Vue.config.productionTip = false;
Vue.prototype.shortifyContent = shortifyContent;
Vue.prototype.getTypeName = getTypeName;
Vue.prototype.getTypeIcon = getTypeIcon;
Vue.use(ElementUI);
Vue.component("my-icon", icon);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
