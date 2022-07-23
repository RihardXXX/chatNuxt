const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
    console.log('socket connection xx-xx-xx');
});

// // middleware that is specific to this router
// chatRouter.use(function timeLog(req, res, next) {
//     // тут будет проверка авторизации для пользователей чатов
//     console.log('Time: ', Date.now());
//     next();
// });
// // define the home page route
// chatRouter.get('/', function(req, res) {
//     res.json({
//         test: 'chat start',
//     });
// });

module.exports = {
    app,
    server,
};
