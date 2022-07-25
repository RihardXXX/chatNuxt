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
    socket.on('createNewMessage', ({ text, room, username }, cb) => {
        // цепляемся в определенной комнате
        socket.join(room);
        const newMessage = createMessage(text, username);
        io.to(room).emit('addMessageFromServer', newMessage);
        cb(newMessage);
    });


    // подключение к комнате
    socket.on('joinedRooms', ({ user, room }, cb) => {
        // цепляемся в определенной комнате
        socket.join(room);

        const username = user.username;

        socket.emit('addMessageFromServer', createMessage(`привет пользователь ${username}`, 'admin'));
        // то что будем транслироваться для других участников
        socket.broadcast
            .to(room)
            .emit('addMessageFromServer', createMessage(`Пользователь ${username} присоединился к чату`, 'admin'));
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
