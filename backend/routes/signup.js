var express = require("express");
var passport = require("passport");
var router = express.Router();

router.use(function (req, res, next) {
    console.log(req.user)
    res.locals.currentUser = req.user;
    next();
});

router.post('/', passport.authenticate('signup', {
    failWithError: true
}), function (req, res, next) {
    res.status(200).send();
}, function (req, res, next) {
    res.status(404).send();
});

module.exports = router;