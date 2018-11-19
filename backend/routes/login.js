var express = require("express");
var passport = require("passport");
var router = express.Router();
var mongoose = require("mongoose");
var nev = require('email-verification')(mongoose);

router.use(function (req, res, next) {
    console.log(req.user)
    res.locals.currentUser = req.user;
    next();
});

router.post("/", passport.authenticate("login", {
    failWithError: true
}), function (req, res, next) {
    console.log("성공");
    res.status(200).send();
}, function (err, req, res, next) {
    console.log(err);
    console.log("실패"); // res.status(401) 전송됨
});

module.exports = router;