import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/css/main.css";
import {
  closable
} from './directives';
import VueContentPlaceholders from 'vue-content-placeholders'

Vue.config.productionTip = false;
Vue.directive('closable', closable)
Vue.use(VueContentPlaceholders)

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");