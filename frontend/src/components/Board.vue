<template>
  <div id="board">
    <div class = "searchFunction">
      <b-row class="search">
        <b-col cols = "1.3">
        </b-col>
        <b-col>
<<<<<<< HEAD
          <b-form-input v-model="searchText"
                    type="text"
                    placeholder="Search"
=======
          <b-form @submit.prevent="searchPost">
                    <b-form-input v-model="searchText" 
                    type="text" 
                    placeholder="게시글 제목이나 내용을 입력하세요."
>>>>>>> 60a576ab8c82dfb82bfcb8bc316cd6ce1414b344
                    size = "sm"
                    id="searchBar">
          </b-form-input><b-button variant="primary" type="submit" size = "sm" >검색</b-button>
          </b-form>
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
<<<<<<< HEAD
      </b-row>
      <hr>
      <div v-for="item in items" v-bind:key="item.id">
=======
      </b-row>  
      <hr>   
      <div v-for="item in filteredItems" v-bind:key="item.id">
>>>>>>> 60a576ab8c82dfb82bfcb8bc316cd6ce1414b344
        <b-row class="text-center">
          <b-col >{{item._id}}</b-col>
          <b-col cols="5">
            <b-button id= "title_button" @click="$router.push({
              path: '/view/:id',
              name: 'board-view',
              params: {
                id: item._id
              }
              })"><b-btn id="tootipTitle" variant="outline-white" v-b-tooltip.hover title="상세보기">{{item.title}}</b-btn></b-button>
          </b-col>
          <b-col>{{item.writer}}</b-col>
          <b-col cols="2">{{item.createAt.substr(0,10)}} {{item.createAt.substr(11,2)}}시 {{item.createAt.substr(14,2)}}분</b-col>
          <b-col>{{item.count}}</b-col>
        </b-row>
        <hr>
      </div>
      <div id = "paging">
        <b-pagination-nav base-url="#" align = "center" :number-of-pages="this.numberOfPosts" v-model="currentPage" 
        hide-goto-end-buttons/>
        <router-link to = "/write">
          <b-button id = "write_board" size = "sm" variant="primary">글쓰기</b-button>
        </router-link>
        <br>
        <b-badge variant="primary">현재 페이지: {{currentPage}}</b-badge>
      </div>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'board',
  data () {
    return {
      currentPage: 1,
      result: '',
      searchText: "",
      items: [],
      filteredItems:[],
      numberOfPosts: 0,
    };
  },
  created() {
    this.$EventBus.$emit('removeTab', true);
    this.getAllPosts();
  },
  methods: {
    fetchData() {
        let hash = location.hash.substr(1, location.hash.length)
        if(hash){
          this.filteredItems = this.items.slice((hash-1)*5, (hash)*5)
        } 
      else{
        this.filteredItems = this.items.slice(0, 5)
      }
    },
    getAllPosts(){
      this.$http.get('/api/board').then((res) => {
        this.items = res.data
        this.numberOfPosts = Math.ceil(res.data.length / 5)
      })
    },
    searchPost(){
      this.filteredItems = []
      for(let i = 0; i < this.items.length; i++){
        if(this.items[i].title.indexOf(this.searchText) == -1 && this.items[i].contents.indexOf(this.searchText) == -1){
      }else{
        this.filteredItems.push(this.items[i])
      }
    }
    this.filteredItems = this.filteredItems.slice(0, 5)
    }
  },
  watch:{
    currentPage: function(){
      this.fetchData();
    },
    searchText: function(){
      this.searchPost();
    }
  }
}
</script>

<style scoped>
#board_main {
  margin-left: 400px;
  margin-right: 400px;
}
#write_board {
  float: right;
}
#title_button {
  float: center;
  color: black;
  background-color: transparent;
  border: 0;
  outline: 0;
}
.searchFunction {
  margin-left: 300px;
  width: 80%;
  height: 100%;
  margin-bottom: 50px;
}
.search {
  width: 70rem;
  margin-left: 330px;
  padding-right: 30px;
}
.content_row {
  width: 70rem;
}
#searchBar {
  width: 30rem;
}
hr {
  width: 70rem;
}
</style>
