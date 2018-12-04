var mongoose = require("mongoose");

var curriculumSchema = mongoose.Schema({
    major: {
        type: String,
        required: true
    }, // 학과
    lecture: {
        type: String,
        required: true
    }, // 강의명
    code: {
        type: String,
        required: true
    }, // 과목코드
    description: {
        type: String,
        required: true
    }, // 강의정의
    semester: {
        type: String,
        required: true
    }, // 강의 해당학기
    prerequisite: [{
        name: String,
    }], // 선수과목
    type: {
        type: String,
        required: true
    }, // 전공, 교양 인지
    isPre: {
        type: Boolean,
    }, // 강의 해당학기
}, {
    versionKey: false
});

var Curriculums = mongoose.model("Curriculum", curriculumSchema, "Curriculumlist");

module.exports = Curriculums;