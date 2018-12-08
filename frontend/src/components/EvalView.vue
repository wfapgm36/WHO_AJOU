<template>
  <div class="eval-view" style = "width:60%; margin:auto;">
    <b-card-group deck>
      <b-card header-tag="header" footer-tag="footer" style = "width:70%;">
        <h6 slot="header" align = "center">
          <h1 class = "view_text">{{content.lecture}}</h1>
          <h2 class = "view_text">교수 : {{content.professor}} 교수님</h2>
          <h2 class = "view_text">수강학기 : {{content.semester}}</h2>
          <h2 class = "view_text">수강신청 난이도 : {{object.enrollment_level}}</h2>

          <b-row class="justify-content-md-center" style="margin-top:50px;">
            <b-col>
               <h5>과제평가</h5>
               <v-rating v-model="values[0]"
                                        color="yellow darken-3"
                                        background-color="grey darken-1"
                                        readonly
                                        half-increments>
               </v-rating>
            </b-col>
             <b-col >
                <h5>팀플평가</h5>
                <v-rating v-model="values[1]"
                                        color="yellow darken-3"
                                        background-color="grey darken-1"
                                        readonly
                                        half-increments>
                </v-rating>
            </b-col>
             <b-col>
                <h5>강의력평가</h5>
                <v-rating v-model="values[2]"
                                        color="yellow darken-3"
                                        background-color="grey darken-1"
                                        readonly
                                        half-increments>
                </v-rating>
            </b-col>
            <b-col >
                <h5>시험평가</h5>
                <v-rating v-model="values[3]"
                                        color="yellow darken-3"
                                        background-color="grey darken-1"
                                        readonly
                                        half-increments>
                </v-rating>
            </b-col>
          </b-row>
        </h6>

        <h2> 시험/수업 </h2>
        <h4><p>{{object.memo1}}</p></h4>

        <h2> 팀플/과제 </h2>
        <h4><p>{{object.memo2}}</p></h4>

        <h2> 추천하는 사람</h2>
        <h4><p>{{object.memo3}}</p></h4>

        <h2> 추천하지 않는 사람</h2>
        <h4><p>{{object.memo4}}</p></h4>

        <h6 slot="footer">
          <b-button class="backBtn" @click="back()">이전</b-button>
          <b-button class="delBtn" v-if="userId === content.userId" @click="del()">삭제</b-button>
          <b-button class="delBtn" v-if="userId === content.userId" @click="update()">수정</b-button>
        </h6>

     
      
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  name: "EvalView",
  data() {
    return {
      id: this.$route.params.id,
      userId: '',
      counter: 0,
      max: 100,
      values: [],
      content: {},
      object: {} 
    };
  },
  created() {
    this.$EventBus.$emit("removeTab", true);
    this.getUserId();
    this.getContent();
  },
  methods: {
    getUserId(){
     this.$http.get('/api/profile/user')
      .then(res => {
        this.userId = res.data.username
      })
    },
    back() {
      this.$router.go(-1);
    },
    update() {
      this.$router.push(`/evaluation/update/${this.id}`);
    },
    del() {
      this.$http
        .post("/api/class/evaluation/delete", { id: this.id })
        .then(res => {
            console.log(res.data);
            this.back()
        })
        .catch(err => {
          console.log(err);
        });
    },
    count() {
      for (var i = 0; i < this.values.length; i++) {
        console.log(i);
        this.counter += this.values[i];
      }
    },
    getContent() {
      this.$http
        .get(`/api/class/evaluation/${this.id}`)
        .then(res => {
          this.content = res.data;
          this.object = res.data.evaluation;
          console.log(res.data);
          this.makeScore();
        })
        .catch(err => {
          console.log(err);
        });
    },
    //100점 만점 // 항목당 별5점이 최대이기 때문에 5 곱해줌
    makeScore() {
      this.values.push(this.content.evaluation.teamProject_grade);
      this.values.push(this.content.evaluation.homework_grade);
      this.values.push(this.content.evaluation.test_grade);
      this.values.push(this.content.evaluation.skill_grade);
      this.count();
    }
  }
};
</script>
<style>
.view_text{
  margin-top : 30px;
}

</style>

