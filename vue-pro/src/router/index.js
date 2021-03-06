import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Permit from '@/components/Permit.vue'
import Search from '@/components/Search.vue'
import Home from '@/components/Home.vue'
import AddCustom from '@/components/AddCustom.vue'
import CustomDtl from '@/components/customDtl.vue'
import EmployDtl from '@/components/EmployDtl.vue'
import AddEmploy from '@/components/AddEmploy.vue'
import GroupChat from '@/components/GroupChat.vue'
import store from '../store/index'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/permit',
      name: 'permit',
      component: Permit
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/addCustom',
      name: 'addCustom',
      component: AddCustom
    },
    {
      path: '/customDtl',
      name: 'customDtl',
      component: CustomDtl
    },
    {
      path: '/employDtl',
      name: 'employDtl',
      component: EmployDtl
    },
    {
      path: '/addEmploy',
      name: 'addEmploy',
      component: AddEmploy
    },
    {
      path: '/groupChat',
      name: 'groupChat',
      component: GroupChat
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (!store.state.user.user && to.name !== 'login') {
    next('login')
  } else {
    next()
  }
})
export default router
