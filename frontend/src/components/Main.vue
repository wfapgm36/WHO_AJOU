<template>
  <div class="main" >
        <span class = "tab_context">
                <p>{{major}}</p>
                <b-container class="curriculum">
                    <b-row align-v="center" class="height">
                        <b-col>
                            <p> 1-1 </p>
                            <div class ="button" v-for="item in one_one" v-bind:subject = "item" v-bind:key="item.id"  >
                                <button class = "mainBtn" v-bind:style="{ 'background-color': item.color }" @click = "Popup(item)" >{{item.name}}</button>
                            </div>
                        </b-col>
                        <b-col>
                            <p> 1-2 </p>
                            <div class ="button" v-for="item in one_two" v-bind:key="item.id" >
                                <button class = "mainBtn" v-bind:style="{ 'background-color': item.color }" @click = "Popup(item)" >{{item.name}}</button>
                            </div>
                        </b-col>
                         <b-col>
                            <p> 2-1 </p>
                            <div class ="button" v-for="item in two_one" v-bind:key="item.id" >
                                <button class = "mainBtn" v-bind:style="{ 'background-color':  item.color }" @click = "Popup(item)" >{{item.name}}</button>
                            </div>
                        </b-col>
                        <b-col>
                            <p> 2-2 </p>
                            <div class ="button" v-for="item in two_two" v-bind:key="item.id" >
                                 <button class = "mainBtn" v-bind:style="{ 'background-color':  item.color }" @click = "Popup(item)" >{{item.name}}</button>
                            </div>
                        </b-col>
                        <b-col>
                            <p> 3-1 </p>
                            <div class ="button" v-for="item in three_one" v-bind:key="item.id" >
                                  <button class = "mainBtn" v-bind:style="{ 'background-color':  item.color }" @click = "Popup(item)" >{{item.name}}</button>
                            </div>
                        </b-col>
                         <b-col>
                            <p> 3-2 </p>
                            <div class ="button" v-for="item in three_two" v-bind:key="item.id" >
                                  <button  class = "mainBtn" v-bind:style="{ 'background-color':  item.color }" @click = "Popup(item)" >{{item.name}}</button>
                            </div>
                        </b-col>
                        <b-col>
                            <p> 4-1 </p>
                            <div class ="button" v-for="item in four_one" v-bind:key="item.id" >
                                <button class = "mainBtn" v-bind:style="{ 'background-color':  item.color }" @click = "Popup(item)" >{{item.name}}</button>
                            </div>
                        </b-col>
                           <b-col>
                            <p> 4-2 </p>
                            <div class ="button" v-for="item in four_two" v-bind:key="item.id" >
                                 <button class = "mainBtn" v-bind:style="{ 'background-color':  item.color }" @click = "Popup(item)" >{{item.name}}</button>
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

      major: '소프트웨어학과',
      one_one: [],
      one_two: [],
      two_one: [],
      two_two: [],
      three_one: [],
      three_two: [],
      four_one: [],
      four_two: []
    }
  },
  created () {
    this.$EventBus.$emit('removeTab', true)
    this.GetCurriculum()
  },
  methods: {
    // 추후 디비에서 모두 가져와 학기별로 나눠 데이터에 저장하기.
    GetCurriculum () {
      for (var i = 0; i < 5; i++) {
        this.one_one.push({
          name: '컴퓨터프로그래밍' + i,
          color: 'skyblue'
        })
        this.one_two.push({
          name: '객체지향프로그래밍' + i,
          color: 'skyblue'
        })
        this.two_one.push({
          name: '운영체제' + i,
          color: 'skyblue'
        })
        this.two_two.push({
          name: '컴퓨터네트워크' + i,
          color: 'skyblue'
        })
        this.three_one.push({
          name: '컴퓨터통신' + i,
          color: 'skyblue'
        })
        this.three_two.push({
          name: '시스템프로그래밍' + i,
          color: 'skyblue'
        })
        this.four_one.push({
          name: '데이터베이스' + i,
          color: 'skyblue'
        })
        this.four_two.push({
          name: '캡스톤디자인' + i,
          color: 'skyblue'
        })
      }
    },
    Popup (item) {
      if (item.color == 'skyblue') {
        item.color = 'lightpink'
      } else {
        item.color = 'skyblue'
      }
      this.$modal.show(DelPopup, {
        hot_table: 'data',
        subject: item,
        modal: this.$modal
      }, {
        name: 'dynamic-modal',
        width: '600px',
        height: '400px',
        draggable: true,
        clickToClose: false
      }
      )
    }

  }

}
</script>

<style>
.main .card .tabs{
    height: 100vh;
}
.curriculum{
    margin-top:5vh;
    max-width: fit-content;
}
.button{
    margin-bottom: 3vh;
    margin-left:1vw;
    margin-right: 1vw;
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
