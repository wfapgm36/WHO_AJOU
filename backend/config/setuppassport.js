var setuppassport = require("passport");
var User = require('../models/user');

module.exports = function() {
    setuppassport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    setuppassport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    //프로그램 작성
};