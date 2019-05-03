import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/user/Login'
import Index from '@/components/user/Index'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path:'/',
      redirect:'login'
    },
    {
      path: '/login',

      component: Login
    },
    {
      path: '/index',
      component: Index
    }
  ]
})
