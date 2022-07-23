export const state = () => ({});

export const getters = {};

export const actions = {
    async nuxtServerInit({ state, commit, dispatch }) {
        // Get initial data here
    },
    SOCKET_newMessage(ctx, data) {
        console.log('SOCKET_newMessage: ', data);
    },
};

export const mutations = {};
