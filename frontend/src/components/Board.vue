<template>
  <div id="board">
    <div id = "board_main">
      <b-container class="content_row">

  <v-text-field
        v-model="searchText"
        append-icon="search"
        label="게시글 제목이나 내용을 입력하세요."
        single-line
        hide-details
      ></v-text-field>
      <br>

      <v-data-table
      :disable-initial-sort="true"
          :headers="headers"
          :items="filteredItems"
          class="elevation-1"
          hide-actions
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item._id }}</td>
          <td class="text-xs-center">
            <router-link :to="`/view/${props.item._id}`"
            >{{props.item.title}}
            </router-link>[{{props.item.comments.length}}]
          </td>
            <td class="text-xs-center">{{ props.item.writer }}</td>
            <td class="text-xs-center">{{ $moment(props.item.createAt).format('LLLL') }}</td>
            <td class="text-xs-center">{{ props.item.count }}</td>
          </template>
      </v-data-table>

      <div id = "paging">
        <b-pagination size="md" hide-goto-end-buttons :total-rows="this.items.length" v-model="currentPage" :per-page="5" align="center">
    </b-pagination>
          <router-link to = "/write">
            <!--<b-button id = "write_board" size = "sm" variant="primary">글쓰기</b-button>-->
            <v-btn
              dark
              fab
              right
              color="indigo"
              id = "board_write"
            >
              <v-icon>add</v-icon>
            </v-btn>
          </router-link>
          <br>
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
      // 테이블 디자인 부분임
      headers: [
        {
          text: '번호',
          align: 'center',
          sortable: false,
          value: '_id'
        },
        {text: '제목', align: 'center', value: 'title', sortable: false},
        {text: '작성자', align: 'center', value: 'writer', sortable: false},
        { text: '등록일', align: 'center', value: 'createAt' },
        { text: '조회수', align: 'center', value: 'count' }
      ],
      filteredItems: [],
      currentPage: 1,
      result: '',
      searchText: '',
      items: [],
      numberOfPosts: 0
    }
  },
  created () {
    this.$EventBus.$emit('removeTab', true)
    this.getAllPosts()
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.filteredItems = this.items.slice((this.currentPage - 1) * 5, (this.currentPage) * 5)
    },
    getAllPosts () {
      this.$http.get('/api/board').then((res) => {
        this.filteredItems = res.data
        this.items = res.data
        this.numberOfPosts = Math.ceil(res.data.length / 5)
        this.filteredItems = this.items.slice((this.currentPage - 1) * 5, (this.currentPage) * 5)
      })
    },
    searchPost () {
      this.filteredItems = []
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].title.indexOf(this.searchText) === -1 && this.items[i].contents.indexOf(this.searchText) === -1) {
        } else {
          this.filteredItems.push(this.items[i])
        }
      }
      this.filteredItems = this.filteredItems.slice(0, 5)
    }
  },
  watch: {
    currentPage: function () {
      this.fetchData()
    },
    searchText: function () {
      this.searchPost()
    }
  }
}
</script>

<style scoped>
  #board{
    background-color: rgba(220,220,220,0.3);
    height: 850px;
  }
#boardSearchFunction{
  margin-top:70px;
  margin-bottom: 30px;
}
#board_main {
  padding-top: 60px;
  margin-left: 400px;
  margin-right: 400px;
}
#write_board {
  float: right;
  background-color: #C6D6F7;
  border : transparent;
  font-size: 15px;
  font-weight: bold;
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
#paging{
  margin-top:30px;
}
.content_row {
  background-color: #ffffff;
  width: 70rem;
}
#searchBar {
  width: 30rem;
}
hr {
  width: 70rem;
}
.page-item .active .page-link{
  background-color:#9197B5 !important;
}
  #board_write{
    margin-right: 400px;
  }
</style>
