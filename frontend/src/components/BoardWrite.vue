<template>
  <v-jumbotron
    id="jumbo"
    height="1000px"
    :gradient="gradient"
    src="https://images.unsplash.com/photo-1500189001820-d65835a662d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80"
  >
    <div class="out_boardwrite">
      <div class="in_boardwrite">
        <b-card bg-variant="white"
                header="게시판 글쓰기"
                text-variant="black"
                id="card_boardwrite">
          <div>
            <b-form @submit="onSubmit" v-if="show">
              <b-form-group id="titleInput"
                            label="제목"
                            label-for="titleInput">
                <b-form-input id="titleInput"
                              type="text"
                              v-model="form.title"
                              required
                              placeholder="제목">
                </b-form-input>
              </b-form-group>
              <b-form-group id="contentInput"
                            label="내용"
                            label-for="contentInput">
                <b-form-textarea id="contentInput"
                                 v-model="form.contents"
                                 placeholder="내용"
                                 :rows="15"
                                 :max-rows="25">
                </b-form-textarea>
              </b-form-group>
              <b-button type="submit" variant="primary">완료</b-button>
            </b-form>
          </div>
        </b-card>
      </div>
    </div>
  </v-jumbotron>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: "",
        contents: "",
        nickname: this.$cookies.get('nickname')
      },
      show: true,
      gradient: 'to top right, rgba(255,255,255, .7), rgba(200,200,200, .7)'
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.$http
        .post("/api/board", this.form)
        .then((res) => {
          this.$router.push("/board");
        })
        .catch((err) => {
          alert(err);
        });
    }
  },
  created(){
    this.$EventBus.$emit('removeTab', true);
  }
};
</script>
<style>
  div.out_boardwrite{
    text-align: center;
  }

  div.in_boardwrite{
    display: inline-block;
  }

  #card_boardwrite{
    margin-top: 60px;
    width: 800px;
  }
</style>
