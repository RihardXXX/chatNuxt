const express = require('express');
const authorizationRouter = express.Router();
const User = require('./models/user');
// const normalizeResponse = require('./helpers');

// middleware that is specific to this router
authorizationRouter.use(function timeLog(req, res, next) {
    // console.log('middleware: authorizationRouter');
    next();
});

// registration user
authorizationRouter.post('/registration', function(req, res) {
    // console.log('req', req.body.user);
    const { username, email, password } = req.body.user;
    const user = new User({
        username,
        email,
        password,
    });
    // console.log('user: ', user);
    // try {
    //     const result = await user.save();
    //     console.log('result: ', result);
    //     res.status(200).json({ result });
    // } catch (err) {
    //     res.status(500).json({ message: err });
    // }
    user.save(function(err, doc, next) {
        if (err) {
            // console.log(err.name);
            console.log(Object.values(err.errors).map(item => item.properties.message));
            const errorsList = Object.values(err.errors).map(item => item.properties.message);
            return res.status(500).json({ message: errorsList });
        } else {
            return console.log('No Error');
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
authorizationRouter.get('/auth', function(req, res) {
    res.json({
        logOut: 'logOut',
    });
});

module.exports = authorizationRouter;
