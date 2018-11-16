<template>
  <div id="board">
    <h1 align-h="center">This is Board Page!</h1>
    <div class = "searchFunction">
      <b-row class="search">
        <b-col cols = "1.3">
          <div>
              <b-form-select v-model="selected" :options="options" class="mb-3" size = "sm" />
          </div>
        </b-col>
        <b-col>
          <b-form-input v-model="searchText" 
                    type="text" 
                    placeholder="Search"
                    size = "sm"
                    id="searchBar" >
          </b-form-input>
        </b-col>
        <b-col>
          <b-button class="" type="submit" size = "sm" >Search</b-button>
        </b-col>
      </b-row>
    </div>
    <div id = "board_main">
      <b-container class="content_row">
      <b-row class="text-center" align-h= "center">
        <b-col >번호</b-col>
        <b-col cols="5">제목</b-col>
        <b-col>작성자</b-col>
        <b-col cols="2">등록일</b-col>
        <b-col>조회수</b-col>
      </b-row>  
      <hr>   
      <div v-for="item in boards" v-bind:key="item.id">
        <b-row class="text-center">
          <b-col >{{item.id}}</b-col>
          <b-col cols="5">
            <router-link to = "/board/view">
              <b-button id= "title_button">{{item.title}}</b-button>
            </router-link>
          </b-col>
          <b-col>{{item.writer}}</b-col>
          <b-col cols="2">{{item.date}}</b-col>
          <b-col>{{item.cnt}}</b-col>
        </b-row>
        <hr>
      </div>
      <div id = "paging">
        <b-pagination-nav base-url="#" align = "center" :total-rows="10" :number-of-pages="10" v-model="currentPage" />
        <router-link to = "/board/write">
          <b-button id = "write_board" size = "sm">글쓰기</b-button>
        </router-link>
        <br>
        <div>currentPage: {{currentPage}}</div>
      </div>
      
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Board',
  data () {
    return {
      currentPage : 1,
      searchText:'',
      boards: [],
      options: [
        { text: '전체' },
        { text: '제목' },
        { text: '작성자' },
        { text: '게시물 번호' }
      ]
    }
  },
  created() {
      this.$EventBus.$emit('removeTab' , true)
       for(var i =0 ; i<20; i++){
        this.boards.push({
          id : i+1,
          title: 'this is 제목용'+(i+1),
          writer: '이아연'+(i+1),
          date: '2018-11-'+i,
          cnt : 20+i        
        });
      }
  },
  methods: {
      /***************페이지마다 게시글 불러오기 처리*************/
     
        /******나중 디비에서 불러올때 사용할것 *****/
        /*
      this.$http.get('/boards')
      .then((res) => {
      
        this.boards.number = res.number
        this.boards.title = res.title
        this.boards.writer = res.writer
        this.boards.date = res.createdAt
        this.boards.cnt = res.count
        
      })*/
    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 #board_main {
  margin-left:400px; 
  margin-right:400px;

 }
 #write_board{
   float: right;
 }
 #title_button{
   float: center;
   color:black;
   background-color:transparent;
   border:0;
   outline:0;
 }
 .searchFunction{
    margin-left:300px;
    width:80%; height:100%;
    margin-bottom:50px;
 } 
 .search{
   width:70rem;
   margin-left:330px;
   padding-right:30px;
 }
 .content_row {
   width:70rem;
 }
 #searchBar{
   width:30rem;
 }
 hr{
   width:70rem;
 }
 
</style>
