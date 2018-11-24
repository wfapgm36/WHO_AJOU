<template>
  <div class="board-view">
    <div>
    <b-card-group deck>
        <b-card header-tag="header"
                footer-tag="footer">
            <h6 slot="header" class="mb-0">제목 {{this.form.title}}</h6>
            <h6 slot="footer">댓글</h6>
            <p class="card-text">내용 {{this.form.contents}}</p>
        </b-card>
    </b-card-group>
    </div>
    <!--
    <b-card-group deck>
        <b-card header-tag="header"
                footer-tag="footer">
            <h6 slot="header" class="mb-0">제목 {{form.title}}</h6>
            <h6 slot="footer" v-for="item in comments"
                              v-bind:key="item.id" >
                              댓글 {{form.comment}}
            </h6>
            <p class="card-text">내용 {{form.content}}</p>
        </b-card>
    </b-card-group> 
    -->
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
   }
  }
};
</script>