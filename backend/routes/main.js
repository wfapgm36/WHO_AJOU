var express = require("express");
var router = express.Router();
var curriculum = require('../curriculum.json');

router.use(function (req, res, next) {
    next();
});


module.exports = router;