var passport = require("passport");

var User = require("../models/user");
var LocalStrategy = require("passport-local").Strategy;

passport.use("login", new LocalStrategy(function (username, password, done) {
    User.findOne({username: username}, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {message: "No user has that username!"});
        }
        user.checkPassword(password, function (err, isMatch) {
            if (err) {
                return done(err);
            }
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, {message: "Invalid password."});
            }
        });
    });
}));

module.exports = function(passport,nev) {
    passport.use('signup', new LocalStrategy({
            username: 'username',
            password: 'password',
            passReqToCallback: true
        },
        function (req, username, password, done) {
            let newUser = new User({
                username: username,
                nickname: req.body.nickname,
                password: password,
                email: req.body.email,
                major: req.body.major,
                isAdmin: 0
            });
            nev.createTempUser(newUser, function (err, existingPersistentUser, newTempUser) {
                if (err) console.error(err);
                if (existingPersistentUser) {
                    console.log('You have already signed up and confirmed your account. Did you forget your password?');
                    req.flash("error", "이미 있는 아이디 입니다.");
                    return done(null);
                }
                if (newTempUser) {
                    var URL = newTempUser[nev.options.URLFieldName];
                    nev.sendVerificationEmail(req.body.email, URL, function (err, info) {
                        if (err) console.error(err);
                        console.log('An email has been sent to you. Please check it to verify your account.');
                        return done(null);
                    })
                } else {
                    console.log('You have already signed up. Please check your email to verify your account.');
                    return done(null);
                }
            });
        })
    );
};