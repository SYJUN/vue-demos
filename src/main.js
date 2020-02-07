import Vue from 'vue';
import axios from "../src/apis/request";
import VueAxios from "vue-axios";

// a modern alternative to CSS resets
import 'normalize.css/normalize.css';

import VueMeta from 'vue-meta';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './components/_globals';

import App from './App.vue';
import store from './store';
import router from './router';

Vue.use(ElementUI, { size: 'small' });
Vue.use(VueMeta, {
  keyName: 'metaInfo',
  refreshOnceOnNavigation: true,
});
// Vue.axios | this.axios | this.$http
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
