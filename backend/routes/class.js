const express = require('express');
const router = express.Router();
const Class = require('../models/class');
const auth = require('../config/auth');

router.use(function (req,res,next) {
   next();
});

/*
    api: /api/class/evaluation/create
*/
//강의 평가 작성
//모든 평가 데이터 받아서 document형태로 create
router.post('/evaluation/create',function (req, res, next) {
    console.log('SYSTEM: 강의평가생성')
    console.log(req.body)
    
    const userId = req.body.userId
    const major = req.body.major//강의 해당학과
    const lecture = req.body.lecture//강의명
    const professor = req.body.professor//강의 교수님
    const semester = req.body.semester//강의 수강학기

    let eval = {
        writer: req.user.nickname, // username
        
        teamProject_grade: req.body.teamProject_grade,
        homework_grade: req.body.homework_grade,
        test_grade: req.body.test_grade,
        skill_grade: req.body.skill_grade,
         // 강의 평가 각 항목의 총 평균 <- 백에서 계산에서 넣기
        totalGrade: (req.body.teamProject_grade + req.body.homework_grade + req.body.test_grade + req.body.skill_grade) / 4,
        
        enrollment_level: req.body.enrollment_level, // 상,중,하
        memo1: req.body.memo1,
        memo2: req.body.memo2,
        memo3: req.body.memo3,
        memo4: req.body.memo4,
    }
    
    const create = (classEval) => {
        if (classEval) {
            throw new Error('classEval exists')
        } else {
            console.log('생성 넘긴다')
            return Class.create(
                userId,
                major,
                lecture,
                professor,
                code,
                semester,
                eval
            )
        }
    }
    const respond = () => {
        console.log('SYSTEM: created successfully')
        res.json({
            message: 'created successfully',
        })
    }
    const onError = (error) => {
        console.log('SYSTEM: ' + error)
        res.status(409).json({
            message: error.message
        })
    }

    // 강의평가 도큐먼트 생성 로직
    Class.findDuplicate(userId, semester, lecture)
        .then(create)
        .then(respond)
        .catch(onError)

});

/*
    api: /api/class/evaluation/delete
*/
//강의 평가 삭제
//강의 평가 도큐먼트 id 받아서 삭제
router.post('/evaluation/delete', auth.ensureAuth(), function (req, res, next) {
    console.log('SYSTEM: 강의평가삭제')
    console.log(req.body)
    var id = req.body.id;
    Class.findOneAndDelete({id: id}, function (err, data) {
        if (err) return res.status(500).send(err);
        var response = {
            message: "document successfully deleted",
            id: data.id
        };
        return res.status(200).send(response);
    })
});


/*
    api: /api/class/evaluation/
*/
//강의평가카드 보기
//모든 강의평가내용 프론트로 보내주기 
 
router.get('/evaluation',auth.ensureAuth(),function (req,res,next) {
    console.log('SYSTEM: 강의평가 카드보기')
    Class.find()
        .then(lec => {
            if(lec) res.json(lec);
            else res.status(203).send() // 해당과목이 존재하지 않음
        })
});

/*
    api: /api/class/evaluation/:id
*/
//ReadMore 버튼 눌렀을 때, 강의평가 디테일 보기
router.get('/evaluation/:id', auth.ensureAuth(),function(req,res,next){
    console.log('SYSTEM: 강의평가디테일(read more)')
    Class.findId(req.params.id)
    .then(eval => {
        if (eval) {
                res.status(200)
                res.json(eval) //디테일 평가 보내줌
        } else {
            res.status(405).send(); // data 없음
        }
    })
})

module.exports = router;