<template>
  <div class="main" >
        <span class = "tab_context">
                <p>{{major}}</p>
                <div class="eval_write">
                  <b-button class="eval_write_btn" @click = "goToEvalWrite">강의평가작성</b-button>
                </div>
                <b-container class="curriculum">
                    <b-row>
                        <b-col><p> 1-1 </p></b-col>
                        <b-col><p> 1-2 </p></b-col>
                        <b-col><p> 2-1 </p></b-col>
                        <b-col><p> 2-2 </p></b-col>
                        <b-col><p> 3-1 </p></b-col>
                        <b-col><p> 3-2 </p></b-col>
                        <b-col><p> 4-1 </p></b-col>
                        <b-col><p> 4-2 </p></b-col>
                    </b-row>
                    <b-row align-v="center" class="height">
                        <b-col>
                            <div v-for="item in curriData" v-bind:subject = "item" v-bind:key="item.id" v-if="item.semester == '1-1'">
                                <b-button :pressed.sync = "item.isPre" class = "mainBtn" @click = "Popup(item)" >{{item.name}}</b-button>
                            </div>
                        </b-col>
                        <hr class = "vertical">
                        <b-col>
                            <div v-for="item in curriData" v-bind:subject = "item" v-bind:key="item.id" v-if="item.semester == '1-2'">
                               <b-button :pressed.sync = "item.isPre" class = "mainBtn" @click = "Popup(item)" >{{item.name}}</b-button>
                            </div>
                        </b-col>
                         <hr class = "vertical">
                         <b-col>
                            <div v-for="item in curriData" v-bind:subject = "item" v-bind:key="item.id" v-if="item.semester == '2-1'">
                               <b-button :pressed.sync = "item.isPre" class = "mainBtn" @click = "Popup(item)" >{{item.name}}</b-button>
                            </div>
                        </b-col>
                        <hr class = "vertical">
                        <b-col>
                            <div v-for="item in curriData" v-bind:subject = "item" v-bind:key="item.id" v-if="item.semester == '2-2'">
                                <b-button :pressed.sync = "item.isPre" class = "mainBtn" @click = "Popup(item)" >{{item.name}}</b-button>
                            </div>
                        </b-col>
                        <hr class = "vertical">
                        <b-col>
                            <div v-for="item in curriData" v-bind:subject = "item" v-bind:key="item.id" v-if="item.semester == '3-1'">
                                <b-button :pressed.sync = "item.isPre" class = "mainBtn" @click = "Popup(item)" >{{item.name}}</b-button>
                            </div>
                        </b-col>
                         <hr class = "vertical">
                         <b-col>
                            <div v-for="item in curriData" v-bind:subject = "item" v-bind:key="item.id" v-if="item.semester == '3-2'">
                                <b-button :pressed.sync = "item.isPre" class = "mainBtn" @click = "Popup(item)" >{{item.name}}</b-button>
                            </div>
                        </b-col>
                         <hr class = "vertical">
                        <b-col>
                            <div v-for="item in curriData" v-bind:subject = "item" v-bind:key="item.id" v-if="item.semester == '4-1'">
                                <b-button :pressed.sync = "item.isPre" class = "mainBtn" @click = "Popup(item)" >{{item.name}}</b-button>
                            </div>
                        </b-col>
                        <hr class = "vertical">
                        <b-col>
                            <div v-for="item in curriData" v-bind:subject = "item" v-bind:key="item.id" v-if="item.semester == '4-2'">
                                <b-button :pressed.sync = "item.isPre" class = "mainBtn" @click = "Popup(item)" >{{item.name}}</b-button>
                            </div>
                        </b-col>
                    </b-row>
                </b-container>
                <modals-container />
          </span>
  </div>
</template>

<script>
import DelPopup from './Popup'

  export default {
    name: 'Main',
    data () {
      return {
        major: "소프트웨어학과" ,
        curriData: [],
      }
    },
    Popup (clickedItem) {
      this.$EventBus.$on('changeColor', (message) => {
        this.showPreRequisite(clickedItem, message)
      })
      this.showPreRequisite(clickedItem, true)
      this.$modal.show(DelPopup, {
        subject: clickedItem,
        modal: this.$modal
      }, {
        name: 'dynamic-modal',
        width: '600px',
        height: '400px',
        draggable: true,
        clickToClose: false
      })
    },
    methods : {
      GetCurriculum(){
        this.$http.get("/api/main").then((res) => {
          this.curriData = res.data;
          console.log(res.data);
          this.curriData = res.data;
        });

      },
      Popup(clickedItem){
        this.$EventBus.$on('changeColor', (message) => {
          this.showPreRequisite(clickedItem, message)
        })
        this.showPreRequisite(clickedItem, true)
        this.$modal.show(DelPopup,{
          subject : clickedItem,
          modal : this.$modal },{
          name: 'dynamic-modal',
          width : '600px',
          height : '400px',
          draggable: true,
          clickToClose : false
        })
      },
      goToEvalWrite(){
        this.$router.push({
          name:'evaluation-write'
        })
      },
      showPreRequisite(item, isPre){
        for(var i =0 ; i<this.curriData.length; i ++){
          if(item.prerequisite == this.curriData[i].name){
            this.curriData[i].isPre = isPre;
            this.showPreRequisite(this.curriData[i], isPre)
          }
        }
      }
    }
  }
}
</script>

<style>
  hr.vertical{
    border: thin dotted gray;
    height:500px;
    width:0px;
    border-color:gray;
  }
  .main .card .tabs{
    height: 100vh;
  }
  .curriculum{
    margin-top:5vh;
    max-width: fit-content;
  }
  .col_container{
    border:solid;
  }
  .eval_write{
    text-align: right;
    margin-right:8rem;
  }

  .btn.mainBtn.btn-secondary.active{
    background-color:lightpink;
  }
  .btn.mainBtn.btn-secondary{
    background-color:skyblue;
    margin-bottom: 3vh;
    margin-left:1vw;
    margin-right: 1vw;
    border:transparent;
  }
  .col{
    text-align: center;
  }

  .height {
    margin-top:50px;
    width: -webkit-fill-available;
  }
  .nav-tabs .nav-link{
    height: 7vh;
    padding-left:20vw;
    padding-right:20vw;
    margin-top:3vh;
    margin-left:5px;
  }
  .mainBtn{
    border:transparent;
    border-radius:10px;
    color : white;
    font-weight: bold;
    width: 8vw;
    height:50px;
    min-width: fit-content;
    min-height: fit-content;
  }
  .card-header{
    padding-top : 2vh;
    font-size:18px;
    font-weight: bold;
  }

  .card-header-tabs{
    width:max-content;
  }
  p{
    margin-top:2vh;
    margin-bottom: 5vh;
    font-weight: bold;
    font-size:18px;
    text-align: center;
  }
  .tab-pane{
    width:100%;
  }
</style>
