var mongoose = require("mongoose");

var majorSchema = mongoose.Schema({
    major: {
        type: String,
        required: true
    }, // 학과이름
    professor: [{
        name: String
    }] // 교수이름 배열
}, {
    versionKey: false
});

var Majors = mongoose.model('Majors', majorSchema, 'Majorlist');

module.exports = Majors;