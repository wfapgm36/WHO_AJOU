<template>
  <div class="container">
    <b-button class = "closeBtn" @click="close(subject)" ></b-button>
    <h3>COURSE INFORMATION</h3>
    <hr  class = "mainhr">
    <form >
      <div class = "leftContents">
        <h5> Course </h5>
        <h6>{{subject.name}}</h6>
        <hr>
        <h5>Details</h5>
        <h6>{{subject.description}}</h6>
        <hr class = "verticalHr">
      </div>
      <div class = "rightContents">
        <h5> Course Type </h5>
        <h6>{{subject.type}}</h6>
        <hr>
        <h5>Prerequite Subject</h5>
        <h6>{{subject.prerequisite}}</h6>
        <br>
        <button type="submit" class = "evalButton" @click="goToEval(subject)">강의평가</button>
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
      close(item){
        item.isPre = false
        this.$EventBus.$emit('changeColor', false);
        this.$emit('close')
      },
      goToEval(item){
        item.color = 'skyblue',
          this.$router.push({
            name:'evaluation',
            params:{ id: item.name}
          })
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
  .closeBtn{
    float: right;
    width: 33px;
    height: 34px;
    border: transparent;
    background-image : url("./../assets/close.png");
  }
  h3{
    margin-top:25px;
  }
  .evalButton{
    margin-top:5rem;
    margin-left:5rem;
    height: 40px;
    border:transparent;
    border-radius: 10px;
    color:white;
    font-weight: bold;
    background: skyblue;
    text-align: center;
  }

</style>

