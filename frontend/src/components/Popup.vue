<template>
  <div class="container">
    <b-button id = "closeBtn" @click="close(subject)" ><v-icon v-text="$vuetify.icons.cancel"></v-icon></b-button>
    <b-button class = "delBtn" @click="deleteCurriculum(subject)">삭제</b-button>
    <b-button class = "uptBtn" @click="updateCurriculum(subject)">수정</b-button>
    <h3>COURSE INFORMATION</h3>
    
    <hr  class = "mainhr">
    <form >
      <div class = "leftContents">
        <h5> Course </h5>
        <h6>{{subject.lecture}}</h6>
        <hr>
        <h5>Details</h5>
         <h6>{{subject.description}} </h6>
        <hr class = "verticalHr">
      </div>
      <div class = "rightContents">
        <h5> Course Type </h5>
         <h6>{{subject.type}} </h6>
        <hr>
        <h5>Prerequite Subject</h5>
         <h6 v-for="pre in subject.prerequisite" v-bind:key = "pre.id">{{pre.name}} </h6>
        <br>
          <button class = "evalButton" @click.prevent="goToEval(subject)" v-scroll-to="'#eval_container'">강의평가</button>
      </div>
    </form>
  </div>
</template>
<script>
  export default {
    props : [
      'subject'
    ],
    data:function(){
      return {
          name: ''
      }
    },
    methods : {
      updateCurriculum(item){
        console.log(item)
        this.$router.push(`/curriculum/update/${item.id}`)
      },
      deleteCurriculum(item){
        console.log(item)
        this.$http.post('/api/curriculum/delete', {id: item.id})
        .then(res => {
          console.log(res.data)
          this.$emit('close')
          this.$EventBus.$emit('del');
        })
        .catch(err => {
          console.log(err)
        })
      },
      close(item){
        item.isPre = false
        this.$EventBus.$emit('changeColor', false);
        this.$emit('close')
      },
      goToEval(item){
        this.$EventBus.$emit('clickedPopupLectureName', item)
        this.close(item)
      }
    }
  }
</script>
<style>
.mainhr{
    border-width: 1.5px;
    border-color:gray;
    border-style: dotted;
  }

  .leftContents{
    width:45%;
    text-align: left;
    float:left;
    border-right: 5rem;
  }
  .rightContents{
    width:48%;
    text-align: left;
    float:right;
  }
  .v--modal-overlay .v--modal-box {
    border-radius: 50px;
    background-color: rgba(255, 255, 255, 0.705);
  }
  #closeBtn{
    float: right;
    margin-top:5px;
    background-color: transparent;
    border: transparent;
  }
  .delBtn{
    float: right;
    width: 40;
    height: 34px;
    border: transparent;
  }
  .uptBtn{
    float: right;
    width: 40;
    height: 34px;
    border: transparent;
  }
  h3{
    margin-top:25px;
  }

  .evalButton{
    margin-top:5vh;
    margin-left:5vh;
    height: 40px;
    width:70px;
    border:transparent;
    border-radius: 10px;
    color:white;
    font-weight: bold;
    background: #C6D6F7;
    text-align: center;
  }
  

</style>

