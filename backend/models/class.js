var mongoose = require("mongoose");

var classSchema = mongoose.Schema({
    name: { type: String, required: true },
    professor: { type: String, required: true},
    description: String,
    prerequisite: String,
    semester: { type: String, required: true},
    classId: String,
    type: Number, // 1: 전공필수 2: 전공선택 3: 교양필수 4: 교양선택
    totalGrade: { type: Number, default: 0 },  // 해당 과목에 해당하는 모든 강의 평가의 평균
    evaluation: [{
        writer: String, // username
        grade1: [{
            grade: Number,
            memo: String
        }],
        grade2: [{
            grade: Number,
            memo: String
        }],
        grade3: [{
            grade: Number,
            memo: String
        }],
        totalGrade: Number, // 강의 평가 각 항목의 총 평균
        createAt: { type: Date, default: Date.now }
    }],
    createAt: { type: Date, default: Date.now },
    updated: [{ contents: String, date: { type: Date, default: Date.now } }],
    deleted: { type: Boolean, default: false }
},{
    versionKey:false
});
var Classes = mongoose.model('Classes', classSchema, 'Classlist');

module.exports =  Classes;
