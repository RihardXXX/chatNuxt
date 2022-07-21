const express = require('express');
const authorizationRouter = express.Router();
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const normalizeResponse = require('./helpers');
const JWT_SECRET = require('./config');

// middleware that is specific to this router
authorizationRouter.use(function(req, res, next) {
    next();
});

// registration user
authorizationRouter.post('/registration', function(req, res) {
    const { username, email, password } = req.body.user;
    const user = new User({
        username,
        email,
        password,
    });
    user.save(function(err, doc, next) {
        if (err) {
            const errorsList = Object.values(err.errors).map(item => item.properties.message);
            return res.status(500).json({ message: errorsList });
        } else {
            return res.status(200).json({ user: normalizeResponse(doc.toObject()) });
        }
    });
});

// logIn user
authorizationRouter.get('/logIn', function(req, res) {
    res.json({
        logIn: 'logIn',
    });
});

// logOut user
authorizationRouter.get('/logOut', function(req, res) {
    res.json({
        logOut: 'logOut',
    });
});

// auth status
authorizationRouter.get('/auth', async function(req, res) {
    // получаем из хедара токен
    const token = req.headers.authorization.split(' ')[1];

    try {
        // парсим токен и получаем почту и тп данные
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded) {
            const email = decoded.email;
            // находим из БД пользорвателя и возвращаем его
            const user = await User.findOne({ email }).exec();
            return res.status(200).json({ user });
        }
    } catch (err) {
        return res.status(500).json({ message: err });
    }
});

module.exports = authorizationRouter;
