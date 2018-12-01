<template>
  <div class="board-view">
    <div>
    <b-card-group deck>
        <b-card header-tag="header"
                footer-tag="footer">
            <h6 slot="header" class="mb-0"><b-badge variant="dark">작성자</b-badge> {{this.form.writer}} 
            <b-badge variant="dark">작성일</b-badge>{{this.form.createAt.substr(0,10)}} {{this.form.createAt.substr(11,2)}}시 {{this.form.createAt.substr(14,2)}}분 
            <b-badge variant="dark">조회수</b-badge> {{this.form.count}}
            <br><b-badge variant="dark">제목</b-badge> {{this.form.title}}</h6>
            <h6 slot="footer" v-for="(item, index) in form.comments"
                              v-bind:key="item._id">
                              <b-badge variant="dark">{{index}}</b-badge>
                              <b-badge variant="dark">{{item.name}}</b-badge> 
                              {{item.memo}} {{item.createAt.substr(0,10)}} {{item.createAt.substr(11,2)}}시 {{item.createAt.substr(14,2)}}분
                              <b-badge pill href="#" v-on:click="deleteComment(item._id)" variant="danger" size="sm">삭제</b-badge>
            </h6>
            <p class="card-text">{{this.form.contents}}</p>
        </b-card>
    </b-card-group>
    <div style="width:600px;">
      <h4><b-badge variant="dark">댓글</b-badge></h4>
      <b-form @submit.prevent="addComment" v-on:keyup.enter="addComment">
      <b-form-textarea placeholder="댓글을 입력하세요." rows="2" max-rows="6" v-model="memo">
      </b-form-textarea><b-button type="submit" variant="primary" size="sm">댓글 작성(Enter)</b-button>
      </b-form>
    </div>
    </div>
    <b-button-group size="sm">
    <b-button v-on:click="toBoard" variant="primary">목록</b-button>
    <b-button v-on:click="updateBoard" variant="primary">수정</b-button>
    <b-button v-on:click="deleteBoard" variant="danger">삭제</b-button>
    </b-button-group>  
  </div>
</template>

<script>
export default {
  name: "boardView",
  data() {
   return {
     form: {
       _id: this.$route.params.id,
       title: "",
       contents: "",
       createAt: "",
       count: "",
       comments: [{
         name: "",
         memo: "",
       }]
     },
     memo: ""
   };
  },
  created(){
    this.$EventBus.$emit('removeTab', true);
      this.getBoardDetail();
  },
  methods: {
   getBoardDetail(){
    this.$http.get(`/api/board/view/${this.$route.params.id}`)
       .then(res => {
         this.form = res.data;
       });
   },
   deleteBoard(){
       this.$http.delete(`/api/board/posts/${this.$route.params.id}`)
       .then(res => {
         const status = res.status;
         if(status == 200){
           alert('정상적으로 삭제되었습니다.');
           this.$router.push('/board')
         }else if(status == 203){
           alert('해당 권한이 존재하지 않습니다.');
           this.$router.push('/board')
         }
       }).catch(err => {
         alert(err)
       })
   },
   toBoard(){
     this.$router.push('/board')
   },
   updateBoard(){
     this.$http.get(`/api/board/posts/${this.$route.params.id}`)
       .then((res) => {
         const status = res.status
         if(status == 200){
           this.$router.push({
             path: '/update/:id',
             name: 'board-update',
             params: {
               id: this.$route.params.id
             }
           })
         } else if (status == 203){
           alert("해당 권한이 존재하지 않습니다.")
           this.$router.push('/board')
         }
       })
   },
   addComment(){
     let comment = {
       name: "",
       memo: "",
       boardId: Number
     }
     comment.name = this.$cookies.get('nickname')
     comment.memo = this.memo;
     comment.boardId = this.form._id;
     this.$http.post(`/api/board/comment`, comment)
     this.memo = ''
     this.getBoardDetail()
   },
   deleteComment(_id){
      this.$http.delete(`/api/board/comment`, {data: {boardId: this.$route.params.id, commentId: _id }})
      .then((res) => {
        const status = res.status
        if(status == 200){
          alert('댓글이 삭제되었습니다.');
          this.getBoardDetail()
        } else if (status == 203){
          alert("해당 권한이 존재하지 않습니다.")
          this.$router.push('/board')
        }
      })
      
    }
  }
};
</script>
