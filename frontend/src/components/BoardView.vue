<template>
  <div class="boards-view">
    <div>
    <b-card-group deck>
        <b-card header-tag="header"
                footer-tag="footer">
            <h6 slot="header" class="mb-0">제목</h6>
            <h6 slot="footer">댓글</h6>
            <p class="card-text">내용</p>
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
  name: "BoardsView"
  //data() {
  //  return {
  //    form: {
  //      id: boardId(),
  //      title: "",
  //      content: "",
  //      date: "",
  //      cnt: "",
  //      comments: {
  //        name: "",
  //        memo: "",
  //        date: ""
  //      }
  //    }
  //  };
  //},
  //computed: {
  //  boardId() {
  //    return this.$route.paramas.id;
  //  }
  //},
  //method: {
  //  getBoardDetail() {
  //    this.$http
  //      .get("/api/boards/view/:id", {
  //        id: this.form.id
  //      })
  //      .then(res => {
  //        console.log(res.status);
  //        console.log(res.data);
  //        this.form = res.data;
  //      })
  //      .catch(err => {
  //        console.log(err);
  //      });
  //  }
  //}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
