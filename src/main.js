// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'animate.css';
import iView from 'iview'
import Tester from './components/common/Tester'
import echarts from 'echarts'

window.echarts = echarts
Vue.use(iView)
Vue.config.productionTip = false
/* eslint-disable no-new */
window.Bus=new Vue()
window.Tester=Tester
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
