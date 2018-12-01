var express = require("express");
var router = express.Router();
var User = require("../models/user");
const auth = require("../config/auth");

router.use(function (req, res, next) {
    next();
});

router.post("/", function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    User.findOne({username: username}, function (err, user) {
        if (err) {
            res.send(err);
        }
        if (!user) {
            res.status(204).send(); // 해당 id 없음
        } else {
            user.checkPassword(password, function (err, isMatch) {
                if (err) {
                    res.send(err);
                }
                if (isMatch) {
                    const accessToken = auth.signToken(username, user.nickname, user.isAdmin);
                    console.log(accessToken);
                    res.status(200);
                    res.json({accessToken});
                } else {
                    res.status(203).send(); // 비밀번호 틀림
                }
            });
        }
    });
});

module.exports = router;
