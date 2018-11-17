<template>
  <div class="board-write">
    <b-card-group deck
                  class="mb-3">
        <b-card bg-variant="dark"
                header="게시판 글쓰기"
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
                  <b-button type="submit" variant="primary">완료</b-button>
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
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
      this.$http
        .post("/api/board", this.form)
        .then(res => {
          console.log(res.status);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>