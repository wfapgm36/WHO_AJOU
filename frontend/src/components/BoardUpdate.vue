<template>
  <v-jumbotron
    id = "jumbo"
    height="1000px"
    :gradient="gradient"
    src="https://images.unsplash.com/photo-1500189001820-d65835a662d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80"
  >
    <div class="out_boardupdate">
      <div class="in_boardupdate">
      <b-card bg-variant="white"
              header="게시글 수정"
              text-variant="black"
              class="text-center"
              id="card_boardupdate">
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
            <b-button type="submit" variant="primary">수정</b-button>
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
          contents: ""
        },
        show: true,
        gradient: 'to top right, rgba(255,255,255, .7), rgba(200,200,200, .7)'
      };
    },
    created() {
      this.$EventBus.$emit('removeTab', true);
      this.fetchData()
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault();
        this.$http.put(`/api/board/posts/${this.$route.params.id}`, this.form)
          .then((res) => {
            const status = res.status
            if (status == 200) {
              this.$router.push('/board')
              alert('수정이 완료되었습니다.')
            }
          })
          .catch((err) => {
            alert(err);
          });
      },
      fetchData() {
        this.$http.get(`/api/board/posts/${this.$route.params.id}`)
          .then((res) => {
            const status = res.status;
            if (status == 200) {
              console.log(res.data)
              this.form.title = res.data.title
              this.form.contents = res.data.contents
            }
          })
      }
    }
  };
</script>
<style>
  div.out_boardupdate{
    text-align: center;
  }

  div.in_boardupdate{
    display: inline-block;
  }

  #card_boardupdate{
    margin-top: 60px;
    width: 800px;
  }
</style>
