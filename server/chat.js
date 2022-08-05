const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    allowEIO3: true, // false by default
});
// const { v4: uuidv4 } = require('uuid');
const Room = require('./models/room');
const Message = require('./models/message');
const { normalizeRoom } = require('./helpers');
// const User = require('~/server/models/user');
// const Message = require('~/server/models/message');

// const rooms = [];

// const createMessage = (text, username, userId, id = uuidv4()) => ({ text, username, userId, id, name: `name${id}` });

io.on('connection', socket => {
    // получение списка всех комнат и обновление их на клиенте
    socket.on('updateAllRooms', async () => {
        const allRooms = await Room.find();
        io.emit('initialRoomsClient', allRooms);
    });

    // инициализация комнат для общения
    socket.on('initialRooms', async ({ user }, cb) => {
        // если нет в БД общей комнаты то создаем её
        const room = await Room.findOne({ name: 'общая' }).exec();
        if (!room) {
            const newRoom = new Room({
                name: 'общая',
                topic: 'теги',
                users: [],
                messages: [],
            });

            newRoom.save(async function(err, doc, next) {
                if (err) {
                    const errorsList = Object.values(err.errors).map(item => item.properties.message);
                    socket.emit('setError', errorsList);
                } else {
                    socket._events.updateAllRooms();
                }
            });
        } else {
            // обновляем состояние списка комнат на клиенте вызывая серверное событие
            socket._events.updateAllRooms();
        }
    });

    // принимаем новое сообщение от клиента
    socket.on('createNewMessage', async ({ text, room, user }, cb) => {
        // цепляемся в определенной комнате
        socket.join(room._id);

        // делаем проверку на пустоту сообщения
        if (!text.length) {
            socket.emit('setError', ['пожалуйста заполните сообщение для отправки']);
            return;
        }

        // создаём сообщение для текущей комнаты
        const newMessage = new Message({
            room: room.name,
            user,
            message_body: text,
        });

        // находим текущую комнату и в неё добавляем сообщение
        const currentRoom = await Room.findById(room._id);
        // добавляем сообщение
        currentRoom.messages.push(newMessage);
        // сохраняем изменения
        await currentRoom.save();

        // обновляем на клиенте текущую комнату
        // отправляем с сервера последние 30 сообщений чтобы не нагружать клиент
        io.to(room._id).emit('updateCurrentRoom', normalizeRoom(currentRoom));
    });


    // подключение к комнате
    socket.on('joinedRooms', async ({ user, room }, cb) => {
        // цепляемся в определенной комнате
        socket.join(room._id);
        // тут создаём модель сообщения и сохраняем её
        const newMessage = new Message({
            room: room.name,
            user,
            message_body: `Пользователь ${user.username} присоединился к чату`,
        });

        // находим комнату по айди
        const currentRoom = await Room.findById(room._id);
        // добавляем сообщение
        currentRoom.messages.push(newMessage);
        // сохраняем изменения
        await currentRoom.save();

        // проверяем есть ли в комнате юзер с таким айди, если нет то добавляем
        const isRepeat = currentRoom.users.some(item => item._id === user._id);
        if (!isRepeat) {
            // удаляем пароль перед добавлениям в комнату
            delete user.password;
            currentRoom.users.push(user);
            await currentRoom.save();
        }

        // обновляем на клиенте текущую комнату
        io.to(room._id).emit('updateCurrentRoom', normalizeRoom(currentRoom));
        // обновляем список всех комнат на клиенте, нужно чтобы другие участники видели кто и в каких комнатах
        socket._events.updateAllRooms();
        // // то что будем транслироваться для других участников
        // socket.broadcast
        //     .to(room)
        //     .emit('addMessageFromServer', createMessage(`Пользователь ${username} присоединился к чату`, 'admin'));
    });

    // пользователь вышел из комнаты
    socket.on('exitRoom', async ({ room, user }, cb) => {
        // цепляемся в определенной комнате
        socket.join(room._id);

        // находим в бд текущую комнату
        const currentRoom = await Room.findById(room._id);
        // удаляем пользователя из текущей комнаты
        currentRoom.users = currentRoom.users.filter(item => item._id !== user._id);
        // сохраняем изменения в бд
        await currentRoom.save();

        // создаем сообщение о том что пользователь удалился из комнаты
        const newMessage = new Message({
            room: room.name,
            user,
            message_body: `Пользователь ${user.username} вышел из чата`,
        });
        // добавляем сообщение
        currentRoom.messages.push(newMessage);
        // сохраняем изменения
        await currentRoom.save();

        // бросаем на клиент обновленную комнату
        io.to(room._id).emit('updateCurrentRoom', currentRoom);
        // обновляем список всех комнат на клиенте, нужно чтобы другие участники видели кто и в каких комнатах
        socket._events.updateAllRooms();
        // то что будем транслироваться для других участников
        // socket.broadcast
        //     .to(room)
        //     .emit('addMessageFromServer', createMessage(`Пользователь ${username} вышел из комнаты`, 'admin'));
    });

    // сменить комнату
    // socket.on('changeRoom', ({ user, idRoom }, cb) => {
    //     socket.$emit('joinedRooms', { user, room: idRoom });
    // });

    // создать новую комнату
    socket.on('createNewRoom', ({ room, user }, cb) => {
        console.log('user: ', user);
        console.log('room: ', room);

        // получить данные от клиента

        // сформировать комнату

        // сохранить комнату

        // сделать декремент в счетчике создания комнат у данного пользователя

        // сохранить данные пользователя после декремента

        // вызывать getMyRooms и положить туда список всех моих комнат

        // обновить список всех комнат на клиенте
    });
});

module.exports = {
    app,
    server,
};
