<template>
  <div>
      <b-container>
    <b-row>
      <b-col>
  <h2>추가할 전공 입력</h2>
    <b-form @submit.prevent="addMajor">
      <b-input class="major-name" placeholder=" - 학과" v-model="major.name" />
      <b-button v-on:click="addMajor" variant="primary">추가</b-button>
    </b-form>
    <h1 align-h="center">현재 전공 현황</h1>
    <b-table striped hover :items="items" :fields="['major']" outlined="true" small="true" ></b-table>
</b-col>
<b-col>
    <h2>교수님 성함 추가</h2>
    <b-dropdown text="학과를 선택하세요" class="m-2" variant="primary">
           <b-dropdown-item-button v-model="clickedMajor" v-for="item in items" v-bind:key="item.major" @click = "setMajor(item.major)">{{item.major}}</b-dropdown-item-button>
          </b-dropdown>
    <b-form  @submit.prevent="addProfessor">
      <b-input class="major-name" placeholder="이름" v-model="professor.name" />
      <b-button v-on:click="addProfessor" variant="primary">추가</b-button>
    </b-form>
    <h2>[{{this.clickedMajor}}]에 현재 계신 교수님들</h2>
<b-table striped hover :items="professors" :fields="['name']" outlined="true" small="true"></b-table>
</b-col>
    </b-row>
</b-container>
  </div>


  

  
</template>

<script>
export default {
  name: 'major-name',
  data(){
    return{
    items: [],
    professors: [],
    major: {
        name: ""
    },
    professor:{
        name:""
    },
    form :{
        major:"",
        professor:""
    },
    clickedMajor: ''
}
},
  created(){
    this.$EventBus.$emit('removeTab', true)
    this.fetchData()
  },
  methods:{
    fetchData(){
      this.$http.get("/api/major/all")
      .then(res => {
        this.items = res.data
      })
    },
    addMajor(){
        this.$http.post("/api/major/add", this.major)
        .then(res => {
            this.fetchData()
            this.major.name = ""
            console.log("추가완료");
        })
    },
    setMajor (item) {
      this.clickedMajor = item
      this.getProfessor()
      console.log(this.clickedMajor)
    },
    addProfessor(){
        this.form.professor = this.professor.name
        this.form.major = this.clickedMajor
        this.$http.post("/api/major/professor/add", this.form)
        .then(res=>{
            this.professor.name = ''
            this.getProfessor()
        })
    },
    getProfessor(){
        this.form.major = this.clickedMajor
        this.$http.post("/api/major/professor", this.form)
        .then((res) =>{
            this.professors = res.data
            console.log(res.data)
        })
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  b-form{
      text-align: center
  }
  div{
    text-align: center;
  }

</style>