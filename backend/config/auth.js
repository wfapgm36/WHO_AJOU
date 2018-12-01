const jwt = require('jsonwebtoken');
const key = "token secret";
const expiresIn = 60 * 60; // 60 minutes

const auth = {
    signToken(username,nickname,isAdmin) {
        return jwt.sign({username:username,nickname:nickname,isAdmin:isAdmin}, key, {expiresIn})
    },
    ensureAuth() {
        return (req, res, next) => {
            const {authorization} = req.headers;
            if (!authorization) {
                res.status(401);
                throw Error('No Authorization headers')
            }
            try {
                req.user = this.verify(authorization);
            } catch (e) {
                res.status(401);
                throw e
            }

            next()
        }
    },
    verify(token) {
        return jwt.verify(token.replace(/^Bearer\s/, ''), key)
    }
};

module.exports = auth;