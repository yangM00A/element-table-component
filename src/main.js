// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// --------公共组件--------- start
import tableGrid from "@/components/table-grid";
import formDialog from "@/components/form-dialog";
Vue.component("table-grid", tableGrid)
Vue.component("form-dialog", formDialog)
// --------公共组件--------- end

Vue.config.productionTip = false
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
