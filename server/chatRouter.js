const express = require('express');
const chatRouter = express.Router();

// middleware that is specific to this router
chatRouter.use(function timeLog(req, res, next) {
    // тут будет проверка авторизации для пользователей чатов
    console.log('Time: ', Date.now());
    next();
});
// define the home page route
chatRouter.get('/', function(req, res) {
    res.json({
        test: 'chat start',
    });
});

module.exports = chatRouter;
