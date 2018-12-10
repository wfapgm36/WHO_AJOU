var express = require("express");
var router = express.Router();
const auth = require('../config/auth');
var Curriculum = require('../models/curriculum');

router.use(function (req, res, next) {
    next();
});

/*
    api: /api/curriculum/create
    커리큘럼에 과목 추가
*/
router.post('/create',  function (req, res, next) {
    console.log('SYSTEM: 커리큘럼 생성')
    console.log(req.body)
    const {
        major,
        type,
        lecture,
        prerequisite,
        semester,
        description
    } = req.body

    const create = (curriculum) => {
        if (curriculum) {
            throw new Error('curriculum exists')
        } else {
            console.log('생성 넘긴다')
            return Curriculum.create(major, type, lecture, prerequisite, semester, description)
        }
    }
    const respond = () => {
        console.log('SYSTEM: created successfully')
        res.json({
            message: 'created successfully',
        })
    }
    const onError = (error) => {
        console.log('라우트에러')
        console.log('SYSTEM: ' + error)
        res.status(409).json({
            message: error.message
        })
    }

    // 커리큘럼 도큐먼트 생성 로직
    Curriculum.findDuplicate(major, lecture)
        .then(create)
        .then(respond)
        .catch(onError)

});

/*
    api: /api/curriculum/update
    커리큘럼 수정
*/
router.put('/update', auth.ensureAuth(), function (req, res, next) {
    console.log('SYSTEM: 커리큘럼 업데이트')
    console.log(req.body)
    const {
        id,
        major,
        type,
        lecture,
        prequisite,
        semester,
        description
    } = req.body
    console.log('id ' + id)

    Curriculum.findOneAndUpdate({
        id: id
    },
    {
        major: major,
        type: type,
        lecture: lecture,
        prequisite: prequisite,
        semester: semester,
        description: description
    },
    function (err, data) {
        if (err) return res.status(500).send(err);
        var response = {
            message: "document successfully updated",
            id: data.id
        };
        console.log(data)
        return res.status(200).send(response);
    })
});

/*
    api: /api/curriculum/delete
    커리큘럼 도큐먼트 id 받아서 삭제
*/
router.delete('/delete', auth.ensureAuth(), function (req, res, next) {
    console.log('SYSTEM: 커리큘럼 삭제')
    console.log(req.body)
    var id = req.body.id;
    Curriculum.findOneAndDelete({id: id}, function (err, data) {
        if (err) return res.status(500).send(err);
        var response = {
            message: "document successfully deleted",
            id: data.id
        };
        console.log(data)
        return res.status(200).send(response);
    })
});

/*
    api: /api/curriculum/:id
    학과이름 받고 해당 학과의 한과목 정보 보내줌.(수정시 필요)
*/
router.get('/:id', function (req, res, next) {

    Curriculum.findOne({id: req.params.id}, (err, data) => {
            if (err) res.status(500).send({
                error: 'database failure'
            });
            // 해당 커리큘럼이 없으면 error
            if (!data) return res.status(404).json({
                error: 'data not found'
            });
            console.log('A lecture datum of Curriculum:' + data);
            res.json(data);
        })
});


/*
    api: /api/curriculum
    학과이름 받고 해당 학과 커리큘럼에 들어있는 모든 과목 모두 보내줌.
*/
router.post('/', function (req, res, next) {
    var major = req.body.major //학과 이름

    Curriculum.find({
            major: major
        },
        (err, data) => {
            if (err) res.status(500).send({
                error: 'database failure'
            });
            // 해당학과가 커리큘럼에 없으면 error
            if (!data) return res.status(404).json({
                error: 'data not found'
            });
            console.log('All lecture data of Curriculum:' + data);
            res.json(data);
        })
});


module.exports = router;
