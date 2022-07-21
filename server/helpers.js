const jwt = require('jsonwebtoken');
const JWT_SECRET = require('./config');

function generateJWT(user) {
    return jwt.sign({
        id: user.id,
        username: user.username,
        email: user.email,
    }, JWT_SECRET);
}

function normalizeResponse(user) {
    delete user.password;
    // console.log(222, user);
    return {
        ...user,
        token: generateJWT(user),
    };
}


module.exports = normalizeResponse;
