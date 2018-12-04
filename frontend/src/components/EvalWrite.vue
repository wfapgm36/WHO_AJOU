<template>
  <div class="evalwrite">
    <form @submit="onSubmit">
      <div class="evalWrite">
        <b-row class="justify-content-md-center" id="choice">
          <b-col col lg="1">
            <b-form-select :options="majorOptions" class="mb-3" size="sm"/>
          </b-col>
          <b-col cols="10" md="auto">
            <b-form-select :options="subjectOptions" class="mb-3" size="sm"/>
          </b-col>
          <b-col col lg="1">
            <b-form-select :options="professorOptions" class="mb-3" size="sm"/>
          </b-col>
        </b-row>

        <b-row class="justify-content-md-center">
          <b-col col lg="2" class="star">
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
          <b-col col lg="2" md="auto" class="star">
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
          <b-col col lg="2" class="star">
            <h5>강의력 평가</h5>
            <star-rating
              :inline="true"
              :show-rating="false"
              :increment="0.5"
              @rating-selected="setLectureRating"
              :star-size="30"
            ></star-rating>
          </b-col>
          <b-col col lg="2" class="star" md="auto">
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
        <b-form-select :options="diffiOptions" size="sm"/>
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

        <h3>팀플과 시험은 어떤가요?</h3>
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

        <b-button class="submitBtn" type="submit">제출</b-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "evaluation-write",
  data() {
    return {
      //강의 정보
      major: "",
      subject: "",
      semester: "",
      code: "",
      professor: "",
      difficult: "",
      //강의 평점
      assignRating: "",
      teamRating: "",
      lectureRating: "",
      examRating: "",
      //강의 메모
      text1: "",
      text2: "",
      text3: "",
      text4: "",
      //선택 옵션
      majorOptions: [
        { text: "학과", disabled: true },
        { text: "소프트웨어학과" },
        { text: "디지털미디어학과" },
        { text: "사이버보안학과" }
      ],
      subjectOptions: [
        { text: "과목명", disabled: true },
        { text: "객체지향프로그래밍" },
        { text: "웹시스템설계" },
        { text: "알고리즘" }
      ],
      professorOptions: [
        { text: "교수명", disabled: true },
        { text: "오상윤" },
        { text: "원딤" },
        { text: "위규범" }
      ],
      diffiOptions: [
        { text: "수강신청 난이도", disabled: true },
        { text: "상" },
        { text: "중" },
        { text: "하" }
      ]
    };
  },
  methods: {
    setAssignRating(rating) {
      this.assignRating = rating;
    },
    setTeamRating(rating) {
      this.teamRating = rating;
    },
    setLectureRating(rating) {
      this.lectureRating = rating;
    },
    setExamRating(rating) {
      this.examRating = rating;
    },
    //majorOption의 데이터에 넣어줄 함수
    getMajor() {
      this.majorOptions = [{ text: "학과", disabled: true }];
      this.$http
        .get("/api/major/all")
        .then(res => {
          console.log("학과");
          console.log(res.data);
          for (var i = 0; i < res.data.length; i++) {
            this.majorOptions.push({ text: res.data[i].major });
          }
          this.getSubject();
          this.getProfessor();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // subjectOptions
    getSubject() {
      this.subjectOptions = [{ text: "과목명", disabled: true }];
      this.$http
        .post("/api/curriculum", {
          major: this.major
        })
        .then(res => {
          console.log("커리큘럼 내 모든 과목");
          console.log(res.data);
          for (var i = 0; i < res.data.length; i++) {
            this.subjectOptions.push({ text: res.data[i].lecture });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //professorOptions
    getProfessor() {
      this.professorOptions = [{ text: "교수명", disabled: true }];
      this.$http
        .post("/api/major", {
          major: this.major
        })
        .then(res => {
          console.log("교수");
          console.log(res.data);
          for (var i = 0; i < res.data.professor.length; i++) {
            this.professorOptions.push({ text: res.data.professor[i].name });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 과목코드
    getCode() {
      this.code = "";
      this.$http
        .post("/api/curriculum/one", {
          major: this.major,
          lecture: this.subject
        })
        .then(res => {
          console.log("커리큘럼 내 한 과목");
          console.log(res.data);
          this.code = res.data.code;
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSubmit() {
      this.$http
        .post("/api/class/evaluation/create", {
          userId: this.userId,
          major: this.major,
          lecture: this.lecture,
          professor: this.professor,
          code: this.code,
          semester: this.semester,
          nickname: this.$cookies.get("nickname"),
          teamProject_grade: this.assignRating,
          homework_grade: this.teamRating,
          test_grade: this.lectureRating,
          skill_grade: this.examRating,
          enrollment_level: this.difficult,
          memo1: this.text1,
          memo2: this.text2,
          memo3: this.text3,
          memo4: this.text4
        })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
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