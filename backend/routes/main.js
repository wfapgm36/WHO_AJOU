var express = require("express");
var router = express.Router();
var curriculum = require('../curriculum.json');

router.use(function (req, res, next) {
    next();
});

router.get('/', function (req, res, next) {
    res.send(curriculum)
});

module.exports = router;