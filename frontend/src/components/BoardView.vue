<template>
  <div class="board-view">
    <div>
    <b-card-group deck>
        <b-card header-tag="header"
                footer-tag="footer">
            <h6 slot="header" class="mb-0"><b>제목: </b> {{this.form.title}}</h6>
            <h6 slot="footer" v-for="item in comments"
                              v-bind:key="item._id" >
                              <b>댓글: </b> {{form.comment}}
            </h6>
            <p class="card-text"><b>내용: </b> {{this.form.contents}}</p>
        </b-card>
    </b-card-group>
    </div>
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
       date: "",
       cnt: "",
       comments: {
         name: "",
         memo: "",
         date: ""
       }
     }
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
       .then( 
           this.$router.push('/board')
       )
       
   }
  }
};
</script>