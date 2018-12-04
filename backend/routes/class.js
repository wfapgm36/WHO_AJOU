const express = require('express');
const router = express.Router();
const lecture = require('../models/class');
const auth = require('../config/auth');

router.use(function (req,res,next) {
   next();
});

/*
//이 스키마 말고 다른 커리큘럼 스키마 필요(나중에 삭제)
// 관리자 권한 체크
router.post('/create',function (req,res,next) {

    let newLecture = new lecture({
        major: req.body.major,
        name: req.body.name,
        professor: req.body.professor,
        prerequisite: req.body.prerequisite,
        description: req.body.description,
        semester: req.body.semester,
        classId: req.body.classId,
        type: req.body.type, // 1: 전공필수 2: 전공선택 3: 교양필수 4: 교양선택
    });
    newLecture.save();
    res.status(200).send();
});

//무슨 역할인지 모르겠음
router.get('/allclass',auth.ensureAuth(),function (req,res,next) {
    lecture.find({})
        .then(lec =>{
            let lec_names = [];
            let lectures = [];
            for(let i=0;i<lec.length;i++){
                if(!lec_names.includes(lec[i].name)){
                    lec_names.push(lec[i].name);
                    lectures.push(lec[i]);
                }
            }
            res.json(lectures)
        })
});
*/
/*
//강의평가작성
//수정필요(다른 거 쓰겠음.)
router.post('/evaluation',auth.ensureAuth(),function (req,res,next) {
    lecture.find({name:req.body.name, professor:req.body.professor})
        .then(lec =>{
            if(lec){
                let eval = {
                    writer: req.user.nickname, // username
                    teamProject_grade: { // 팀플
                        grade: req.body.teamProject_grade.grade,
                        count: req.body.teamProject_grade.count
                    },
                    homework_grade: { // 과제
                        grade: req.body.homework_grade.grade,
                        count: req.body.homework_grade.count
                    },
                    test_grade: { // 시험
                        grade: req.body.test_grade.grade,
                        count: req.body.test_grade.count
                    },
                    skill_grade: { // 강의력
                        grade: req.body.skill_grade.grade,
                        count: req.body.skill_grade.count
                    },
                    totalGrade: (req.body.teamProject_grade.grade+req.body.homework_grade.grade+req.body.test_grade.grade+req.body.skill_grade.grade)/4, // 강의 평가 각 항목의 총 평균 <- 백에서 계산에서 넣기
                    enrollment_level: req.body.enrollment_level, // 상,중,하
                    memo1: req.body.memo1,
                    memo2: req.body.memo2,
                    memo3: req.body.memo3,
                    memo4: req.body.memo4,
                }
                lec.evaluation.push(eval);
                lec.save()
                    .then(()=>{
                        res.status(200).send()
                    }
                )
            }
        })
});
*/

/*
    api: /api/class/evaluation/create
*/
//강의 평가 작성 페이지
//모든 평가 데이터 받아서 document형태로 create(totalGrade??이해못함..)
router.post('/evaluation/create', auth.ensureAuth(), function (req, res, next) {
    console.log('SYSTEM: req')
    console.log(req.body)

    const {
        userId,
        major,
        name,
        professor
    } = req.body

    // create a new user if does not exist
    const create = (user) => {
        if (user) {
            throw new Error('id exists')
        } else {
            return lecture.create(
                id,
                name,
                password,
                email
            )
        }
    }

    // respond to the client
    const respond = () => {
        console.log('SYSTEM: Registered successfully')
        res.json({
            message: 'registered successfully',
            //admin: isAdmin ? true : false
        })
    }

    // run when there is an error (username exists)
    const onError = (error) => {
        console.log('SYSTEM: ' + error)
        res.status(409).json({
            message: error.message
        })
    }

    // check username duplication
    User.findOneByUsername(id)
        .then(create)
        .then(respond)
        .catch(onError)
});


/*
    api: /api/class / evaluation / delete
*/
//강의 평가 삭제
//모든 평가 데이터 받아서 document형태로 create(totalGrade??이해못함..)
router.post('/evaluation/delete', auth.ensureAuth(), function (req, res, next) {
    console.log('SYSTEM: req')
    console.log(req.body)

    const {
        userId,
        major,
        name,
        professor
    } = req.body

    // create a new user if does not exist
    const create = (user) => {
        if (user) {
            throw new Error('id exists')
        } else {
            return lecture.create(
                id,
                name,
                password,
                email
            )
        }
    }

    // respond to the client
    const respond = () => {
        console.log('SYSTEM: Registered successfully')
        res.json({
            message: 'registered successfully',
            //admin: isAdmin ? true : false
        })
    }

    // run when there is an error (username exists)
    const onError = (error) => {
        console.log('SYSTEM: ' + error)
        res.status(409).json({
            message: error.message
        })
    }

    // check username duplication
    User.findOneByUsername(id)
        .then(create)
        .then(respond)
        .catch(onError)
});



/*
    api: /api/class/evaluation/
*/
//강의평가 상세보기 페이지 & 강의평가카드 보기
//해당 과목 이름 받고 모든 강의평가내용 프론트로 보내주기 
router.get('/evaluation',auth.ensureAuth(),function (req,res,next) {
    lecture.find()
        .then(lec => {
            if(lec) res.json(lec);
            else res.status(203).send() // 해당과목이 존재하지 않음
        })
});

module.exports = router;