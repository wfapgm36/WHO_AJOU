<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" class="nav-background">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand id = "navbar-brand" href="/main" tag="h1">
        <h1><img src="../../assets/logo.png" height="48" width="48" alt="BV"><b-badge pill variant="white">WHO AJOU?</b-badge></h1></b-navbar-brand>
     <h5 id = "nickname" v-if="isLogin">{{nickname}}님 안녕하세요!</h5>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav>
            <b-nav-item>
              <router-link to="/main" style="color: white"><b-badge class = "menu" variant="white">메인</b-badge></router-link>
            </b-nav-item>
            <b-nav-item v-if="isLogin">
              <router-link to="/board" style="color: white"><b-badge  class = "menu" variant="white">게시판</b-badge></router-link>
            </b-nav-item>
            <b-nav-item id="signup" v-if="!isLogin">
              <router-link to="/signup" style="color: white"><b-badge  class = "menu" variant="white">회원가입</b-badge></router-link>
            </b-nav-item>
            <b-nav-item v-if="isLogin">
              <a href="/" @click.prevent="onClickLogout" style="color: white"><b-badge  class = "menu" variant="white">로그아웃</b-badge></a>
            </b-nav-item>
          </b-navbar-nav>

          <b-nav-item-dropdown right v-if="isLogin">
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em style="color: white"><b-badge class = "menu" variant="white">마이페이지</b-badge></em>
            </template>
            <b-dropdown-item>
              <router-link to="/profile">프로필</router-link>
            </b-dropdown-item>
            <b-dropdown-item v-if="admin === 1">
              <router-link to="/userlist">유저 리스트</router-link>
            </b-dropdown-item>
          </b-nav-item-dropdown>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLogin: false,
      nickname: '',
      admin: ''
    }
  },
  methods: {
    onClickLogout () {
      this.$store.dispatch('LOGOUT')
        .then(() => {
          this.$cookies.remove('nickname')
          this.nickname = ''
          this.$router.push('/')
          this.isLogin = false
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
    background-color: #9197B5;
  }
</style>
