var createError = require('http-errors');
var express = require('express');
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require("express-session");
var passport = require("passport");

var login = require("./routes/login");
var main = require("./routes/main");
var board = require("./routes/board");

var nev = require('email-verification')(mongoose);
require('./config/email-verification')(nev);
require('./config/passport')(passport,nev);

var setupPassport = require('./config/setuppassport');

var app = express();
app.use(require('connect-history-api-fallback')())

setupPassport();
mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: "ASDKPOkdK1OKASDPOK@#!@$",
    resave: true,
    saveUninitialized: true
}));
/*
secret: 각 세션이 클라이언트에서 암호화되도록 함. 쿠키해킹방지
resave: 미들웨어 옵션, true하면 세션이 수정되지 않은 경우에도 세션 업데이트
saveUninitialized: 미들웨어 옵션, 초기화되지 않은 세션 재설정
*/

app.use(passport.initialize());
app.use(passport.session());
app.use('/', login);
app.use('/main', main);
app.use('/board', board);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
