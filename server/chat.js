const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    allowEIO3: true, // false by default
});
const { v4: uuidv4 } = require('uuid');
const Room = require('./models/room');
// const normalizeResponse = require('~/server/helpers');
// const User = require('~/server/models/user');
// const Message = require('~/server/models/message');

const rooms = [];


const createMessage = (text, username, userId, id = uuidv4()) => ({ text, username, userId, id, name: `name${id}` });

io.on('connection', socket => {
    // инициализация комнат для общения
    socket.on('initialRooms', async ({ user }, cb) => {
        console.log('------');
        // если нет в БД общей комнаты то создаем её
        const room = await Room.findOne({ name: 'общая' }).exec();
        if (!room) {
            // создав комнату, сразу кладем юзера туда
            const newRoom = new Room({
                name: 'общая',
                topic: 'теги',
                users: [user],
                messages: [],
            });

            newRoom.save(function(err, doc, next) {
                if (err) {
                    const errorsList = Object.values(err.errors).map(item => item.properties.message);
                    socket.emit('setError', errorsList);
                } else {
                    socket.emit('initialRoomsClient', [room]);
                }
            });
        } else {
            // если комната есть то добавляем участника
            // но делаем проверку чтобы он там ранее не был
            const isRepeat = room.users.some(item => item._id === user._id);
            if (!isRepeat) {
                room.users.push(user);
                await room.save();
            }
            socket.emit('initialRoomsClient', [room]);
        }
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
        socket.join(room.id);
        const username = user.username;

        // тут создаём модель сообщения и сохраняем её

        // потом модель сообщения сохраненное кладём в сообщения текущей комнаты

        socket.emit('addMessageFromServer', createMessage(`привет пользователь ${username}`, 'admin'));
        // то что будем транслироваться для других участников
        socket.broadcast
            .to(room)
            .emit('addMessageFromServer', createMessage(`Пользователь ${username} присоединился к чату`, 'admin'));

        // добавляем участника в комнату на сервере и клиенте
        // addUser(user);
        // socket.emit('setUsersCurrentRoomStart', usersCurrentRoom);
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
