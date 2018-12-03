var express = require("express");
var router = express.Router();
var curriculum = require('../curriculum.json');

router.use(function (req, res, next) {
    next();
});

//나중에 지울것! 필요없음.
router.get('/', function (req, res, next) {
    res.send(curriculum)
});

module.exports = router;