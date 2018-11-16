import Vue from 'vue'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import Main from '@/components/Main'
import Profile from '@/components/Profile'
import UserList from '@/components/UserList'
import Board from '@/components/Board'
import BoardView from '@/components/BoardView'
import BoardWrite from '@/components/BoardWrite'

Vue.use(BootstrapVue)
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
      children: [
        {
          path: 'profile',
          name: 'profile',
          component: Profile
        },
        {
          path: 'user-list',
          name: 'user-list',
          component: UserList
        }
      ]
    },
    {
      path: '/board',
      name: 'board',
      component: Board,
      children: [
        {
          path: 'view',
          name: 'view',
          component: BoardView
        },
        {
          path: 'write',
          name: 'boardWrite',
          component: BoardWrite
        }
      ]
    }
  ]
})
