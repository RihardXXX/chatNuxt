const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    allowEIO3: true, // false by default
});
const { v4: uuidv4 } = require('uuid');

const createMessage = (text, username, id = uuidv4()) => ({ text, username, id, name: `name${id}` });

io.on('connection', socket => {
    // console.log('socket server start connection');
    // принимаем новое сообщение от клиента
    socket.on('createNewMessage', message => {
        console.log('server work: ', message);
        // вызываем экшин на клиенте добавляя сообщение
        socket.emit('addMessageFromServer', message);
    });


    // создаем комнаты и подключаем пользователей
    socket.on('joinedRooms', user => {
        // console.log(112, user);
        socket.emit('addMessageFromServer', createMessage(`привет пользователь ${user.username}`, 'admin'));
    });
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
