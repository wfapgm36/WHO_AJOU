var mongoose = require("mongoose");
var autoIncrement = require('mongoose-auto-increment')

autoIncrement.initialize(mongoose.connection)

var classSchema = mongoose.Schema({
    id: { type: Number, unique: true },//도큐먼트ID
    userId: { type: String, required: true },
    major: { type: String, required: true }, // 어떤 전공의 과목인지
    lecture: { type: String, required: true }, // 강의 이름
    professor: { type: String, required: true}, // 교수
    semester: { type: String, required: true},
    evaluation: {
        id: String, // autoincrease
        writer: String, // username
        teamProject_grade: Number, // 팀플
        homework_grade: Number, //과제
        test_grade: Number, // 시험
        skill_grade: Number, // 강의력
        totalGrade: Number, // 강의 평가 각 항목의 총 평균 <- 백에서 계산에서 넣기
        enrollment_level: String, // 상,중,하
        memo1: String,
        memo2: String,
        memo3: String,
        memo4: String,
        createAt: { type: Date, default: Date.now() + 3600000 * 9 }
    },
    createAt: { type: Date, default: Date.now() + 3600000 * 9 },
    updated: [{ contents: String, date: { type: Date, default: Date.now() + 3600000 * 9 } }]
},{
    versionKey:false
});

// 강의 평가 도큐먼트 생성
classSchema.statics.create = function (userId, major, lecture, professor, semester, evaluation) {

    const classeval = new this({
        userId,
        major,
        lecture,
        professor,
        semester,
        evaluation
    });


    // return the Promise
    return classeval.save(err => {
      console.log(err);
      if (err) return handledError(err);
    });
};

// 유저가 쓴 강의평가 찾기
classSchema.statics.findDuplicate = function(userId, semester, lecture) {
    console.log("SYSTEM: 중복검사")
    return this.findOne({
        userId: userId, 
        semester: semester, 
        lecture: lecture
    }).exec();

};

//강의평가id로 document 찾기
classSchema.statics.findId = function(id) {
    console.log("SYSTEM: id 찾기")
    console.log("id" +id)
    return this.findOne({
        id: id
    }).exec();

};


// 강의평가id를 Auto Increment 필드로 지정
classSchema.plugin(autoIncrement.plugin, {
    model: 'Class',
    field: 'id',
    startAt: 1
})

var Class = mongoose.model('Class', classSchema, 'Classlist');
module.exports =  Class;
