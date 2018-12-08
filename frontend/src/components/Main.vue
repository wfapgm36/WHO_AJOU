<template>
  <div id="main" >
    <div id = "mainSearchFunction">
      <b-row class="justify-content-md-center">
          <b-col cols = "0.8">
                <b-form-select  v-model="searchKind" class="mb-3" size="sm">
                  <option :value="null">전체</option>
                  <option v-for="item in options" v-bind:key ="item.id">{{item.value}}</option>
                </b-form-select>
          </b-col>
          <b-col cols = "12" md = "3">
                <b-form-input v-model="searchText"
                          type="text"
                          placeholder="검색어를 입력해주세요."
                          size = "sm"
                          id="searchBar" >
                </b-form-input>
          </b-col>
          <b-col cols = "0">
           <b-button id="searchButton" @click = "searchPost()" v-scroll-to="'#eval_container'" size = "sm" >검색</b-button>
          </b-col> 
      </b-row>
       
    </div>
    <p class = "majorText">{{clickedMajor}}</p>
      <div class="eval_write">
        <div class = "choice_major">
          <router-link :to ="`/evaluation/write`">
            <b-button class="eval_write_btn">강의평가작성</b-button>
          </router-link>
          <router-link :to ="`/curriculum/create`">
            <b-button class="eval_write_btn"> 강의추가 </b-button>
          </router-link>
          <b-dropdown  id="ddown-buttons" text="학과를 선택하세요" class="m-2">
           <b-dropdown-item-button v-model="clickedMajor" v-for="item in majors" v-bind:key="item.id" @click = "setMajor(item)">{{item.major}}</b-dropdown-item-button>
          </b-dropdown>
        </div>
          
      </div>
        <b-container class="curriculum">
            <b-row align-v="top" class="height">
                <b-col>
                  <b-row align-v="center">
                    <b-col><p class = "majorText"> 1-1 </p></b-col>
                  </b-row>
                    <div v-for="item in curriData" v-bind:subject = "item" v-bind:key="item.id" v-if="item.semester == '1-1'">
                            <b-button v-bind:style="depth" :pressed.sync = "item.isPre" class = "mainBtn" @click = "Popup(item)" >{{item.lecture}}</b-button>
                    </div>
                </b-col>
                <hr class = "vertical">
                <b-col>
                    <b-row align-v="center">
                      <b-col><p class = "majorText"> 1-2 </p></b-col>
                    </b-row>
                    <div v-for="item in curriData" v-bind:subject = "item" v-bind:key="item.id" v-if="item.semester == '1-2'">
                       <b-button :pressed.sync = "item.isPre" class = "mainBtn" @click = "Popup(item)" >{{item.lecture}}</b-button>
                    </div>
                </b-col>
                 <hr class = "vertical">
                 <b-col>
                    <b-row align-v="center">
                      <b-col><p class = "majorText"> 2-1 </p></b-col>
                    </b-row>
                    <div v-for="item in curriData" v-bind:subject = "item" v-bind:key="item.id" v-if="item.semester == '2-1'">
                       <b-button :pressed.sync = "item.isPre" class = "mainBtn" @click = "Popup(item)" >{{item.lecture}}</b-button>
                    </div>
                </b-col>
                <hr class = "vertical">
                <b-col>
                    <b-row align-v="center">
                      <b-col><p class = "majorText"> 2-2 </p></b-col>
                    </b-row>
                    <div v-for="item in curriData" v-bind:subject = "item" v-bind:key="item.id" v-if="item.semester == '2-2'">
                        <b-button :pressed.sync = "item.isPre" class = "mainBtn" @click = "Popup(item)" >{{item.lecture}}</b-button>
                    </div>
                </b-col>
                <hr class = "vertical">
                <b-col>
                    <b-row align-v="center">
                      <b-col><p class = "majorText"> 3-1 </p></b-col>
                    </b-row>
                    <div v-for="item in curriData" v-bind:subject = "item" v-bind:key="item.id" v-if="item.semester == '3-1'">
                        <b-button :pressed.sync = "item.isPre" class = "mainBtn" @click = "Popup(item)" >{{item.lecture}}</b-button>
                    </div>
                </b-col>
                 <hr class = "vertical">
                 <b-col>
                   <b-row align-v="center">
                      <b-col><p class = "majorText"> 3-2 </p></b-col>
                    </b-row>
                    <div v-for="item in curriData" v-bind:subject = "item" v-bind:key="item.id" v-if="item.semester == '3-2'">
                        <b-button :pressed.sync = "item.isPre" class = "mainBtn" @click = "Popup(item)" >{{item.lecture}}</b-button>
                    </div>
                </b-col>
                 <hr class = "vertical">
                <b-col>
                    <b-row align-v="center">
                      <b-col><p class = "majorText"> 4-1 </p></b-col>
                    </b-row>
                    <div v-for="item in curriData" v-bind:subject = "item" v-bind:key="item.id" v-if="item.semester == '4-1'">
                        <b-button :pressed.sync = "item.isPre" class = "mainBtn" @click = "Popup(item)" >{{item.lecture}}</b-button>
                    </div>
                </b-col>
                <hr class = "vertical">
                <b-col>
                    <b-row align-v="center">
                      <b-col><p class = "majorText"> 4-2 </p></b-col>
                    </b-row>
                    <div v-for="item in curriData" v-bind:subject = "item" v-bind:key="item.id" v-if="item.semester == '4-2'">
                        <b-button :pressed.sync = "item.isPre" class = "mainBtn" @click = "Popup(item)" >{{item.lecture}}</b-button>
                    </div>
                </b-col>
            </b-row>
        </b-container>
        <v-btn id = "upBtn" v-scroll-to="'#app'"
              fixed
              dark
              fab
              bottom
              right
              color="#9197B5"
            > <i class="material-icons">keyboard_arrow_up</i>
            </v-btn>
          
        <div class = "evaluation" >
          <div id = "eval_container">
               <v-toolbar color="#9197B5" dark >
                  <v-toolbar-title >강의평가</v-toolbar-title>
                  <v-spacer></v-spacer>
                   <router-link :to ="`/evaluation/write`"  v-scroll-to="'#app'">
                   <v-btn  style="margin-left : 50px; background:#57585a; border-radius:10px ">
                     강의평가작성  
                    <i class="material-icons" >add_circle</i>
                  </v-btn>
                  </router-link>
              </v-toolbar>
              <h5 id = "noresult" v-if="filteredItems.length == 0">등록된 강의평가가 없습니다.</h5>
              <v-flex xs12 >
                 <v-container fluid>
                   <v-layout row wrap>
                     <v-flex
                       id = "evaluate" v-for="item in filteredItems" v-bind:key="item.id"
                       xs3
                     >
                     <v-hover>
                      
                       <v-card
                           slot-scope="{ hover }"
                           :class="`elevation-${hover ? 12 : 2}`"
                           class="mx-auto"
                           width="345"
                           flat tile>
                          
                          <div class ="evalContainer" >
                             <h3 style="padding-top:20px">Course</h3>
                             <h5>{{item.lecture}}</h5>
                             <h3>Professor</h3>
                             <h5>{{item.professor}}</h5>
                             <v-rating v-model="item.evaluation.totalGrade"
                                        color="yellow darken-3"
                                        background-color="grey darken-1"
                                        readonly=true>
                            </v-rating>
                            <h5 class = "circle">{{parseFloat(item.evaluation.totalGrade).toFixed(1)}}</h5>
                            <h5>{{item.semester}}</h5><br>
                              <router-link :to ="{name:'eval-view',params:{id: item.id}}">
                              <button type="submit" class = "plusView">Read More</button>
                           </router-link>
                          </div>                             
                       </v-card>                  
                     </v-hover>
                     </v-flex>
                   </v-layout>
                 </v-container>
               </v-flex>
          </div>
        </div>
        <modals-container/>
  </div>
</template>

<script>
import DelPopup from './Popup'
  export default {
    name: 'Main',
    data () {
      return {
        searchKind : null, //검색할 종류 전체/강의명/교수명
        filteredItems:[], //필터링 된 검색 결과
        searchText:'', 
        majors: [] , //드롭다운에 뿌려줄 학과
        clickedMajor : '', //드롭다운에서 선택한 학과
        curriData: [], // 모든 커리큘럼 데이터
        subject: [], //팝업창의 props:subject 데이터 전달
        options: [
          { value: '강의명' },
          { value: '교수명' }
        ],
        alphaGrade : '',  //알파벳 점수 ..고려중
        eval_subject: [], //강의평가 모든 데이터
      }
    },
    created (){
      this.$EventBus.$emit('removeTab', true)
      this.getUserInfo(),
      this.GetMajor(),
      this.getEval()
    },
    methods : {
      //전체/학과/강의명 검색
      searchPost () {
        this.filteredItems = []
      
        if(this.searchKind == '강의명'){
           for (let i = 0; i < this.eval_subject.length; i++) {
                if (this.eval_subject[i].lecture.indexOf(this.searchText) == -1) {
                } else {
                this.filteredItems.push(this.eval_subject[i])
                }
                this.filteredItems = this.filteredItems.slice(0, 10)
            } 
        }else if(this.searchKind == '교수명'){
            for (let i = 0; i < this.eval_subject.length; i++) {
               if (this.eval_subject[i].professor.indexOf(this.searchText) == -1) {
               } else {
               this.filteredItems.push(this.eval_subject[i])
               }
               this.filteredItems = this.filteredItems.slice(0, 10)
            } 
        }
        else{
            for (let i = 0; i < this.eval_subject.length; i++) {
                if (this.eval_subject[i].lecture.indexOf(this.searchText) == -1 && this.eval_subject[i].professor.indexOf(this.searchText) == -1) {
                } else {
                this.filteredItems.push(this.eval_subject[i])
                }
                this.filteredItems = this.filteredItems.slice(0, 10)
            } 
        }
        this.searchText = ''
      },
      //사용자의 기본설정된 학과로 처음 메인화면 표시하기 위함.
      getUserInfo(){
        this.$http.get('/api/profile/user')
          .then(res => {
        this.clickedMajor = res.data.major
        this.GetCurriculum();
        })
      },
      //드롭다운버튼에서 클릭한 학과의 커리큘럼 가져오기
      setMajor(item){
          console.log(item.major)
          this.clickedMajor = item.major
          this.GetCurriculum();
      }, 
      //모든 학과이름과 정보 받아오기
      GetMajor(){
        this.$http.get("/api/major/all").then((res) => {
          this.majors = res.data;
        });
      },
      //커리큘럼 가져오기
      GetCurriculum(){
        console.log("GetCurriculum 들어옴")
        console.log("this.clickedMajor:"+this.clickedMajor)
        this.$http.post("/api/curriculum", {major: this.clickedMajor})
        .then((res) => {
          this.curriData = res.data;
        })
        .catch((err) => {
          alert(err);
        });
      },
      //팝업 
      Popup(clickedItem){
        //팝업에서 클릭 연동하기 위해 이벤트 버스 실행
        this.$EventBus.$on('changeColor', (message) => {
          this.showPreRequisite(clickedItem, message)
        })
        this.$EventBus.$on('del', (message) => {
          this.GetCurriculum()
        })
        this.$EventBus.$on('clickedPopupLectureName', (message) => {
          this.searchText = message.lecture
          this.searchPost()
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
      //선수과목 서로서로 연결. 마지막 선수과목이 없을 때, undefined의 길이를 읽기 때문에 TypeError 발생으로 try...catch 사용
      showPreRequisite(item, isPre){
        for(var i =0 ; i<this.curriData.length; i ++){
          try{
            for(var j =0 ; j<item.prerequisite.length; j++){
              if(item.prerequisite[j].name == this.curriData[i].lecture){
                this.curriData[i].isPre = isPre;
                this.showPreRequisite(this.curriData[i], isPre)
              }
            }
          }catch (e) {}
        }
      },
      //강의평가 모든 정보 가져오기
      getEval() {
        this.$http.get("/api/class/evaluation")
          .then((res) => {
          this.eval_subject = res.data;
          console.log('강의평가모든정보')
          console.log(res.data)
        });
      },
  }  
}  
</script>





<!--**********************css****************************-->
<style>
#noresult{
  margin-top:120px;
  text-align: center;
}
#upBtn{
  margin-bottom:25px;
  margin-right:25px;
}
.evaluation{
  margin-top:200px;
  margin-bottom: 100vh;
}
.evalContainer{
    background-color : lightgray;
    margin-top: 60px;
    width:330px;
    height: 450px;
    background:white;
    text-align: center;
}
.evalContainer h3{
  font-weight: bold;
}
.circle{
    border:thick solid #FFCCCC;
    border-radius: 100%;
    padding-top:5px;
    padding-bottom: 5px;
    width:80px;
    font-size:45px;
    margin-left:38%;
    margin-right:38%;
    margin-top:25px;
    margin-bottom:30px;
}
.plusView{
  font-size: 15px;
    margin-top:10px;
    color:white;
    height:40px;
    width: 90px;
    font-weight: bold;
    background: #C6D6F7;
    text-align: center;
    border:transparent;
    border-radius: 10px;
}
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
#searchButton{
  border:transparent;
  background-color: #C6D6F7;
  border-radius:7px;
  width:4rem;
  height:2rem;
  font-weight: bold;
  color:white;
}
#mainSearchFunction{
  margin-top:70px;
  margin-bottom: 30px;
}
.btn.mainBtn.btn-secondary.active{
  background-color:#FFBDBD;
  color:#57585a;
}
.btn.mainBtn.btn-secondary{
  background-color:#eeefef;
  margin-bottom: 3vh;
  margin-left:1vw;
  margin-right: 1vw;
  border:transparent;
}
.mainBtn{
  position:relative;
  border:transparent;
  border-radius:10px;
  color : #57585a;
  font-weight: bold;
  width: 8vw;
  height:50px;
  min-width: fit-content;
  min-height: fit-content;
}
.eval_write_btn{
  font-size:18px;
  font-weight: bold;
  background-color:#C6D6F7;
  border:#C6D6F7;
}
.majorText{
  margin-top:2vh;
  margin-bottom: 5vh;
  font-weight: bold;
  font-size:18px;
  text-align: center;
}
#ddown-buttons__BV_toggle_{
   font-size:18px;
  font-weight: bold;
  background-color:#C6D6F7;
  border:#C6D6F7;
}
</style>