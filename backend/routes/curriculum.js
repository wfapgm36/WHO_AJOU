var express = require("express");
var router = express.Router();
var curriculum = require('../models/curriculum');

router.use(function (req, res, next) {
    next();
});

/*
    api: /api/curriculum
*/

//학과이름 받고 해당 학과 커리큘럼에 들어있는 모든 과목 모두 보내줌.
router.post('/', function (req, res, next) {
    var name = req.body.major //학과 이름

    curriculum.find({
        major:name
    }, 
    (err, data) => {
        if (err) res.status(500).send({
            error: 'database failure'
        });
        // 해당학과가 커리큘럼에 없으면 error
        if (!data) return res.status(404).json({
            error: 'data not found'
        });
        console.log('Curriculum:'  + data);
        res.json(data);
    })
});


module.exports = router;