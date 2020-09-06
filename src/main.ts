import Vue from 'vue';
import { VueSvgGauge } from 'vue-svg-gauge';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(VueSvgGauge);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
