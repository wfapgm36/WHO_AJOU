<template>
  <div class="email_verification">
    <h1 align-h="center">This is Verification Page!</h1>
    <b-form @submit="veri_email" @reset="onSubmit" v-if="show">
      <b-row align-h="center">
        <b-button type="submit" variant="primary" align-h="center" @>이메일 인증</b-button>
      </b-row>
    </b-form>
  </div>
</template>

<script>export default {
  name: 'Email_Verification',
  data () {
    return {
      show: true
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
        console.log(status)
        console.log(res)
        // redirect logic
        if (status == '200') {
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


