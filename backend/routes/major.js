var express = require("express");
var router = express.Router();
var major = require('../models/major');

//학과는 디비에 미리 데이터를 넣어놓아야함.
//나중에 추가할 일 없으므로 학과 데이터를 프론트에 보내주기만 하면됨.

router.use(function (req, res, next) {
    next();
});
/*
    api: /api/major/all
*/
//전체 학과 데이터 보내줌.
router.get('/all', function (req, res, next) {
    major.find({}, (err, data) => {
        if (err) res.status(500).send({
            error: 'database failure'
        });
        // 학과가 없으면 error
        if (!data) return res.status(404).json({
            error: 'data not found'
        });
        console.log('All Major Documents: ' + data);
        res.json(data);
    })
});


/*
    api: /api/major
*/

//학과이름 받고 학과 데이터 보내줌.
router.post('/', function (req, res, next) {
    var name = req.body.name //학과이름

    major.findOne({name: name}, (err, data) => {
        if(err) res.status(500).send({
            error: 'database failure'
        });
        // 학과가 없으면 error
        if (!data) return res.status(404).json({
            error: 'data not found'
        });
        console.log('A Major Document: ' + data);
        res.json(data);
    })
});

module.exports = router;