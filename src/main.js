// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'isomorphic-fetch'

Vue.config.productionTip = false;

Vue.use(ElementUI);
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
