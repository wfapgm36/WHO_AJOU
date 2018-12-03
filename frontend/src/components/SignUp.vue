<template>
  <div class="signup">
    <h1 align-h="center">This is Sign Up Page!</h1>
    <b-form @submit="postUser" @reset="onSubmit" v-if="show">

        <b-form-group id="ID-InputGroup" label="ID:" label-for="id-input">
            <b-form-input id="id-input"
                type="text"
                v-model="form.name"
                required
                placeholder="이름">
            </b-form-input>
        </b-form-group>

        <b-form-group id="password-InputGroup" label="Password:" label-for="pwd-input">
            <b-form-input id="pwd-input"
                type="password"
                v-model="form.password"
                required
                placeholder="비밀번호">
            </b-form-input>
        </b-form-group>

      <b-form-group id="password-InputCheckGroup" label="Password check:" label-for="pwd-input-check">
        <b-form-input id="pwd-input-check"
                      type="password"
                      v-model="form.password_check"
                      required
                      placeholder="비밀번호확인">
        </b-form-input>
      </b-form-group>

        <b-form-group id="nickname-InputGroup" label="Nickname:" label-for="nickname-input">
            <b-form-input id="nickname-input"
                type="text"
                v-model="form.nickname"
                required
                placeholder="별명">
            </b-form-input>
        </b-form-group>

        <b-form-group id="email-InputGroup" label="Email:" label-for="email-input">
            <b-form-input id="email-input"
                type="email"
                v-model="form.email"
                required
                placeholder="이메일 주소">
            </b-form-input>
        </b-form-group>

        <b-form-group id="major-InputGroup" label="Major:" label-for="majour-input">
        <b-form-select id="majour-input"
                      :options="majors"
                      required
                      v-model="form.major">
        </b-form-select>
        </b-form-group>
        <b-row align-h="center">
            <b-button type="submit" variant="primary" align-h="center">회원가입</b-button>
        </b-row>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data () {
    return {
      form: {
        email: '',
        name: '',
        nickname: '',
        password: '',
        password_check: '',
        major: null
      },
      majors: [
        { text: '선택', value: null },
        '경영학과', '디지털미디어학과', '소프트웨어학과', '응용화학생명공학과'
      ],
      show: true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    postUser (evt) {
      evt.preventDefault() // 디버깅용
      if (this.form.password_check === this.form.password) {
        this.$http.post('/api/signup', { // 경로확인
          username: this.form.name,
          password: this.form.password,
          email: this.form.email,
          nickname: this.form.nickname,
          major: this.form.major
        })
          .then((res) => {
            const status = res.status
            console.log(status)
            // redirect logic
            if (status == '200') {
              alert('인증 이메일을 보냈습니다. 이메일 인증 후에 로그인이 가능합니다.')
              this.$router.push('/')
            } else if (status == '202') {
              alert('이미 존재하는 ID 입니다.')
            } else if (status == '204') {
              alert('이미 인증된 이메일 주소 입니다.')
            }
          }).catch((err) => {
            console.log(err)
          })
      } else {
        alert('입력된 비밀번호가 일치하지 않습니다.')
      }
    }
  }
}
</script>
