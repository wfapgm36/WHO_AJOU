var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

//해시 알고리즘 적용 횟수
var SALT_FACTOR = 5;

var userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    createAt: {type: Date, default: Date.now},
    nickname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    major: {type: String, required: true},
    isAdmin: {type: Number, required: true}
}, {
    versionKey: false
});

userSchema.methods.name = function () {
    return this.displayName || this.username;
};

//bcrypt를 위한 빈 함수
var noop = function () {
};

// 모델이 저장되기("save") 전(.pre)에 실행되는 함수
userSchema.pre("save", function (done) {
    var user = this;
    if (!user.isModified("password")) {
        return done();
    }
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) {
            return done(err);
        }
        bcrypt.hash(user.password, salt, noop, function (err, hashedPassword) {
            if (err) {
                return done(err);
            }
            user.password = hashedPassword;
            done();
        });
    });
});

//비밀번호 검사하는 함수
userSchema.methods.checkPassword = function (guess, done) {
    bcrypt.compare(guess, this.password, function (err, isMatch) {
        done(err, isMatch);
    });
};

userSchema.statics.checkUser = function (username) {
    let check = false;
    this.findOne({username: username}, function (err, user) {
        if (err) {
            next(err);
            return check;
        }
        if (user) {
            check = true;
            return check;
        }
    });
}

// 실제로 사용자 모델 만들고 내보내기
var User = mongoose.model("User", userSchema, "userlist");
module.exports = User;
