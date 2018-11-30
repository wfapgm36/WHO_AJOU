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
import BoardUpdate from '@/components/BoardUpdate'
import EmailVerification from '@/components/EmailVerification'
import Evaluation from '@/components/Evaluation'
import store from '../store'

const requireAuth = () => (from, to, next) => {
  store.dispatch('CHECK').then(isAuthenticated => {
    if (isAuthenticated) return next()
    alert('로그인이 필요합니다.')
    next('/?returnPath=' + from.name)
  })
}

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
      path: '/email-verification/:URL',
      name: 'email-verification',
      component: EmailVerification
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
      beforeEnter: requireAuth()
    },
    {
      path: '/board',
      name: 'board',
      component: Board,
      beforeEnter: requireAuth()
    },
    {
      path: '/write',
      name: 'board-write',
      component: BoardWrite,
      beforeEnter: requireAuth()
    },
    {
      path: '/view/:id',
      name: 'board-view',
      component: BoardView,
      beforeEnter: requireAuth()
    },
    {
      path: '/update/:id',
      name: 'board-update',
      component: BoardUpdate,
      beforeEnter: requireAuth()
    },
    {
      path: '/userlist',
      name: 'userlist',
      component: UserList,
      beforeEnter: requireAuth()
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      beforeEnter: requireAuth()
    },
    {
      path: '/evaluation/:id',
      name: 'evaluation',
      component: Evaluation,
      beforeEnter: requireAuth()
    }
  ]
})
