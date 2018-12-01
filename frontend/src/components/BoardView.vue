<template>
  <div class="board-view">
    <div>
    <b-card-group deck>
        <b-card header-tag="header"
                footer-tag="footer">
            <h6 slot="header" class="mb-0"><b>|작성자: </b> {{this.form.writer}} <b>|작성한 시간: </b> {{this.form.createAt}} <b>|조회수: </b> {{this.form.count}}
            <br><b>|제목: </b> {{this.form.title}}</h6>
            <h6 slot="footer" v-for="(item, index) in form.comments"
                              v-bind:key="item._id">
                              <b>#{{index}} {{item.name}}: </b> {{item.memo}} | {{item.createAt}}
                              <b-badge pill href="#" v-on:click="deleteComment(item._id)" variant="primary" size="sm">삭제</b-badge>
            </h6>
            <p class="card-text"><b>내용: </b> {{this.form.contents}}</p>
        </b-card>
    </b-card-group>
    <div style="width:600px;">
      <h4>댓글</h4>
      <b-form @submit.prevent="addComment" v-on:keyup.enter="addComment">
      <b-form-textarea placeholder="댓글을 입력하세요." rows="2" max-rows="6" v-model="memo">
      </b-form-textarea><b-button type="submit" variant="primary" size="sm">댓글 작성</b-button>
      </b-form>
    </div>
    </div>
    <b-button-group size="sm">
    <b-button v-on:click="toBoard" variant="primary">목록</b-button>
    <b-button v-on:click="updateBoard" variant="primary">수정</b-button>
    <b-button v-on:click="deleteBoard" variant="primary">삭제</b-button>
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
     // 권한 확인
     console.log("누름")
     this.$http.get(`/api/board/posts/${this.$route.params.id}`)
       .then((res) => {
         console.log(res)
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
     let id = {
       boardId: this.$route.params.id,
       commentId: _id
     }
      this.$http.delete(`/api/board/comment`, {data: {boardId: this.$route.params.id, commentId: _id }});
      this.getBoardDetail()
    }
    
  }
};
</script>
