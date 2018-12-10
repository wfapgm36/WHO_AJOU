const express = require('express');
const router = express.Router();
const Class = require('../models/class');
const auth = require('../config/auth');

router.use(function (req, res, next) {
    next();
});

/*
    api: /api/class/evaluation
*/
//강의 평가 작성
//모든 평가 데이터 받아서 document형태로 create
router.post('/evaluation', auth.ensureAuth(), function (req, res, next) {
    console.log('SYSTEM: 강의평가생성')

    const userId = req.body.userId
    const major = req.body.major //강의 해당학과
    const lecture = req.body.lecture //강의명
    const professor = req.body.professor //강의 교수님
    // const code = req.body.code//강의 과목코드
    const semester = req.body.semester //강의 수강학기

    let evaluation = {
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

    // create a new user if does not exist
    const create = (classEval) => {
        if (classEval) {
            throw new Error('classEval exists')
        } else {
            return Class.create(
                userId,
                major,
                lecture,
                professor,
                semester,
                evaluation
            )
        }
    }


    // respond to the client
    const respond = () => {
        console.log('SYSTEM: created successfully')
        res.json({
            message: 'created successfully',
        })
    }

    // run when there is an error (username exists)
    const onError = (error) => {
        console.log('SYSTEM: ' + error)
        res.status(203).json({ // username exists
            message: error.message
        })
    }

    // 강의평가 도큐먼트 생성 로직
    //name => lecture로 바꿈 오타수정
    Class.findDuplicate(userId, semester, lecture)
        .then(create)
        .then(respond)
        .catch(onError)
});

/*
    api: /api/class/evaluation
    강의평가 수정
*/
router.put('/evaluation', auth.ensureAuth(), function (req, res, next) {
    console.log('SYSTEM: 강의평가 업데이트')
    const evalId = req.body.evalId
    const userId = req.body.userId
    const major = req.body.major //강의 해당학과
    const lecture = req.body.lecture //강의명
    const professor = req.body.professor //강의 교수님
    const semester = req.body.semester //강의 수강학기

    let eval = {
        writer: req.user.nickname, // username

        homework_grade: req.body.homework_grade,
        teamProject_grade: req.body.teamProject_grade,
        skill_grade: req.body.skill_grade,
        test_grade: req.body.test_grade,
        // 강의 평가 각 항목의 총 평균 <- 백에서 계산에서 넣기
        totalGrade: (req.body.teamProject_grade + req.body.homework_grade + req.body.test_grade + req.body.skill_grade) / 4,

        enrollment_level: req.body.enrollment_level, // 상,중,하
        memo1: req.body.memo1,
        memo2: req.body.memo2,
        memo3: req.body.memo3,
        memo4: req.body.memo4,
    }

    Class.findOneAndUpdate({
            id: evalId
        }, {
            userId: userId,
            major: major,
            lecture: lecture,
            professor: professor,
            semester: semester,
            evaluation: eval
        },
        function (err, data) {
            if (err) return res.status(500).send(err);
            var response = {
                message: "document successfully updated",
                id: data.id
            };
            return res.status(200).send(response);
        })
});


/*
    api: /api/class/evaluation
*/
//강의 평가 삭제
//강의 평가 도큐먼트 id 받아서 삭제
router.delete('/evaluation', auth.ensureAuth(), function (req, res, next) {
    console.log('SYSTEM: 강의평가삭제')
    var id = req.body.id;
    Class.findOneAndDelete({
        id: id
    }, function (err, data) {
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

router.get('/evaluation', auth.ensureAuth(), function (req, res, next) {
    Class.find()
        .then(lec => {
            if (lec) res.json(lec);
            else res.status(203).send() // 해당과목이 존재하지 않음
        })
});


/*
    api: /api/class/evaluation/:id
*/
//ReadMore 버튼 눌렀을 때, 강의평가 디테일 보기
router.get('/evaluation/:id', auth.ensureAuth(), function (req, res, next) {
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
/*
    api: /api/class/evaluation/update/:id
    강의평가 수정시
*/
router.get('/evaluation/update/:id', function (req, res, next) {
    Class.findOne({id: req.params.id}, (err, data) => {
        if (err) res.status(500).send({
            error: 'database failure'
        });
        // 해당 커리큘럼이 없으면 error
        if (!data) return res.status(404).json({
            error: 'data not found'
        });
        res.json(data);
    })
});

module.exports = router;
