// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import PC from './PC'
import router from './router'
import store from './store'
import 'animate.css';
import iView from 'iview'
import Tester from './components/common/Tester'
import echarts from 'echarts'
import 'iview/dist/styles/iview.css'
import fun from './common/fun'
import mintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import {Toast} from 'mint-ui'
import {MessageBox} from 'mint-ui'
import axios from 'axios'
import config from './components/config/config'

let bus=new Vue()
import animate from 'animate.css'
Vue.use(mintUI);

window.Toast=Toast;

window.axios=axios
window.MessageBox=MessageBox;

window.config=config

window.echarts = echarts
window.fun=fun
Vue.use(iView)
Vue.config.productionTip = false
/* eslint-disable no-new */
window.Bus=new Vue()
window.Tester=Tester
new Vue({
  el: '#app',
  router,
  store,
  components: { PC },
  template: '<PC/>'
})
