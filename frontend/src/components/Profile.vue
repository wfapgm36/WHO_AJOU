<template>
  <b-card no-body>
    <b-tabs card>
      <b-tab title="내정보" active>
        <b-card bg-variant="light">
          <b-form @reset="onSubmit" v-if="show">
            <b-form-group horizontal
                          breakpoint="lg"
                          label="회원정보"
                          label-size="lg"
                          label-class="font-weight-bold pt-0"
                          class="mb-0">
              <b-form-group horizontal
                            label="ID:"
                            label-class="text-sm-right"
                            label-for="id-input">
                <b-form-input id="id-input"
                              v-model="form.name"
                              required
                              disabled
                              placeholder="아이디"
                ></b-form-input>
              </b-form-group>
              <b-form-group horizontal
                            label="Current Password:"
                            label-class="text-sm-right"
                            label-for="current-pwd-input">
                <b-form-input id="current-pwd-input"
                              type="password"
                              v-model="form.current_password"
                              required
                              :disabled="!status"
                              placeholder="현재 비밀번호"></b-form-input>
              </b-form-group>
            </b-form-group>
            <b-form-group horizontal
                          label="Password:"
                          label-class="text-sm-right"
                          label-for="pwd-input">
              <b-form-input id="pwd-input"
                            type="password"
                            v-model="form.password"
                            required
                            :disabled="!status"
                            placeholder="비밀번호"></b-form-input>
            </b-form-group>
            <b-form-group horizontal
                          label="Password check:"
                          label-class="text-sm-right"
                          id="password-InputCheckGroup"
                            label-for="pwd-input-check">
                <b-form-input id="pwd-input-check"
                              type="password"
                              v-model="form.password_check"
                              required
                              :disabled="!status"
                              placeholder="비밀번호확인">
                </b-form-input>
              </b-form-group>
              <b-form-group horizontal
                            label="Nickname:"
                            id="nickname-InputGroup"
                            label-class="text-sm-right"
                            label-for="nickname-input">
                <b-form-input id="nickname-input"
                              type="text"
                              v-model="form.nickname"
                              required
                              placeholder="별명">
                </b-form-input>
              </b-form-group>
              <b-form-group horizontal
                            label-class="text-sm-right"
                            id="email-InputGroup"
                            label="Email:"
                            label-for="email-input">
                <b-form-input id="email-input"
                              type="email"
                              v-model="form.email"
                              required
                              disabled
                              placeholder="이메일 주소">
                </b-form-input>
              </b-form-group>
              <b-form-group horizontal
                            label-class="text-sm-right"
                            id="major-InputGroup"
                            label="Major:"
                            label-for="major-input">
                <b-form-select id="major-input"
                               :options="majors"
                               required
                               v-model="form.major">
                </b-form-select>
              </b-form-group>
              <b-form-group>
                <b-form-checkbox id="checkbox1"
                                 v-model="status">
                  비밀번호 변경을 하고싶어요!
                </b-form-checkbox>
              </b-form-group>
          </b-form>
          <b-row align-h="center">
            <b-button @click="updateUser" v-b-popover.hover="'비밀번호 수정을 원하시는 경우에만 현재 비밀번호를 입력해주세요!'" title="비밀번호 유의사항" type="submit" variant="primary" align-h="center">수정</b-button>
          </b-row>
        </b-card>
      </b-tab>
      <b-tab title="내가 쓴 글" @click = "getMyEval()">
         <div class = "myEvaluation" >
          <div id = "myEval_container">
              <v-flex xs12 >
                 <v-container fluid>
                   <v-layout row wrap>
                     <v-flex
                       id = "evaluate" v-for="item in my_eval_subject" v-bind:key="item.id"
                       xs3
                     >
                     <v-hover>
                       <v-card
                           slot-scope="{ hover }"
                           :class="`elevation-${hover ? 12 : 2}`"
                           class="mx-auto"
                           width="345"
                           flat tile>
                          <div class ="evalContainer" >
                             <h3 style="padding-top:20px">Course</h3>
                             <h5>{{item.lecture}}</h5>
                             <h3>Professor</h3>
                             <h5>{{item.professor}}</h5>
                             <v-rating v-model="item.evaluation[0].totalGrade"
                                        color="yellow darken-3"
                                        background-color="grey darken-1"
                                        readonly=true>
                            </v-rating>
                            <h5 class = "circle">{{parseFloat(item.evaluation[0].totalGrade).toFixed(1)}}</h5>
                            <h5>{{item.semester}}</h5><br>
                            <router-link :to ="{name:'eval-view',params:{id: item.id}}">
                              <button type="submit" class = "plusView">Read More</button>
                            </router-link>
                          </div>
                       </v-card>
                     </v-hover>
                     </v-flex>
                   </v-layout>
                 </v-container>
               </v-flex>
          </div>
        </div>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
export default {
  name: 'Profile',
  data () {
    return {
      form: {
        email: '',
        name: '',
        nickname: '',
        current_password: '',
        password: '',
        password_check: '',
        major: null
      },
      majors: [
        {text: '선택', value: null},
        '경영학과', '디지털미디어학과', '소프트웨어학과', '응용화학생명공학과'
      ],
      my_eval_subject: [],
      show: true,
      status: true
    }
  },
  methods: {
    getMyEval() {
        this.$http.get("/api/class/evaluation")
          .then((res) => {
          this.my_eval_subject = res.data;
          console.log('강의평가모든정보')
          console.log(res.data)
        });
    },
    onSubmit (evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    updateUser (evt) {
      evt.preventDefault() // 디버깅용
      if (this.status === false) {
        this.$http.put('/api/profile/user', {
          isChangePwd: false,
          username: this.form.username,
          email: this.form.email,
          nickname: this.form.nickname,
          major: this.form.major
        })
          .then(res => {
            const status = res.status
            if (status === 200) {
              alert('회원정보 수정이 완료되었습니다.')
              this.$router.push('/main')
            } else if (status === 205) {
              alert('이미 사용중인 닉네임입니다.')
            }
          }).catch(e => { alert(e) })
      } else {
        if (this.form.password === this.form.password_check) {
          this.$http.put('/api/profile/user', {
            isChangePwd: true,
            username: this.form.username,
            current_password: this.form.current_password,
            password: this.form.password,
            email: this.form.email,
            nickname: this.form.nickname,
            major: this.form.major
          })
            .then(res => {
              const status = res.status
              if (status === 200) {
                alert('비밀번호 변경 및 회원정보 수정이 완료되었습니다.')
                this.$router.push('/main')
              } else if (status === 203) {
                alert('[Error] 현 비밀번호가 일치하지 않습니다.')
              } else if (status === 205) {
                alert('이미 사용중인 닉네임입니다.')
              }
            }).catch(e => { alert(e) })
        } else {
          alert('비밀번호와 비밀번호 확인이 서로 같지 않습니다.')
        }
      }
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.$http.get('/api/profile/user')
      .then(res => {
        this.form.name = res.data.username
        this.form.password = res.data.password
        this.form.email = res.data.email
        this.form.nickname = res.data.nickname
        this.form.major = res.data.major
      })
    next()
  },
  created () {
    this.$EventBus.$emit('removeTab', true)
    this.$http.get('/api/profile/user')
      .then(res => {
        this.form.name = res.data.username
        this.form.email = res.data.email
        this.form.nickname = res.data.nickname
        this.form.major = res.data.major
      })
  }
}
</script>
<style>
#myEval_container{
    margin-top: 50px;
}

.myEvalContainer{
    border:3px solid yellow;
    border-radius: 50px;
    width:330px;
    height: 450px;
    background:white;
    text-align: center;
}

.circle{
    border:thick solid yellow;
    border-radius: 100%;
    padding-top:5px;
    padding-bottom: 5px;
    width:80px;
    font-size:45px;
    margin-left:38%;
    margin-right:38%;
    margin-top:25px;
    margin-bottom:30px;
}

.plusView{
    margin-top:30px;
    color:white;
    height:40px;
    font-weight: bold;
    background: lightblue;
    text-align: center;
    border:transparent;
    border-radius: 10px;
}
  .card-header{
    padding-top : 2vh;
    font-size:18px;
    font-weight: bold;
  }
    .nav-tabs .nav-link{
    height: 7vh;
    padding-left:20vw;
    padding-right:20vw;
    margin-top:3vh;
    margin-left:5px;
  }
</style>
