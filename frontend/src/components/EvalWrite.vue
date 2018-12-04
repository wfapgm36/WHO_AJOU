<template>
    <div class = "evalwrite">
        <form @submit="onSubmit">
        <div class = "evalWrite">
            <b-row class="justify-content-md-center" id = "choice">
                <b-col  col lg= "1" ><b-form-select :options="majorOptions" class="mb-3" size = "sm" /></b-col>
                <b-col  cols = "10"  md = "auto"><b-form-select :options="subjectOptions" class="mb-3" size = "sm" /></b-col>
                <b-col  col lg = "1" ><b-form-select :options="professorOptions" class="mb-3" size = "sm" /></b-col>
            </b-row>
            <b-row class="justify-content-md-center">
                <b-col col lg="2"  class = "star"> 
                    <h5>과제평가</h5>
                    <star-rating :inline="true" border-color ="transparent" :show-rating="false" :increment = "0.5" @rating-selected="setAssignRating" :star-size = "30"></star-rating>
                </b-col>
                <b-col col lg="2" md = "auto" class = "star">
                    <h5>팀플평가</h5>
                    <star-rating :inline="true" :show-rating="false" :increment = "0.5" @rating-selected="setTeamRating" :star-size = "30"></star-rating>
                </b-col>

            </b-row>
            <b-row class="justify-content-md-center">
                <b-col col lg="2" class = "star">
                     <h5>강의력 평가</h5>
                    <star-rating :inline="true" :show-rating="false" :increment = "0.5" @rating-selected="setLectureRating" :star-size = "30"></star-rating>
                </b-col>
                <b-col col lg="2" class = "star" md = "auto">
                    <h5>시험평가</h5>
                    <star-rating :inline="true" :show-rating="false" :increment = "0.5" @rating-selected="setExamRating" :star-size = "30"></star-rating>
                </b-col>
            </b-row>   
        </div>
            <div class = "diffi">
            <b-form-select :options="diffiOptions" size = "sm" />
            </div>
           <div id = "evalText">
                <h3>시험과 수업은 어떤가요?</h3>
                <b-form-textarea class = "evaltext"
                         v-model="text1"
                         placeholder="Enter something"
                         :rows="3"
                         :max-rows="6">
                </b-form-textarea>
             
                <h3>팀플과 시험은 어떤가요?</h3>
        
                <b-form-textarea class = "evaltext"
                         v-model="text2"
                         placeholder="Enter something"
                         :rows="3"
                         :max-rows="6">
                </b-form-textarea>
                       
                <h3>이런 사람에게 추천해요.</h3>
                <b-form-textarea class = "evaltext"
                         v-model="text3"
                         placeholder="Enter something"
                         :rows="3"
                         :max-rows="6">
                </b-form-textarea>
         
                <h3>이런 사람에게 추천하지 않아요.</h3>
                <b-form-textarea class = "evaltext"
                         v-model="text4"
                         placeholder="Enter something"
                         :rows="3"
                         :max-rows="6">
                </b-form-textarea>   
                <b-button class = "submitBtn" type = "submit">제출</b-button>
           </div>
           
           </form>
    </div>

</template>

<script>
export default {
  name: 'evaluation-write',
  data () {
    return {
      searchText: '',
      subject: [],
      assignRating:'',
      teamRating:'',
      lectureRating:'',
      examRating:'',
      text1:'',
      text2:'',
      text3:'',
      text4:'',
      majorOptions: [
        {text:'학과' ,disabled:true},
        { text: '소프트웨어학과' },
        { text: '디지털미디어학과' },
        { text: '사이버보안학과'}
      ],
      subjectOptions:[
          {text:'과목명' ,disabled:true},
          {text: '객체지향프로그래밍'},
          {text: '웹시스템설계'},
          {text: '알고리즘'}
      ],
      professorOptions:[
          {text:'교수명' ,disabled:true},
          {text: '오상윤'},
          {text: '원딤'},
          {text: '위규범'}
      ],
      diffiOptions:[
          {text:'수강신청 난이도', disabled:true},
          {text: '상'},
          {text: '중'},
          {text: '하'}
      ]
    }
  },
  methods:{
      setAssignRating(rating){
        this.assignRating = rating;
      },
       setTeamRating(rating){
        this.teamRating = rating;
      },
       setLectureRating(rating){
        this.lectureRating = rating;
      },
       setExamRating(rating){
        this.examRating = rating;
      },
      //나중 majorOption의 데이터에 넣어줄 함수
      getMajor(){
          this.$http.axios('/api/major/all')

      },
      // subjectOptions
      getSubject(){

      },
      getProfessor(){

      },
      onSubmit(){

      }
  }
}


</script>

<style>
.submitBtn{
    margin-top:3rem;
    border : transparent;
    font-weight: bold;

}
#choice{
    margin-top:5rem;
}
.evalWrite{
    width:100%;
    margin:0 auto;
}
.evaltext.form-control{
    height: 20rem;    
}
#evalText{
    width:40%;
    margin:0 auto;
    text-align: center;
    font-size:30px;
    margin-top:5rem;
}
.star{
    margin-top:3rem;
}
.diffi{
    padding-top:1.5rem;
    text-align: center;
    width:15rem;
    margin:0 auto;
}
.custom-text {
  font-weight: bold;
  font-size: 1.9em;
  border: 1px solid #cfcfcf;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
  color:black;
  background: #fff;
}

</style>