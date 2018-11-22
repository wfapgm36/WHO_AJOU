var createError = require('http-errors');
var express = require('express');
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const index = require("./routes/index");
const signup = require("./routes/signup");
const login = require("./routes/login");
const user = require("./routes/user");
const main = require("./routes/main");
const board = require("./routes/board");
const email_verification = require("./routes/email-verification");

var nev = require('email-verification')(mongoose);
require('./config/email-verification')(nev);

var app = express();
app.use(require('connect-history-api-fallback')())

app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/signup', signup);
app.use('/api/email-verification', email_verification);
app.use('/api/login', login);
app.use('/api/user', user);
app.use('/api/main', main);
app.use('/api/board', board);

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
  //res.render('error');
});

module.exports = app;
