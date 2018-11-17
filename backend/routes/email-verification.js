var express = require("express");
var router = express.Router();

router.get('/:URL', function (req, res) {
    var url = req.params.URL;
    nev.confirmTempUser(url, function (err, user) {
        console.log("confirmed user " + user);
        if (err) console.log(err);
        if (user) {
            nev.sendConfirmationEmail(user.email, function (err, info) {
                if (err) {
                    return res.status(404).send('ERROR: sending confirmation email FAILED');
                }
                res.send({
                    msg: 'CONFIRMED!',
                    info: info
                });
            });
        } else {
            return res.status(404).send('ERROR: confirming temp user FAILED');
        }
    });
});

module.exports = router;