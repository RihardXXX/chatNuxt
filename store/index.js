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
    SOCKET_addMessageFromServer({ commit }, message) {
        // console.log('ctx: ', ctx);
        // console.log('SOCKET_newMessage: ', data);
        commit('addMessage', message);
    },
    SOCKET_initialRooms({ commit }, rooms) {
        // console.log('ctx: ', ctx);
        // console.log('SOCKET_newMessage: ', data);
        commit('addMessage', rooms);
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
};
