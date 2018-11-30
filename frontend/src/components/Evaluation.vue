<template>
    <div class = "evaluation">
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
                <b-col cols = "2">
                  <button class="searchButton" type="submit" size = "sm" >검색</button>
                </b-col>
            </b-row>
        </div>
        <b-row >
            <b-col align-v="center" id = "evaluate" v-for="item in subject" v-bind:key="item.id">
                <div class ="evalContainer" >
                    <h3>Course</h3>
                    <h6>{{item.name}}</h6>
                    <h3>Professor</h3>
                    <h6>{{item.professor}}</h6>
                    <h5 class = "circle">{{item.grade}}</h5>
                    <h8>{{item.brief}}</h8><br>
                    <button type="submit" class = "plusView" @click="goToEval()">Read More</button>
                </div>
            </b-col>
        </b-row>
    </div>
</template>
<script>
export default {
  name: 'Evaluation',
  data () {
    return {
      searchText: '',
      subject: [],
      options: [
        { text: '전체' },
        { text: '강의명' },
        { text: '교수명' }
      ]
    }
  },
  created () {
    this.$EventBus.$emit('removeTab', true)
    this.getEval()
  },
  methods: {
    // 과목명 일치하는 데이터 가져와 저장
    getEval () {
      for (var i = 0; i < 8; i++) {
        this.subject.push({
          name: this.$route.params.id,
          professor: '오상윤',
          grade: 'A+',
          brief: '강의는 전반적으로...'
        })
      }
    }
  }
}

</script>

<style>
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
  padding-left : 8vw;
  margin-bottom: 30px;
}
#evaluate{
    margin-top: 50px;
}
h3{
    font-weight: bold;
    margin-top: 30px;
}
.evalContainer{
    border:3px solid yellow;
    border-radius: 50px;
    width:330px;
    height: 450px;
    background:white;
    text-align: center;
}

.circle{
    border:thick solid yellow;
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
    margin-top:30px;
    color:white;
    height:40px;
    font-weight: bold;
    background: lightblue;
    text-align: center;
    border:transparent;
    border-radius: 10px;
}
</style>
