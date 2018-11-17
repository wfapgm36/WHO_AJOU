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

router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

router.post('/signup', passport.authenticate('signup', {
    failWithError: true
}), function (req, res, next) {
    res.status(200).send();
}, function (req, res, next) {
    res.status(404).send();
});

router.post("/login", passport.authenticate("login", {
    failWithError: true
}), function (req, res, next) {
    console.log("성공");
    res.status(200).send();
}, function (err, req, res, next) {
    console.log(err);
    console.log("실패"); // res.status(401) 전송됨
});

router.get('/email-verification/:URL', function (req, res) {
    var url = req.params.URL;
    nev.confirmTempUser(url, function (err, user) {
        console.log("confirmed user " + user);
        if (err) console.log(err);
        if (user) {
            nev.sendConfirmationEmail(user.email, function (err, info) {
                if (err) {
                    return res.status(404).send('ERROR: sending confirmation email FAILED');
                }
                res.send({
                    msg: 'CONFIRMED!',
                    info: info
                });
            });
        } else {
            return res.status(404).send('ERROR: confirming temp user FAILED');
        }
    });
});

module.exports = router;
