export const state = () => ({
    // сообщения в комнате
    messages: [],
    // комнаты
    rooms: [{
        id: 0,
        title: 'russia',
    }],
    // id текущей комнаты
    currentRoom: null,
    // количество пользователей в текущей комнате
    usersCurrentRoom: [],
    // массив ошибок
    errors: null,
});

export const getters = {};

export const actions = {
    async nuxtServerInit({ state, commit, dispatch }) {
        // Get initial data here
    },
    // добавления сообщения
    SOCKET_addMessageFromServer({ commit }, message) {
        // console.log('ctx: ', ctx);
        // console.log('SOCKET_newMessage: ', data);
        commit('addMessage', message);
    },
    // инициализация комнат
    SOCKET_initialRoomsClient({ commit }, rooms) {
        // console.log('ctx: ', ctx);
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
};

export const mutations = {
    // добавление сообщений
    addMessage(state, message) {
        state.messages = [...state.messages, message];
    },
    // удаление всех сообщений в комнате
    deleteMessages(state) {
        state.messages = [];
    },
    // устновка айди текущей комнаты
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
};
