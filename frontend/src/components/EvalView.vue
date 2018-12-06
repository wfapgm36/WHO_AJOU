<template>
<div class = "eval-view">
    <b-card-group deck>
        <b-card header-tag="header" footer-tag="footer">   
            <h6 slot="header">
                <h2>교수님 이름 : {{content.professor}}</h2>
                <h2>수강학기 : {{content.semester}}</h2>
                <h2>수강신청 난이도 : {{content.evaluation[0].enrollment_level}}</h2>
                <div>
                    <b-progress :value="counter" :max="max" show-progress animated></b-progress>
                    <b-progress :max="max" class="mb-3">
                      <b-progress-bar variant="primary" :value="values[0]" >과제</b-progress-bar>
                      <b-progress-bar variant="success" :value="values[1]" >팀플</b-progress-bar>
                      <b-progress-bar variant="info" :value="values[2]" >강의력</b-progress-bar>
                      <b-progress-bar variant="info" :value="values[3]" >시험</b-progress-bar>
                    </b-progress>
                </div>
            </h6>
            
            <h6 slot="footer">
            </h6>
            
            <div>
                <h2>팀플 / 과제:  {{content.evaluation[0].memo1}}</h2>
            </div>
            <div>
                <h2>수업 / 시험: {{content.evaluation[0].memo2}}</h2>
            </div>
            <div>
                <h2>이런 사람에게 추천! {{content.evaluation[0].memo3}}</h2>
            </div>
            <div>
                <h2>이런 사람에게 비추천! {{content.evaluation[0].memo4}}</h2>
            </div>
        </b-card>
    </b-card-group>
</div>
</template>

<script>

export default {
    name: 'EvalView',
    data() {
      return{
        id: this.$route.params.id,
        counter: 0,
        max: 100,
        values: [],
        content:{}
      }
    },
    created() {
        this.$EventBus.$emit('removeTab', true);
       
        this.getContent()
    },
    methods: {
         count(){
            for (var i = 0; i < this.values.length; i++){
                console.log(i)
                this.counter += this.values[i]            
            }
        },
        getContent() {
            this.$http.get(`/api/class/evaluation/${this.id}`)
            .then(res =>{
                this.content = res.data
                console.log(res.data)
                this.makeScore()
            })
            .catch(err => {
                console.log(err)
            })
          
        },
        //100점 만점 // 항목당 별5점이 최대이기 때문에 5 곱해줌
        makeScore(){
            this.values.push(this.content.evaluation[0].teamProject_grade * 5)
            this.values.push(this.content.evaluation[0].homework_grade * 5)
            this.values.push(this.content.evaluation[0].test_grade * 5)
            this.values.push(this.content.evaluation[0].skill_grade * 5)
            this.count()
        }
    }
}
</script>
