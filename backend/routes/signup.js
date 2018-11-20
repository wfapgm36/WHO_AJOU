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
}, function (err, req, res, next) {
    if (err.code == 11000) res.status(202).send() // id duplication check
    else if (err.toString() == "email_duplication") res.status(204).send(); // email duplication
    else if (err.toString() == "success") res.status(200).send(); // success
    else res.status(401).send();
});

module.exports = router;
