<template>
  <div class="app">
      <b-navbar toggleable="md" type="dark" class="nav-background">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">{{isLogin}}::WHO AJOU?</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

          <b-navbar-nav>
            <b-nav-item><router-link to = "/main">메인</router-link></b-nav-item>
            <b-nav-item v-if= "isLogin"><router-link to = "/board">게시판</router-link></b-nav-item>
            <b-nav-item id="signup" v-if= "!isLogin"><router-link to = "/signup">회원가입</router-link></b-nav-item>
            <b-nav-item v-if= "isLogin"><router-link to = "/logout">로그아웃</router-link></b-nav-item>
          </b-navbar-nav>

          <b-nav-item-dropdown right v-if= "isLogin">
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>마이페이지</em>
            </template>
            <b-dropdown-item ><router-link to ="/profile">프로필</router-link></b-dropdown-item>
            <b-dropdown-item ><router-link to ="/user-list">유저 리스트</router-link></b-dropdown-item>
          </b-nav-item-dropdown>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      isLogin: false
    }
  },
  created() {
    /**********로그인 전후 네비게이션 바에 보여지는 목록을 다르게 해주기 위해 이벤트 버스 발생 *************/
    this.$EventBus.$on('removeTab', (message) => {
        this.isLogin = message;
    });
  }
}
</script>

<style>
body {
  background-color: lightgray;

}
.navbar{
  position: relative;
 
}
.nav-background{
  background-color: black;
}
</style>
