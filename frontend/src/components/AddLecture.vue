<template>
  <div class="add-lecture">
    <b-form @submit="onSubmit">
      <b-card-group deck>
        <b-card header-tag="header" footer-tag="footer">
          <h6 slot="header">
            학과
            <div>
              <b-form-select  v-model="selected.major" class="mb-3" size="sm">
                <option v-for="major in majorOptions" v-bind:key ="major.id">{{major.value}}</option>
              </b-form-select>  
            </div>
            
            강의타입
            <div>
              <b-form-select  v-model="selected.type" class="mb-3" size="sm">
                <option v-for="type in typeOptions" v-bind:key ="type.id">{{type.value}}</option>
              </b-form-select>  
            </div>
            
            강의명
            <div>
              <b-form-select  v-model="selected.lecture" class="mb-3" size="sm">
                <option v-for="lecture in lectureOptions" v-bind:key ="lecture.id">{{lecture.value}}</option>
              </b-form-select>  
            </div>
            
            선수과목
            <b-row class="justify-content-md-center" id="choice">
              <b-col col lg="4">
                <div>
                  <b-form-select  v-model="selected.prequisite[0]" class="mb-3" size="sm">
                    <option :value="null">없음</option>
                    <option v-for="prequisite in prequisiteOptions" v-bind:key ="prequisite.id">{{prequisite.value}}</option>
                  </b-form-select> 
                </div>
              </b-col>
              <b-col col lg="4">
                <div>
                  <b-form-select  v-model="selected.prequisite[1]" class="mb-3" size="sm">
                    <option :value="null">없음</option>
                    <option v-for="prequisite in prequisiteOptions" v-bind:key ="prequisite.id">{{prequisite.value}}</option>
                  </b-form-select> 
                </div>
              </b-col>
              <b-col col lg="4">
                <div>
                  <b-form-select  v-model="selected.prequisite[2]" class="mb-3" size="sm">
                    <option :value="null">없음</option>
                    <option v-for="prequisite in prequisiteOptions" v-bind:key ="prequisite.id">{{prequisite.value}}</option>
                  </b-form-select> 
                </div>
              </b-col>
            </b-row>

            학기
            <div>
              <b-form-select  v-model="selected.semester" class="mb-3" size="sm">
                <option v-for="semester in semesterOptions" v-bind:key ="semester.id">{{semester.value}}</option>
              </b-form-select> 
            </div>
          </h6>

          <h6 slot="footer">
            <b-button type="submit" variant="primary">제출</b-button>
          </h6>

          <div>
            <b-form-group id="contentInput">
              <b-form-textarea
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
      typeOptions: [],
      lectureOptions: [],
      prequisiteOptions: [],
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
        //테스트용
        //major: '미디어',
        //type: '전공',
        //lecture: '객프',
        //prequisite: ['컴설','자구'],
        //semester: '1-1',
        //description: "안녕",
        
        major: null,
        type: null,
        lecture:null,
        prequisite:[],
        semester:null,
        description: "",
        isPre: false
      }
    };
  },created(){
    this.getMajor()
  },
  //select 시, 학과명이 바뀔때마다 과목명과 교수명을 다시 받기 위함
  watch: { 'majorSelected': function() {
      this.getLecture()
      this.getProfessor()
    }
  },
  methods: {
    //majorOptions
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
    // lectureOptions
    //선택한 학과에 따라 강의명 넣기 
    getLecture() {
      this.$http
        .post("/api/curriculum", {
          major: this.selected.major
        })
        .then(res => {
          console.log("커리큘럼 내 모든 과목");
          console.log(res.data);
          for (var i = 0; i < res.data.length; i++) {
            this.lectureOptions.push({ value: res.data[i].lecture });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //professorOptions
    //선택한 학과에 따라 교수명 데이터 넣기
    getProfessor() {
      this.professorOptions = []
      for(var i =0 ; i<this.allMajorData.length; i++){
       if(this.allMajorData[i].major == this.selected.major){
        for (var j = 0; j < this.allMajorData[i].professor.length; j++) {
            this.professorOptions.push({ value: this.allMajorData[i].professor[j].name });
        }
       }
      }
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
