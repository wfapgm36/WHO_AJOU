<template>
  <div class="main" >
    <div class = "searchFunction">
      <b-row class="justify-content-md-center">
          <b-col cols = "0.8">
            <div>
                <b-form-select :options="options" class="mb-3" size = "sm" />
            </div>
          </b-col>
          <b-col cols = "12" md = "3">
            <b-form-input v-model="searchText"
                      type="text"
                      placeholder="검색어를 입력해주세용."
                      size = "sm"
                      id="searchBar" >
            </b-form-input>
          </b-col>
          <b-col cols = "0">
            <b-button class="searchButton" type="submit" size = "sm" >검색</b-button>
          </b-col> 
      </b-row>
    </div>
    <p>{{clickedMajor.name}}</p>
      <div class="eval_write">
        <div class = "choice_major">
          <b-button class="eval_write_btn" @click = "goToEvalWrite">강의평가작성</b-button>
           <b-dropdown id="ddown-buttons" text="학과를 선택하세요" class="m-2">
            <b-dropdown-item-button v-model = "clickedMajor.major" v-for= "item in majors" v-bind:key="item.id" @click = "setMajor(item)">{{item.major}}</b-dropdown-item-button>
          </b-dropdown>
        </div>
          
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
                        <b-button :pressed.sync = "item.isPre" class = "mainBtn" @click = "Popup(item)" >{{item.lecture}}</b-button>
                    </div>
                </b-col>
                <hr class = "vertical">
                <b-col>
                    <div v-for="item in curriData" v-bind:subject = "item" v-bind:key="item.id" v-if="item.semester == '1-2'">
                       <b-button :pressed.sync = "item.isPre" class = "mainBtn" @click = "Popup(item)" >{{item.lecture}}</b-button>
                    </div>
                </b-col>
                 <hr class = "vertical">
                 <b-col>
                    <div v-for="item in curriData" v-bind:subject = "item" v-bind:key="item.id" v-if="item.semester == '2-1'">
                       <b-button :pressed.sync = "item.isPre" class = "mainBtn" @click = "Popup(item)" >{{item.lecture}}</b-button>
                    </div>
                </b-col>
                <hr class = "vertical">
                <b-col>
                    <div v-for="item in curriData" v-bind:subject = "item" v-bind:key="item.id" v-if="item.semester == '2-2'">
                        <b-button :pressed.sync = "item.isPre" class = "mainBtn" @click = "Popup(item)" >{{item.lecture}}</b-button>
                    </div>
                </b-col>
                <hr class = "vertical">
                <b-col>
                    <div v-for="item in curriData" v-bind:subject = "item" v-bind:key="item.id" v-if="item.semester == '3-1'">
                        <b-button :pressed.sync = "item.isPre" class = "mainBtn" @click = "Popup(item)" >{{item.lecture}}</b-button>
                    </div>
                </b-col>
                 <hr class = "vertical">
                 <b-col>
                    <div v-for="item in curriData" v-bind:subject = "item" v-bind:key="item.id" v-if="item.semester == '3-2'">
                        <b-button :pressed.sync = "item.isPre" class = "mainBtn" @click = "Popup(item)" >{{item.lecture}}</b-button>
                    </div>
                </b-col>
                 <hr class = "vertical">
                <b-col>
                    <div v-for="item in curriData" v-bind:subject = "item" v-bind:key="item.id" v-if="item.semester == '4-1'">
                        <b-button :pressed.sync = "item.isPre" class = "mainBtn" @click = "Popup(item)" >{{item.lecture}}</b-button>
                    </div>
                </b-col>
                <hr class = "vertical">
                <b-col>
                    <div v-for="item in curriData" v-bind:subject = "item" v-bind:key="item.id" v-if="item.semester == '4-2'">
                        <b-button :pressed.sync = "item.isPre" class = "mainBtn" @click = "Popup(item)" >{{item.lecture}}</b-button>
                    </div>
                </b-col>
            </b-row>
        </b-container>
        <modals-container/>
     
        <div class = "evaluation">
          <div class = "eval_container">
              <b-row >
                  <b-col align-v="center" id = "evaluate" v-for="item in eval_subject" v-bind:key="item.id" v-if="showEval(item)">
                      <div class ="evalContainer" >
                          <h3>Course</h3>
                          <h6>{{item.name}}</h6>
                          <h3>Professor</h3>
                          <h6>{{item.professor}}</h6>
                          <h5 class = "circle">{{item.grade}}</h5>
                          <h6>{{item.brief}}</h6><br>
                          <button type="submit" class = "plusView" @click="goToEval(item.name)">Read More</button>
                      </div>
                  </b-col>
              </b-row>
          </div>
    </div>
  </div>
</template>

<script>
import DelPopup from './Popup'
import Eval from './Evaluation'

  export default {
    name: 'Main',
    data () {
      return {
        searchText:'',
        majors: [] ,
        clickedMajor : {major:'소프트웨어학과'},
        curriData: [],
        searchText: '',
        subject: [],
        options: [
          { text: '전체' },
          { text: '강의명' },
          { text: '교수명' }
        ],
        eval_subject: [],
        popupData : ''
      }
    },
    created (){
      this.$EventBus.$emit('removeTab', true)
      this.GetMajor()
      this.GetCurriculum();
      this.getEval(this.$route.params.id)
    },
    methods : {
      showEval(item){
        if(item.name == this.searchText || item.name == popupData){
          return true
        }
        else{
          return false
        }
      },
      setMajor(item){
      //  this.clickedMajor = item.major
        this.GetCurriculum();
      },
      GetMajor(){
        this.$http.get("/api/major/all").then((res) => {
          this.majors = res.data;
        });
      },
      GetCurriculum(){
        console.log("GetCurriculum 들어옴")
        console.log("this.clickedMajor:"+this.clickedMajor)
        this.$http.post("/api/curriculum", this.clickedMajor)
        .then((res) => {
          this.curriData = res.data;
        })
        .catch((err) => {
          alert(err);
        });
      },
      Popup(clickedItem){
        this.$EventBus.$on('changeColor', (message) => {
          this.showPreRequisite(clickedItem, message)
        })
        this.$EventBus.$on('clickedPopupLectureName', (message) => {
          this.popupData = message;
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
          for(var j =0 ; j<item.prerequisite.length; j++){
            if(item.prerequisite[j].name == this.curriData[i].lecture){
              this.curriData[i].isPre = isPre;           
              this.showPreRequisite(this.curriData[i], isPre)
            }
          }
        }
      },
      getEval (name) {
        this.$http.get("/api/class/evaluation")
          .then((res) => {
          this.eval_subject = res.data;
        }); 
      },
    },
    components:{
     
    }
  }

</script>

<style>
  .choice_major{
    margin-left: 10px;
  }
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
  .searchButton{
    border:transparent;
    background: gray;
    border-radius:7px;
    width:4rem;
    height:2rem;
    font-weight: bold;
    color:white;
}
.searchFunction{
  margin-top:70px;
  margin-bottom: 30px;
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
