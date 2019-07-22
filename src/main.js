import Vue from 'vue';
import VueMeta from 'vue-meta';
import Axios from 'axios';
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

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
