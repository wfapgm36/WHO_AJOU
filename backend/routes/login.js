var express = require("express");
var passport = require("passport");

var router = express.Router();
var mongoose = require("mongoose");
var nev = require('email-verification')(mongoose);

//템플릿용 변수 설정
router.use(function (req, res, next) {
    console.log(req.user)
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");
    next();
});

router.get("/", function (req, res) {
    //res.render("login");
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

router.get("/signup", function (req, res) {
    //res.render("signup");
    //res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

router.post('/signup', passport.authenticate('signup', {
    successRedirect : '/',
    failureRedirect : '/signup', //가입 실패시 redirect할 url주소
    failureFlash : true
}))

router.post("/login", passport.authenticate("login", {
    successRedirect: "/main",
    failureRedirect: "/",
    failureFlash: true
}));

router.get('/email-verification/:URL', function(req, res){
    var url = req.params.URL;
    nev.confirmTempUser(url, function(err, user){
        console.log("confirmed user " + user);
        if(err) console.log(err);
        if (user) {
            nev.sendConfirmationEmail(user.email, function(err, info) {
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
