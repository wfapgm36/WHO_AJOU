var mongoose = require("mongoose");

var majorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }, // 학과이름
    code: {
        type: String,
        required: true
    }, // 과목코드
    professor: [{
        name: String
    }] // 교수이름 배열
}, {
    versionKey: false
});

var Majors = mongoose.model('Majors', majorSchema, 'Majorlist');

module.exports = Majors;