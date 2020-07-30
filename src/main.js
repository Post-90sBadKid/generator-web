import Vue from 'vue'
/* ElementUI  */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
/* mavonEditor */
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import App from './App.vue'

// use
Vue.use(mavonEditor)
Vue.use(ElementUI);
Vue.config.productionTip = false

import router from './router'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
