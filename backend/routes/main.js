var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

//템플릿용 변수 설정
router.use(function (req, res, next) {
    console.log(req.user)
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");
    next();
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash("info", "먼저 로그인해야 합니다.");
        res.redirect("/");
    }
}

router.get("/", ensureAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
});

router.get("/profile", ensureAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
});

router.post("/profile", ensureAuthenticated, function (req, res, next) {
    req.user.displayName = req.body.displayname;
    req.user.save(function (err) {
        if (err) {
            next(err);
            return;
        }
        req.flash("info", "Profile updated!");
        res.redirect("/edit");
    });
});

//컬렉션을 쿼리하고 가장 최근 사용자를 먼저 반환(descending)
router.get("/user_list", function (req, res, next) {
    User.find().sort({createAt: "descending"})
        .exec(function (err, users) {
            if (err) {
                return next(err)
            }
            res.render("index", {users: users});
        });
});

router.get("/main/user_list/:username", function (req, res, next) {
    User.findOne({username: req.params.username}, function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return next(404);
        }
        res.render("profile", {user:user});
    });
});

module.exports = router;
