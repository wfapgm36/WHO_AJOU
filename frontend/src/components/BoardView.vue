<template>
  <div class="board-view">
    <div>
    <b-card-group deck>
        <b-card header-tag="header"
                footer-tag="footer">
            <h6 slot="header" class="mb-0"><b>|작성자: </b> {{this.form.writer}} <b>|작성한 시간: </b> {{this.form.createAt}} <b>|조회수: </b> {{this.form.count}}
            <br><b>|제목: </b> {{this.form.title}}</h6>
            <h6 slot="footer" v-for="item in form.comments"
                              v-bind:key="item._id" >
                              <b>{{item.name}}: </b> {{item.memo}}
            </h6>
            <p class="card-text"><b>내용: </b> {{this.form.contents}}</p>
        </b-card>
    </b-card-group>
    <div>
      <h4>댓글</h4>
      <b-form @submit.prevent="addComment">
      <b-form-textarea rows="4" cols="50" v-model="memo">
      </b-form-textarea><b-button type="submit">등록</b-button>
      </b-form>
    </div>
    </div>
    <button v-on:click="toBoard">목록</button>
    <button v-on:click="updateBoard">수정</button>
    <button v-on:click="deleteBoard">삭제</button>
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
       this.$http.delete(`/api/board/${this.$route.params.id}`)
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
     console.log(comment.name)
     console.log(comment.memo)
     this.$http.post(`/api/board/comment`, comment)
   }
  }
};
</script>
