<template>
  <div id="app">
      <b-navbar toggleable="md" type="dark" class="nav-background">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">WHO AJOU?</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

          <b-navbar-nav>
            <b-nav-item href="/main">메인</b-nav-item>
            <b-nav-item href="/board">게시판</b-nav-item>
            <b-nav-item id="signup" href="/signup">회원가입</b-nav-item>
            <b-nav-item href="/logout">로그아웃</b-nav-item>
          </b-navbar-nav>

          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>마이페이지</em>
            </template>
            <b-dropdown-item href="/main/profile">프로필</b-dropdown-item>
            <b-dropdown-item href="/main/user-list">유저 리스트</b-dropdown-item>
          </b-nav-item-dropdown>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  background-color: lightgray
}
.nav-background{
  background-color: black
}
</style>
