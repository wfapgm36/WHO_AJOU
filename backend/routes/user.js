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
router.get("/",auth.ensureAuth(), function (req, res, next) {
    console.log(req.user);
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

module.exports = router;