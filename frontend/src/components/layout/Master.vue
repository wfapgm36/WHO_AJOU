<template>
  <div id="app">
             <let-it-snow
      v-bind="snowConf"
      :show="show"    
    ></let-it-snow>
    <b-navbar toggleable="md" type="dark" class="nav-background">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand id = "navbar-brand" variant="faded" href="/main" tag="h1">
        <img src="../../assets/main.png" height="60" width="200" alt="BV"></b-navbar-brand>
     <h5 id = "nickname" class="font-weight-medium title" v-if="isLogin">{{nickname}}님 안녕하세요!</h5>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav>
            <b-nav-item>
              <router-link to="/main" style="color: white" class="font-weight-bold title">메인 |</router-link>
            </b-nav-item>
            <b-nav-item v-if="isLogin">
              <router-link to="/board" style="color: white" class="font-weight-bold title">게시판 |</router-link>
            </b-nav-item>
            <b-nav-item id="login" v-if="!isLogin">
              <router-link to="/" class="font-weight-bold title" style="color: white" @click.native = "loginPopup">로그인 |</router-link>
            </b-nav-item>
            <b-nav-item id="signup" v-if="!isLogin">
              <router-link to="/" class="font-weight-bold title" style="color: white" @click.native = "signupPopup" >회원가입</router-link>
            </b-nav-item>
            <b-nav-item v-if="isLogin">
              <router-link to="/" @click.native = "onClickLogout"  class="font-weight-bold title" style="color: white">로그아웃 |</router-link>
            </b-nav-item>
          </b-navbar-nav>

          <b-nav-item-dropdown right v-if="isLogin">
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em style="color: white" class="font-weight-black title">마이페이지</em>
            </template>
            <b-dropdown-item href="/profile">
              프로필
            </b-dropdown-item>
              <b-dropdown-item href="managemajor" v-if="admin === 1">
              전공 관리
            </b-dropdown-item>
            <b-dropdown-item href="userlist" v-if="admin === 1">
              유저 리스트
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

  <modals-container/>
    <router-view></router-view>
  </div>
</template>

<script>
import DelPopup from './../Login'
import SignPopup from './../SignUp'

export default {
  data () {
    return {
      isLogin: false,
      nickname: '',
      admin: '',
      snowConf: {
            windPower : 1,  
            speed : 3,
            count : 15,
            size : 10,
            opacity : 1,
            images: ['https://raw.githubusercontent.com/bob-chen/let_it_snow/master/demo/snow.png']
        },
        show: false      
    }
  },
   mounted () {
      this.show = true
      setTimeout( () => {
          this.show = false
      }, 30000) 
  } ,
  methods: {
    loginPopup () {
      console.log('누름')
      console.log(this.$modal)
      this.$modal.show(DelPopup, {
        modal: this.$modal }, {
        name: 'dynamic-modal',
        width: '600px',
        height: '400px',
        draggable: true
      })
    },
    signupPopup () {
      this.$modal.show(SignPopup, {
        modal: this.$modal }, {
        name: 'dynamic-signup-modal',
        width: '700px',
        height: '700px',
        draggable: true
      })
    },
    onClickLogout () {
      this.$store.dispatch('LOGOUT')
        .then(() => {
          this.$cookies.remove('nickname')
          this.nickname = ''
          this.isLogin = false
          this.$router.push("/")
          location.reload();
        })
    },
    isAuthenticated () {
      this.$store.dispatch('CHECK').then(check => {
        this.isLogin = check
        this.getUserInfo()
      })
    },
    getUserInfo () {
      this.$http
        .get('/api/user').then((res) => {
          this.admin = res.data.isAdmin
          this.$cookies.set('nickname', res.data.nickname, 3600 * 24)
          this.nickname = this.$cookies.get('nickname')
        })
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.isAuthenticated()
    next()
  },
  created () {
    /** ********로그인 전후 네비게이션 바에 보여지는 목록을 다르게 해주기 위해 이벤트 버스 발생 *************/
    this.$EventBus.$on('removeTab', (message) => {
      this.isAuthenticated()
    })
  }
}
</script>

<style>
.menu{
  font-size: 15px;
}
#nickname{
  color:white;
}
#navbar-brand {
  padding-top:10px;
  transform: translateX(-50%);
  left: 50%;
  font-weight: bold;
  position: absolute;
}

  body {
    background-color: white;
  }
  .navbar {
    position: relative;
  }
  .nav-background {
    background: linear-gradient(to top, rgb(188, 238, 201) 1%, #4CAF50 20%,#1B5E20 65%);
    
  }
</style>
