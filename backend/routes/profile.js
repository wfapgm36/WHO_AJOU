var express = require("express");
var router = express.Router();
var User = require("../models/user");
const auth = require("../config/auth");

router.use(function (req, res, next) {
    next();
});

router.get("/user",auth.ensureAuth(),function (req, res, next) {
    User.findOne({username: req.user.username}, function (err, user) {
        if (err) {
            res.send(err);
        }
        if (!user) {
            res.status(204).send(); // 해당 id 없음
        } else {
            res.json(user);
        }
    });
});

router.put("/user",auth.ensureAuth(),function (req, res, next) {
    console.log("들어옴");
    console.log(req.body);
    User.findOne({username: req.user.username}, function (err, user) {
        if (err) {
            res.send(err);
        }
        if (!user) {
            res.status(204).send(); // 해당 id 없음
        } else {
            if(req.body.isChangePwd){
                user.checkPassword(req.body.current_password, function (err, isMatch) {
                    if(err){
                        res.send(err);
                    }
                    if(isMatch){
                        if(user.nickname == req.body.nickname){
                            user.password = req.body.password;
                            user.major = req.body.major;
                            user.save();
                            res.status(200).send();
                        } else { // nickname 변경시
                            User.find({nickname:req.body.nickname})
                                .then(temp =>{
                                    if(temp.length > 0) res.status(205).send(); // nickname 중복검사 걸림
                                    else {
                                        user.nickname = req.body.nickname;
                                        user.password = req.body.password;
                                        user.major = req.body.major;
                                        user.save();
                                        res.status(200).send();
                                    }
                                })
                        }
                    } else {
                        res.status(203).send(); // 현재 비밀번호 틀림
                    }
                })
            } else {
                if(user.nickname == req.body.nickname){
                    user.major = req.body.major;
                    user.save();
                    res.status(200).send();
                } else { // nickname 변경시
                    User.find({nickname:req.body.nickname})
                        .then(temp =>{
                            if(temp.length > 0) res.status(205).send(); // nickname 중복검사 걸림
                            else {
                                user.nickname = req.body.nickname;
                                user.major = req.body.major;
                                user.save();
                                res.status(200).send();
                            }
                        })
                }
            }
        }
    });
});


module.exports = router;
