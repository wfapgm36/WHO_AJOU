<template>
  <div class="evalwrite">
    <form @submit="onSubmit">
      <div class="evalWrite">
       <b-row class="justify-content-md-center" id="choice">
          <b-col col lg="1">
            <b-form-select required="true" v-model="majorSelected" class="mb-3" size="sm">
              <option :value="null">학과</option>
              <option v-for="major in majorOptions" v-bind:key ="major.id">{{major.value}}</option>
            </b-form-select>
          </b-col>
          <b-col cols="10" md="auto">
            <b-form-select required="true" v-model="subjectSelected" class="mb-3" size="sm">
              <option :value="null">과목명</option>
              <option v-for="subject in subjectOptions" v-bind:key ="subject.id">{{subject.value}}</option>
            </b-form-select>
          </b-col>
          <b-col col lg="1">
            <b-form-select required="true" v-model="professorSelected" class="mb-3" size="sm">
              <option :value="null">교수명</option>
              <option v-for="professor in professorOptions" v-bind:key ="professor.id">{{professor.value}}</option>
            </b-form-select>
          </b-col>
          <b-col col lg="1">
            <b-form-select required="true" v-model="semesterSelected" class="mb-3" size="sm">
              <option :value="null">수강학기</option>
              <option v-for="semester in semesterOptions" v-bind:key ="semester.id">{{semester.value}}</option>
            </b-form-select>
          </b-col>
        </b-row>

        <b-row class="justify-content-md-center">
          <b-col col lg="2" class="star" align="center">
            <h5>과제평가</h5>
            <star-rating
              :inline="true"
              border-color="transparent"
              :show-rating="false"
              :increment="0.5"
              @rating-selected="setAssignRating"
              :star-size="30"
            ></star-rating>
          </b-col>
          <b-col col lg="2" md="auto" class="star" align="center">
            <h5>팀플평가</h5>
            <star-rating
              :inline="true"
              :show-rating="false"
              :increment="0.5"
              @rating-selected="setTeamRating"
              :star-size="30"
            ></star-rating>
          </b-col>
        </b-row>

        <b-row class="justify-content-md-center">
          <b-col col lg="2" class="star" align="center">
            <h5>강의력 평가</h5>
            <star-rating
              :inline="true"
              :show-rating="false"
              :increment="0.5"
              @rating-selected="setLectureRating"
              :star-size="30"
            ></star-rating>
          </b-col>
          <b-col col lg="2" class="star" md="auto" align="center">
            <h5>시험평가</h5>
            <star-rating
              :inline="true"
              :show-rating="false"
              :increment="0.5"
              @rating-selected="setExamRating"
              :star-size="30"
            ></star-rating>
          </b-col>
        </b-row>
      </div>

      <div class="diffi">
        <b-form-select required="true" v-model="diffiSelected" class="mb-3" size="sm">
              <option :value="null">수강신청 난이도</option>
              <option v-for="diffi in diffiOptions" v-bind:key ="diffi.id">{{diffi.value}}</option>
            </b-form-select>
      </div>

      <div id="evalText">
        <h3>시험과 수업은 어떤가요?</h3>
        <b-form-textarea
          class="evaltext"
          v-model="text1"
          placeholder="Enter something"
          :rows="3"
          :max-rows="6"
        ></b-form-textarea>

        <h3>팀플과 과제는 어떤가요?</h3>
        <b-form-textarea
          class="evaltext"
          v-model="text2"
          placeholder="Enter something"
          :rows="3"
          :max-rows="6"
        ></b-form-textarea>

        <h3>이런 사람에게 추천해요.</h3>
        <b-form-textarea
          class="evaltext"
          v-model="text3"
          placeholder="Enter something"
          :rows="3"
          :max-rows="6"
        ></b-form-textarea>

        <h3>이런 사람에게 추천하지 않아요.</h3>
        <b-form-textarea
          class="evaltext"
          v-model="text4"
          placeholder="Enter something"
          :rows="3"
          :max-rows="6"
        ></b-form-textarea>

        <b-button class="submitBtn" type="submit" variant="primary">작성</b-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'evaluation-write',
  data () {
    return {
      allMajorData: [],

      majorSelected: null,
      subjectSelected: null,
      professorSelected: null,
      semesterSelected: null,
      diffiSelected: null,
      // 강의 정보
      userId: '',
      // code: "F001",
      professor: '',
      difficult: '',
      // 강의 평점
      assignRating: '',
      teamRating: '',
      lectureRating: '',
      examRating: '',
      // 강의 메모
      text1: '',
      text2: '',
      text3: '',
      text4: '',
      // 선택 옵션
      majorOptions: [],
      subjectOptions: [],
      professorOptions: [],
      semesterOptions: [
        {value: '2018-1 학기'},
        {value: '2017-2 학기'},
        {value: '2017-1 학기'}
      ],
      diffiOptions: [
        { value: '상' },
        { value: '중' },
        { value: '하' }
      ]
    }
  },
  created () {
    this.getMajor()
    this.getUserId()
  },
  // select 시, 학과명이 바뀔때마다 과목명과 교수명을 다시 받기 위함
  watch: { 'majorSelected': function () {
    this.getSubject()
  }
  },
  methods: {
    setAssignRating (rating) {
      this.assignRating = rating
    },
    setTeamRating (rating) {
      this.teamRating = rating
    },
    setLectureRating (rating) {
      this.lectureRating = rating
    },
    setExamRating (rating) {
      this.examRating = rating
    },
    // 유저아이디 가져오기
    getUserId () {
      this.$http.get('/api/profile/user')
        .then(res => {
          this.userId = res.data.username
        })
    },
    // majorOption의 데이터에 넣어줄 함수
    // 학과 선택 함수
    getMajor () {
      this.$http
        .get('/api/major/all')
        .then(res => {
          this.allMajorData = res.data // 미리 저장해 두어, 학과 선택 후 교수명 불러올때 디비에 또 가지 않기 위함.
          for (var i = 0; i < res.data.length; i++) {
            this.majorOptions.push({value: res.data[i].major})
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // subjectOptions
    // 선택한 학과에 따라 강의명 넣기
    getSubject () {
      this.$http
        .post('/api/curriculum', {
          major: this.majorSelected
        })
        .then(res => {
          console.log('커리큘럼 내 모든 과목')
          console.log(res.data)
          for (var i = 0; i < res.data.length; i++) {
            this.subjectOptions.push({ value: res.data[i].lecture })
          }
          this.getProfessor(this.majorSelected)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // professorOptions
    // 선택한 학과에 따라 교수명 데이터 넣기
    getProfessor (clickedMajor) {
      this.professorOptions = []
      for (var i = 0; i < this.allMajorData.length; i++) {
        if (this.allMajorData[i].major == clickedMajor) {
          for (var j = 0; j < this.allMajorData[i].professor.length; j++) {
            this.professorOptions.push({ value: this.allMajorData[i].professor[j].name })
          }
        }
      }
    },
    onSubmit (evt) {
      evt.preventDefault()
      this.$http
        .post('/api/class/evaluation/create', {
          userId: this.userId,
          major: this.majorSelected,
          lecture: this.subjectSelected,
          professor: this.professorSelected,
          semester: this.semesterSelected,
          nickname: this.$cookies.get('nickname'),
          teamProject_grade: this.assignRating,
          homework_grade: this.teamRating,
          test_grade: this.lectureRating,
          skill_grade: this.examRating,
          enrollment_level: this.diffiSelected,
          memo1: this.text1,
          memo2: this.text2,
          memo3: this.text3,
          memo4: this.text4
        })
        .then(res => {
          console.log(res.data)
          this.$router.push('/main')
        })
        .catch(err => {
          console.log(err)
          alert(err)
        })
    }
  }
}
</script>

<style>
.submitBtn {
  margin-top: 3rem;
  border: transparent;
  font-weight: bold;
}
#choice {
  margin-top: 5rem;
}
.evalWrite {
  width: 100%;
  margin: 0 auto;
}
.evaltext.form-control {
  height: 20rem;
}
#evalText {
  width: 40%;
  margin: 0 auto;
  text-align: center;
  font-size: 30px;
  margin-top: 5rem;
}
.star {
  margin-top: 3rem;
}
.diffi {
  padding-top: 1.5rem;
  text-align: center;
  width: 15rem;
  margin: 0 auto;
}
.custom-text {
  font-weight: bold;
  font-size: 1.9em;
  border: 1px solid #cfcfcf;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
  color: black;
  background: #fff;
}
</style>
