<template>
  <div class="login">
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
                              placeholder="아이디">
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
                  <b-button type="submit" class = "login_btn">로그인</b-button>&nbsp;
                  <b-button type="reset" class = "login_btn">초기화</b-button>
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
      <b-card id="forget_card" bg-variant="light">
        <b-form v-if="show">
          <b-form-group horizontal
                        breakpoint="lg"
                        label="비밀번호 찾기"
                        label-size="lg"
                        label-class="font-weight-bold pt-0"
                        class="mb-0">
          </b-form-group>
          <b-form-group horizontal
                        label="ID:"
                        label-class="text-sm-right"
                        label-for="forget-id-input">
            <b-form-input id="forget-id-input"
                          v-model="forget.name"
                          required
                          placeholder="아이디"
            ></b-form-input>
          </b-form-group>
          <b-form-group horizontal
                        label="email:"
                        label-class="text-sm-right"
                        label-for="email-input">
            <b-form-input id="email-input"
                          v-model="forget.email"
                          required
                          placeholder="이메일"
            ></b-form-input>
          </b-form-group>
          <b-row align-h="center">
            <b-button @click="find_password" v-b-popover.hover="'회원가입시 등록했던 아이디와 이메일 주소를 입력해주세요!'"
                      title="비밀번호 찾기" type="submit" variant="primary" align-h="center">찾기
            </b-button>
          </b-row>
        </b-form>
      </b-card>
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
      forget: {
        name: '',
        email: ''
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
    },
    find_password (evt) {
      evt.preventDefault()
      this.$http.post('/api/user/password', {
        username: this.forget.name,
        email: this.forget.email
      }).then(res => {
        const status = res.status
        if (status === 200) {
          alert('비밀번호를 0000 으로 초기화하였습니다.로그인 후 반드시 비밀번호를 변경해주세요')
        } else if (status === 203){
          alert('해당 아이디와 이메일에 해당하는 회원이 없습니다')
        }
      }).catch(err => {
        alert(err)
      })
    }
  }
}
</script>
<style>
.login_btn {
  background-color:#C6D6F7;
  border:transparent;
  font-weight: bold;
}

</style>
