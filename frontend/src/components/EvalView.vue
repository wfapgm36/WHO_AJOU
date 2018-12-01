<template>
<div class = "eval-view">
    <b-card-group deck>
        <b-card header-tag="header" footer-tag="footer">
            
            <h6 slot="header">
                <h1>{{id}}</h1>
                <h2>교수님 이름</h2>
                <h2>수강학기</h2>
                <h2>수강신청 난이도</h2>
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
                <h2>팀플 / 과제</h2>
            </div>
            <div>
                <h2>수업 / 시험</h2>
            </div>
            <div>
                <h2>이런 사람에게 추천!</h2>
            </div>
            <div>
                <h2>이런 사람에게 비추천!</h2>
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
        values: [ 10, 10, 10, 10 ]
      }
    },
    created() {
        this.count()
    },
    methods: {
        count(){
            for (var i = 0; i < this.values.length; i++){
                console.log(i)
                this.counter += this.values[i]            
            }
        },
        getContent() {
            this.$http.get(`#/?/${this.id}`)
            .then(res =>{
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>
