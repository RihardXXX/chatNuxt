export const state = () => ({
    messages: [],
    rooms: [{
        id: 0,
        title: 'russia',
    }],
    currentRoom: null,
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
};

export const mutations = {
    addMessage(state, message) {
        state.messages = [...state.messages, message];
    },
    setCurrentRoom(state, currentRoom) {
        state.currentRoom = currentRoom;
    },
    setRooms(state, rooms) {
        state.rooms = [...rooms];
    },
    addNewRoom(state, newRoom) {
        state.rooms = [...state.rooms, newRoom];
    },
};
