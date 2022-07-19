const express = require('express');
const authorizationRouter = express.Router();

// middleware that is specific to this router
authorizationRouter.use(function timeLog(req, res, next) {
    console.log('middleware: authorizationRouter');
    next();
});

// registration user
authorizationRouter.get('/registration', function(req, res) {
    res.json({
        registration: 'registration',
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

module.exports = authorizationRouter;
