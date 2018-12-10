var mongoose = require("mongoose");
var autoIncrement = require('mongoose-auto-increment')

autoIncrement.initialize(mongoose.connection)

var curriculumSchema = mongoose.Schema({
    id: {
        type: Number,
        unique: true
    }, //도큐먼트ID
    major: {
        type: String,
        required: true
    }, // 학과
    lecture: {
        type: String,
        required: true
    }, // 강의명
    description: {
        type: String,
        required: true
    }, // 강의정의
    semester: {
        type: String,
        required: true
    }, // 강의 추천 학기
    prerequisite: [{
        name: String
    }], // 선수과목
    type: {
        type: String,
        required: true
    }, // 전공, 교양 인지
    isPre: {
        type: Boolean,
    },
}, {
    versionKey: false
});

// 강의 평가 도큐먼트 생성
curriculumSchema.statics.create = function (major, type, lecture, prerequisite, semester, description) {

    var lenght =0 ; 


    console.log("pre lenth: "+prerequisite.length)
    const curriculum = new this({
        major,
        type,
        lecture,
        semester,
        description,
        isPre: false
    });
    console.log(major, type, lecture, prerequisite, semester)

    for (var i = 0; i < 1; i++) {
        curriculum.prerequisite.push({name: prerequisite[i]});
    }

    // return the Promise
    return curriculum.save(err => {
        console.log('하이' + err);
        if (err) return handledError(err);
    });
};

// 중복되는 커리큘럼 찾기.
curriculumSchema.statics.findDuplicate = function (major, lecture) {
    console.log("SYSTEM: 중복검사")
    return this.findOne({
        major: major,
        lecture: lecture
    }).exec();
};

// 강의평가id를 Auto Increment 필드로 지정
curriculumSchema.plugin(autoIncrement.plugin, {
    model: 'Curriculum',
    field: 'id',
    startAt: 1
})


var Curriculum = mongoose.model("Curriculum", curriculumSchema, "Curriculumlist");
module.exports = Curriculum;