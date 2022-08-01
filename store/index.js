export const state = () => ({
    // комнаты
    rooms: [],
    // текущая комната
    currentRoom: null,
    // массив ошибок
    errors: null,
});

export const getters = {
    // количество пользователей в текущей комнате
    usersCurrentRoom(state) {
        return state.currentRoom.users;
    },
    // сообщения в текущей комнате
    messagesCurrentRoom(state) {
        return state.currentRoom.messages;
    },
};

export const actions = {
    async nuxtServerInit({ state, commit, dispatch }) {
        // Get initial data here
    },
    // добавления сообщения
    // SOCKET_addMessageFromServer({ commit }, message) {
    //     // console.log('ctx: ', ctx);
    //     // console.log('SOCKET_newMessage: ', data);
    //     commit('addMessage', message);
    // },
    // инициализация комнат
    SOCKET_initialRoomsClient({ commit }, rooms) {
        // console.log('rooms: ', rooms);
        // console.log('SOCKET_newMessage: ', data);
        commit('setRooms', rooms);
    },
    // добавление новой комнаты
    SOCKET_createRoom({ commit }, newRoom) {
        // console.log('ctx: ', ctx);
        // console.log('SOCKET_newMessage: ', data);
        commit('addNewRoom', newRoom);
    },
    // инициализация количества пользователей в комнате
    SOCKET_setUsersCurrentRoomStart({ commit }, users) {
        // console.log('ctx: ', ctx);
        // console.log('SOCKET_newMessage: ', data);
        commit('setUsersCurrentRoom', users);
    },
    // инициализация массива ошибок
    SOCKET_setError({ commit }, errors) {
        // console.log('ctx: ', ctx);
        // console.log('SOCKET_newMessage: ', data);
        commit('setErrorStart', errors);
    },
    // обновление данных в текущей комнате из бэкенда
    SOCKET_updateCurrentRoom({ commit }, currentRoom) {
        // console.log('ctx: ', ctx);
        // console.log('SOCKET_newMessage: ', data);
        commit('updateRoom', currentRoom);
    },
};

export const mutations = {
    // добавление сообщений
    // addMessage(state, message) {
    //     state.messages = [...state.messages, message];
    // },
    // удаление всех сообщений в комнате
    // deleteMessages(state) {
    //     state.messages = [];
    // },
    // установка текущей комнаты
    setCurrentRoom(state, currentRoom) {
        state.currentRoom = currentRoom;
    },
    // установка комнат
    setRooms(state, rooms) {
        state.rooms = [...rooms];
    },
    // добавление новой комнаты
    addNewRoom(state, newRoom) {
        state.rooms = [...state.rooms, newRoom];
    },
    // инициализируем количество пользоваталей в текущей комнате
    setUsersCurrentRoom(state, users) {
        state.usersCurrentRoom = [...users];
    },
    // инициализация ошибок
    setErrorStart(state, errors) {
        state.errors = [...errors];
    },
    // обновление данных в текущей комнате
    updateRoom(state, currentRoom) {
        state.currentRoom = currentRoom;
    },
};
