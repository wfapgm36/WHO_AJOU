var express = require("express");
var router = express.Router();

router.use(function (req, res, next) {
    console.log(req.user)
    res.locals.currentUser = req.user;
    next();
});

router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

module.exports = router;