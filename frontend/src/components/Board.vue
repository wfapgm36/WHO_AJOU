<template>
  <div id="board">
    <!-- <h1 align-h="center">게시판</h1> -->
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
      <div v-for="item in items" v-bind:key="item.id">
        <b-row class="text-center">
          <b-col >{{item._id}}</b-col>
          <b-col cols="5">
            <b-button id= "title_button" @click="$router.push({
              path: '/view/:id',
              name: 'board-view',
              params: {
                id: item._id
              }
              })">{{item.title}}</b-button>
          </b-col>
          <b-col>{{item.writer}}</b-col>
          <b-col cols="2">{{item.createAt}}</b-col>
          <b-col>{{item.count}}</b-col>
        </b-row>
        <hr>
      </div>
      <div id = "paging">
        <b-pagination-nav base-url="#" align = "center" :total-rows="10" :number-of-pages="10" v-model="currentPage" />
        <router-link to = "/write">
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
  name: "board",
  data() {
    return {
      currentPage: 1,
      searchText: "",
      items: [],
      options: [
        { text: "전체" },
        { text: "제목" },
        { text: "작성자" },
        { text: "게시물 번호" }
      ]
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$http.get("/api/board").then((res) => {
        this.items = res.data;
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
