<template>
  <div class="add-lecture">
    <b-form @submit="onSubmit">
      <b-card-group deck>
        <b-card header-tag="header" footer-tag="footer">
          <h6 slot="header">
            학과
            <div>
              <b-form-select required="true" v-model="selected.major" class="mb-3" size="sm">
                <option v-for="major in majorOptions" v-bind:key ="major.id">{{major.value}}</option>
              </b-form-select>  
            </div>
            
            강의타입
            <div>
              <b-form-select required="true"  v-model="selected.type" class="mb-3" size="sm">
                <option v-for="type in typeOptions" v-bind:key ="type.id">{{type.value}}</option>
              </b-form-select>  
            </div>
            
            강의명
            <div>
              <b-form-input required="true" v-model="selected.lecture"
                          type="text"
                          size = "sm"
                          id="lectureBar" >
                </b-form-input>
            </div>

            학기
            <div>
              <b-form-select required="true" v-model="selected.semester" class="mb-3" size="sm">
                <option v-for="semester in semesterOptions" v-bind:key ="semester.id">{{semester.value}}</option>
              </b-form-select> 
            </div>

            선수과목
            <b-row class="justify-content-md-center" id="choice">
              <b-col col lg="4">
                  <b-form-input v-model="selected.prerequisite[0]"
                          type="text"
                          size = "sm"
                          id="preone" >
                </b-form-input>
              </b-col>
              <b-col col lg="4">
                 <b-form-input v-model="selected.prerequisite[1]"
                          type="text"
                          size = "sm"
                          id="pretwo" >
                </b-form-input>

              </b-col>
              <b-col col lg="4">
                <b-form-input v-model="selected.prerequisite[2]"
                          type="text"
                          size = "sm"
                          id="prethree" >
                </b-form-input>
              </b-col>
            </b-row>

          </h6>

        
          <h6 slot="footer">
            <b-button type="submit" variant="primary">추가</b-button>
          </h6>

          <div>
            <b-form-group id="contentInput">
              <b-form-textarea
              required="true"
                id="contentInput"
                v-model="selected.description"
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
      allMajorData:[],

     
      majorOptions: [],
      typeOptions: [{value: '전공필수'},{value: '전공선택'},{value:'교양필수'},{value:'교양선택'}],
      lectureOptions: [],
      semesterOptions: [
        {value: '1-1'},
        {value: '1-2'},
        {value: '2-1'},
        {value: '2-2'},
        {value: '3-1'},
        {value: '3-2'},
        {value: '4-1'},
        {value: '4-2'},
      ],

      selected: {
        major: null,
        type: null,
        lecture:'',
        prerequisite:[],
        semester:null,
        description: ""
      }
    };
  },created(){
    this.$EventBus.$emit('removeTab', true)
    this.getMajor()
  },
  methods: {
    //학과 선택 함수
    getMajor() {
      this.$http
        .get("/api/major/all")
        .then(res => {
          this.allMajorData = res.data
          for (var i = 0; i < res.data.length; i++) {
            this.majorOptions.push({value: res.data[i].major});
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSubmit() {
   
      this.$http
        .post("/api/curriculum/create", this.selected)
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
         this.$router.push("/main");
    }
  }
};
</script>
