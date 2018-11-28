<template>
  <div class="board-update">
    <b-card-group deck
                  class="mb-3">
      <b-card bg-variant="dark"
              header="게시글 수정"
              text-variant="white"
              class="text-center">
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
    </b-card-group>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          title: "",
          contents: ""
        },
        show: true
      };
    },
    created() {
      this.fetchData()
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault();
        this.$http.put(`/api/board/${this.$route.params.id}`, this.form)
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
