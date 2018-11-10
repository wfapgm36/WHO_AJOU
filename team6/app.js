var express = require("express");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var flash = require("connect-flash");
var passport = require("passport");

var route = require("./routes");
var setUpPassport = require("./setuppassport");

var app = express();

mongoose.connect("mongodb:\/\/localhost:27017/test", { useNewUrlParser: true });
setUpPassport();
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
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

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use('/', route);
app.listen(app.get("port"), function () {
    console.log("Server started on port" + app.get("port"));
});
