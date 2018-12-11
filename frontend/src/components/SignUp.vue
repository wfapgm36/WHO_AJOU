<template>
  <div class="signup" style = "width:80%; margin:auto; padding-top:30px;">
    <h2 style = "text-align : center; ">회원가입</h2>
    <b-form @submit="postUser" @reset="onSubmit" v-if="show">
        <b-form-group id="ID-InputGroup" label="ID:" label-for="id-input">
           <v-text-field
            v-model="form.name"
            label="아이디"
            single-line
            hide-details
          ></v-text-field>
        </b-form-group>

        <b-form-group id="password-InputGroup" label="Password:" label-for="pwd-input">
          <v-text-field
            type="password"
            v-model="form.password"
            label="비밀번호"
            single-line
            hide-details
          ></v-text-field>
        </b-form-group>

      <b-form-group id="password-InputCheckGroup" label="Password check:" label-for="pwd-input-check">
        <v-text-field
            type="password"
            v-model="form.password_check"
            label="비밀번호 확인"
            single-line
            hide-details
          ></v-text-field>
      </b-form-group>

        <b-form-group id="nickname-InputGroup" label="Nickname:" label-for="nickname-input">
          <v-text-field
            v-model="form.nickname"
            label="별명"
            single-line
            hide-details
          ></v-text-field>
        </b-form-group>

        <b-form-group id="email-InputGroup" label="Email:" label-for="email-input">
          <v-text-field
            v-model="form.email"
            label="이메일 주소"
            single-line
            hide-details
          ></v-text-field>
        </b-form-group>

        <b-form-group id="major-InputGroup" label="Major:" label-for="majour-input">
            <b-form-select id="major-input"
                      :options="majors"
                      required
                      v-model="form.major"
                      >
        </b-form-select>
        </b-form-group>
        <b-form-group>
        <b-row align-h="center">
            <b-button type="submit" @click="$emit('close')" align-h="center" style = "background-color : #C6D6F7; border:#C6D6F7; font-weight: bold; margin-top:20px;">작성 완료</b-button>
        </b-row>
        </b-form-group>
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
        { text: '선택', value: null }
      ],
      show: true
    }
  },
  created () {
    this.getMajor()
  },
  methods: {
    // 모든 학과이름과 정보 받아오기
    getMajor () {
      this.$http
        .get('/api/major/all')
        .then(res => {
          for (var i = 0; i < res.data.length; i++) {
            this.majors.push({text: res.data[i].major, value: res.data[i].major})
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
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
            if (status === 200) {
              alert('인증 이메일을 보냈습니다. 이메일 인증 후에 로그인이 가능합니다.')
              this.$router.push('/')
            } else if (status === 202) {
              alert('이미 존재하는 ID 입니다.')
            } else if (status === 204) {
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
<style>
 #major-input{
   margin-top:20px;
 }
 .v--modal-overlay .v--modal-box {
  border-radius: 50px;
  background-color: rgba(255, 255, 255, 0.705);
}
</style>
