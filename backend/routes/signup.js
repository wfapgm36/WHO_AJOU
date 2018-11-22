var express = require("express");
var router = express.Router();
var User = require("../models/user");
var mongoose = require("mongoose");
var nev = require('email-verification')(mongoose);

router.use(function (req, res, next) {
    next();
});

router.post('/', function (req, res, next) {
    let newUser = new User({
        username: req.body.username,
        nickname: req.body.nickname,
        password: req.body.password,
        email: req.body.email,
        major: req.body.major,
        isAdmin: 0
    });
    User.findOne({username: req.body.username})
        .then(data => {
            if (data) {
                res.status(202).send() // id duplication check
            }
            User.findOne({email: req.body.email})
                .then(data => {
                    if (data) {
                        res.status(204).send(); // email duplication
                    }
                    nev.createTempUser(newUser, function (err, existingPersistentUser, newTempUser) {
                        if (err) {
                            console.error(err);
                            res.send(err);
                        }
                        if (existingPersistentUser) {
                            res.status(202).send() // id duplication check
                        } else {
                            if (newTempUser) {
                                var URL = newTempUser[nev.options.URLFieldName];
                                nev.sendVerificationEmail(req.body.email, URL, function (err, info) {
                                    if (err) {
                                        console.error(err);
                                        res.send(err);
                                    }
                                    res.status(200).send(); // email duplication
                                })
                            } else {
                                res.status(204).send(); // email duplication
                            }
                        }
                    });
                })
        });
});

module.exports = router;
