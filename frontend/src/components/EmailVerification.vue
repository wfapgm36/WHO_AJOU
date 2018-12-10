<template>
  <v-jumbotron
    id = "jumbo"
    height="1000px"
    dark
    :gradient="gradient"
    src="https://images.unsplash.com/photo-1543892653-a8c35efe6445?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
  >
  <div class="email_verification">
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card id="email_card">
          <v-img
            class="white--text"
            height="200px"
            src="http://file3.instiz.net/data/file3/2018/01/31/f/b/9/fb95359fc1507e60785116c6d155ea5e.jpg"
          >
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="headline">아주대학교 강의 공유 사이트<br>WhoAjou</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
          <v-card-title>
            <div>
              <span class="grey--text">Since 2018.12.11</span><br>
              <span>이메일 인증 페이지입니다.</span><br>
              <span>아주대학교 강의 정보를 나눠보세요!</span>
            </div>
          </v-card-title>
          <v-card-actions>
            <b-form @submit="veri_email" @reset="onSubmit" v-if="show">
              <v-layout align-center justify-center>
                  <v-btn id="email_btn" flat color="orange" type="submit" align-h="center">이메일 인증</v-btn>
              </v-layout>
            </b-form>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
  </v-jumbotron>
</template>

<script>export default {
  name: 'Email_Verification',
  data () {
    return {
      show: true,
      gradient: 'to top right, rgba(0,0,0, .7), rgba(40,40,40, .7)'
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    veri_email: function (evt) {
      evt.preventDefault()
      this.$http.get('/api/email-verification/' + this.$route.params.URL, {
        api_key: this.$route.params.URL}).then((res) => {
        const status = res.status
        // redirect logic
        if (status === 200) {
          alert('이메일 인증에 성공하였습니다. 로그인을 해주세요.')
          this.$router.push('/')
        }
      })
        .catch((err) => {
          alert('이메일 인증에 실패하였습니다.')
          console.log(err)
        })
    }
  }
}
</script>
<style>

  .email_verification{
    margin-top: 200px;
  }

  #email_btn{
    display: inline-block;
  }
  #email_card{
    width: 600px;
  }
</style>
