import Vue from 'vue'
import App from './App.vue'
import router from "./router/router"
import echarts from "echarts"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
