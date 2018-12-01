<template>
  <div class="add-lecture">
    <b-form @submit="onSubmit">
      <b-card-group deck>
        <b-card header-tag="header" footer-tag="footer">
          <h6 slot="header">학과
            <div>
              <b-form-select v-model="form.major" :options="major" class="mb-3"/>
            </div>강의타입
            <div>
              <b-form-select v-model="form.type" :options="type" class="mb-3"/>
            </div>강의명
            <div>
              <b-form-select v-model="form.lecture" :options="lecture" class="mb-3"/>
            </div>선수과목
            <div>
              <b-form-select v-model="form.prequisite" :options="prequisite" class="mb-3"/>
            </div>
          </h6>

          <h6 slot="footer">
            <b-button type="submit" variant="primary">제출</b-button>
          </h6>

          <div>
            <b-form-group id="contentInput">
              <b-form-textarea
                id="contentInput"
                v-model="form.contents"
                placeholder="상세정보"
                :rows="15"
                :max-rows="25"
              ></b-form-textarea>
            </b-form-group>
          </div>
        </b-card>
      </b-card-group>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "add-lecture",
  data() {
    return {
      major: [
        { value: "ㅁ", text: "Please select an option" },
        { value: "ㅁ", text: "This is First option" },
        { value: "ㅁ", text: "Selected Option" },
        { value: "ㅁ", text: "This is an option with object value" },
        { value: "ㅁ", text: "This one is disabled" }
      ],
      type: [],
      lecture: [],
      prequisite: [],
      form: {
        major: null,
        type: null,
        prequisite: null,
        contents: ""
      }
    };
  },
  methods: {
    onSubmit() {
      this.$http
        .post(`#`, this.form)
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
