export const state = () => ({
    messages: [],
    rooms: [],
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
};

export const mutations = {
    addMessage(state, message) {
        state.messages = [...state.messages, message];
    },
};
