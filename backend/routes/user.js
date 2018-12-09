var express = require("express");
var router = express.Router();
var User = require("../models/user");
const auth = require('../config/auth');

router.use(function (req, res, next) {
    next();
});

router.put("/",auth.ensureAuth(), function (req, res, next) {
    req.user.nickname = req.body.nickname;
    req.user.save(function (err) {
        if (err) {
            next(err);
            return;
        }
        res.redirect("/profile");
    });
});

router.delete("/", function(req, res){

});

//컬렉션을 쿼리하고 가장 최근 사용자를 먼저 반환(descending)
router.get("/list", function (req, res, next) {
    User.find().sort({createAt: "descending"})
        .exec(function (err, users) {
            if (err) {
                return next(err)
            }
            res.json(users)
        });
});
// token 을 받고 token decoding 후 해당하는 username에 맞는 데이터 전송
router.get("/", auth.ensureAuth(), function (req, res, next) {
    User.findOne({username: req.user.username}, function (err, user) {
        if (err) {
            res.send(err);
        }
        if (!user) {
            res.status(401).send();
        }
        res.json(user);
    });
});
// userid 와 email 을 통해 비밀번호 초기화
router.post("/password",function(req,res,next){
    User.findOne({username: req.body.username,email: req.body.email}, function(err, user){
        if(err){
            res.send(err);
        }
        if(!user){
            res.status(203).send();
        } else{
            user.password = '0000';
            user.save();
            res.status(200).send();
        }
    })
});

module.exports = router;