const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    allowEIO3: true, // false by default
});
const { v4: uuidv4 } = require('uuid');

const rooms = [
    {
        id: 0,
        name: 'russia',
    },
    {
        id: 1,
        name: 'usa',
    },
];

const createMessage = (text, username, userId, id = uuidv4()) => ({ text, username, userId, id, name: `name${id}` });

io.on('connection', socket => {
    // инициализация комнат для общения
    socket.on('initialRooms', () => {
        socket.emit('initialRoomsClient', rooms);
    });

    // console.log('socket server start connection');
    // принимаем новое сообщение от клиента
    socket.on('createNewMessage', ({ text, room, user }, cb) => {
        // console.log('room: ', room);
        // цепляемся в определенной комнате
        socket.join(room);
        // console.log(user);
        const newMessage = createMessage(text, user.username, user._id);
        io.to(room).emit('addMessageFromServer', newMessage);
        cb(newMessage);
    });


    // подключение к комнате
    socket.on('joinedRooms', ({ user, room }, cb) => {
        // console.log('room: ', room);
        // цепляемся в определенной комнате
        socket.join(room);

        const username = user.username;

        socket.emit('addMessageFromServer', createMessage(`привет пользователь ${username}`, 'admin'));
        // то что будем транслироваться для других участников
        socket.broadcast
            .to(room)
            .emit('addMessageFromServer', createMessage(`Пользователь ${username} присоединился к чату`, 'admin'));
    });

    // пользователь вышел из комнаты
    socket.on('exitRoom', ({ room, user }, cb) => {
        // цепляемся в определенной комнате
        socket.join(room);
        const username = user.username;
        // то что будем транслироваться для других участников
        socket.broadcast
            .to(room)
            .emit('addMessageFromServer', createMessage(`Пользователь ${username} вышел из комнаты`, 'admin'));
    });

    // сменить комнату
    // socket.on('changeRoom', ({ user, idRoom }, cb) => {
    //     socket.$emit('joinedRooms', { user, room: idRoom });
    // });

    // создать новую комнату
    socket.on('createNewRoom', () => {
        // берем последний айдишник комнаты и его инкрементируем
        const newId = rooms[rooms.length-1].id+=1;
        // создаем новую тестовую комнату
        const newRoom = {
            id: newId,
            name: `test${newId}`,
        };
        // добавляем на сервер в новую комнату и на клиент новую комнату
        rooms.push(newRoom);
        socket.emit('createRoom', newRoom);
    });
});

module.exports = {
    app,
    server,
};
