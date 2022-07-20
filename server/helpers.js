const jwt = require('jsonwebtoken');
const sign = jwt;
// import { sign } from 'jsonwebtoken';
const JWT_SECRET = require('./config');

function generateJWT(user) {
    return sign({
        id: user.id,
        username: user.username,
        email: user.email,
    }, JWT_SECRET);
}

function normalizeResponse(user) {
    delete user.password;
    return {
        user: {
            ...user,
            token: generateJWT(user),
        },
    };
}


module.exports = normalizeResponse;
