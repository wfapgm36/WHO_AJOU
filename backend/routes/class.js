const express = require('express');
const router = express.Router();
const lecture = require('../models/class');
const auth = require('../config/auth');

router.use(function (req,res,next) {
   next();
});

router.post('/create',auth.ensureAuth(),function (req,res) {
    let newLecture = new lecture({
        name: req.body.name,
        professor: req.body.professor,
        priorCourse: req.body.priorCourse,
        description: req.body.description,
        semester: req.body.semester,
        classId: req.body.classId,
        type: Number, // 1: 전공필수 2: 전공선택 3: 교양필수 4: 교양선택
    });
});

router.get('/allclass',auth.ensureAuth(),function (req,res) {

});