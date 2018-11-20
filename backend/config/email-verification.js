/* config/email-verification.js */
var User = require('../models/user');

module.exports = function(nev){
    nev.configure({
        verificationURL: 'http://localhost:3000/email-verification/${URL}',
        URLLength: 48,
        // mongo-stuff
        persistentUserModel: User,
        expirationTime: 86400,
        // emailing options
        transportOptions: {
            service:"Gmail",
            auth: {
                user: 'qwaserdf@ajou.ac.kr',
                pass: 'eksldpf4106*'
            }
        },
        verifyMailOptions: {
            from: 'Do Not Reply <qwaserdf@ajou.ac.kr>',
            subject: '[WhoAjou] 계정 이메일 인증메일',
            html: '<p> 오른쪽 링크를 눌러 이메일 인증을 해주세요! <a href="${URL}">링크</a>. <br> 해당 링크가 접속이 안되는 경우 ' +
                '오른쪽 주소를 복사하여 접속하여주세요! <br> 주소:</p><p>${URL}</p>',
            text: '오른쪽 링크를 눌러 이메일 인증을 해주세요! 해당 링크가 접속이 안되는 경우 오른쪽 주소를 복사하여 접속하여주세요! 주소: ${URL}'
        },
        shouldSendConfirmation: false,
        confirmMailOptions: {
            from: 'Do Not Reply <qwaserdf@ajou.ac.kr>',
            subject: '[WhoAjou] 이메일 인증 완료',
            html: '<p>계정 인증이 완료되었습니다.</p>',
            text: '계정 인증이 완료되었습니다.'
        },
        // hashingFunction: null
    }, function(err, options){
        if(err) console.error(err);
        console.log('configured: ' + (typeof options === 'object'));
    });
    nev.generateTempUserModel(User, function(err, tempUserModel) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('generated temp user model: ' + (typeof tempUserModel === 'function'));
    });
};
