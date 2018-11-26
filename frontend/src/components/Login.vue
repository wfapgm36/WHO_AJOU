<template>
  <div class="login">
    <h1 align-h="center">This is Login Page!</h1>

    <b-container>
      <b-row align-h="center" class="login1">
        <b-col cols='5'>
          <b-card class="login2">
            <h3 class="login3">로그인</h3>
            <b-form @submit="login"
                    @reset="onReset" v-if="show">
              <b-form-group id="ID-InputGroup"
                            label="ID:"
                            label-for="id-input">
                <b-form-input id="id-input"
                              type="text"
                              v-model="form.name"
                              required
                              placeholder="이메일 주소">
                </b-form-input>
              </b-form-group>

              <b-form-group id="password-InputGroup"
                            label="Password:"
                            label-for="pwd-input">
                <b-form-input id="pwd-input"
                              type="password"
                              v-model="form.password"
                              required
                              placeholder="비밀번호">
                </b-form-input>
              </b-form-group>

              <b-form-group id="RememberCheck">
                <b-form-checkbox-group v-model="form.checked" id="Checks">
                  <b-form-checkbox value="me">아이디 기억하기</b-form-checkbox>
                </b-form-checkbox-group>
              </b-form-group>

              <div class="d-flex justify-content-between">
                <div>
                    <b-button type="submit" variant="primary">로그인</b-button>&nbsp;

                  <b-button type="reset" variant="danger">초기화</b-button>
                </div>
                <div>
                  <a href="#" v-b-modal.modal1>비밀번호 찾기</a>
                </div>
              </div>

            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <b-modal id="modal1" title="Forgot Password">
      Nothing yet.
    </b-modal>

  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {
        name: '',
        password: '',
        checked: []
      },
      show: true
    }
  },
  methods: {
    login (evt) {
      evt.preventDefault()
      let username = this.form.name
      let password = this.form.password
      this.$store.dispatch('LOGIN', {username, password})
        .then(() => {
          this.redirect()
        })
        .catch(err => {
          console.log(err)
          alert(err)
        })
    },
    redirect () {
      const {search} = window.location
      console.log(search)
      const tokens = search.replace(/^\?/, '').split('&')
      let {returnPath} = tokens.reduce((qs, tkn) => {
        const pair = tkn.split('=')
        qs[pair[0]] = decodeURIComponent(pair[1])
        return qs
      }, {})
      if (!returnPath) {
        returnPath = '/main'
      }
      console.log(returnPath)
      // 리다이렉트 처리
      this.$router.push(returnPath)
    },
    onReset (evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.form.email = ''
      this.form.password = ''
      this.form.checked = []
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
