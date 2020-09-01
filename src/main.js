import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/css/main.css";
import {
  closable
} from './directives';

Vue.config.productionTip = false;
Vue.directive('closable', closable)

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");