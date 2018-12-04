var mongoose = require("mongoose");
var autoIncrement = require('mongoose-auto-increment')

autoIncrement.initialize(mongoose.connection)

var classSchema = mongoose.Schema({
    id: { type: Number, unique: true },
    userId: { type: String, required: true },
    major: { type: String, required: true }, // 어떤 전공의 과목인지
    name: { type: String, required: true }, // 강의 이름
    professor: { type: String, required: true}, // 교수
    code: { type: String, required: true }, // 과목코드
    semester: { type: String, required: true},
    evaluation: [{
        id: String, // autoincrease
        writer: String, // username
        teamProject_grade: { // 팀플
            grade: Number,
            count: Number
        },
        homework_grade: { // 과제
            grade: Number,
            count: Number
        },
        test_grade: { // 시험
            grade: Number,
            count: Number
        },
        skill_grade:{ // 강의력
            grade: Number,
            count: Number
        },
        totalGrade: Number, // 강의 평가 각 항목의 총 평균 <- 백에서 계산에서 넣기
        enrollment_level: String, // 상,중,하
        memo1: String,
        memo2: String,
        memo3: String,
        memo4: String,
        createAt: { type: Date, default: Date.now }
    }],
    createAt: { type: Date, default: Date.now },
    updated: [{ contents: String, date: { type: Date, default: Date.now } }]
},{
    versionKey:false
});

// 강의 평가 도큐먼트 생성
classSchema.statics.create = function (userId, major, name, professor, code, semester, eval) {

    const classeval = new this({
        userId,
        major,
        name,
        professor,
        code,
        semester
    });

    classeval.evaluation.push(eval);
    
    // return the Promise
    return classeval.save(err => {
      console.log(err);
      if (err) return handledError(err);
    });
};

// 유저가 쓴 강의평가 찾기
classSchema.statics.find = function(userId, semester, name) {
    console.log("SYSTEM: 중복검사")
    return this.find({
        userId: userId, 
        semester: semester, 
        name: name
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
