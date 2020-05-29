import Vue from 'vue';
import App from './App.vue';
import router from './router';
 
import 'normalize.css';
import './assets/scss/common/base.scss';
import './plugins/element.js';
import './assets/scss/common/userAdd.scss';
import './directives.js';


Vue.config.productionTip = false;
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
