import moduleApi from '~/config/api/module';
export const state = () => ({
    user: {},
    token: '',
    isLoggedIn: false,
    errors: null,
});

export const mutations = {
    setUser(state, user) {
        state.user = { ...user };
    },
    setIsLoggedIn(state, status) {
        state.isLoggedIn = status;
    },
    setToken(state, token) {
        state.token = token;
    },
};

export const actions = {
    // регистрация пользователя полученного с сервера
    registerUser({ commit }, user) {
        commit('setUser', user);
        commit('setIsLoggedIn', true);
        window.localStorage.setItem('token', user.token);
        commit('setToken', user.token);
    },
    // автоматическая авторизация по токену на клиенте
    authUser({ commit }) {
        const token = window.localStorage.getItem('token');
        if (!token) {
            return false;
        }
        const url = moduleApi.authorization.auth;
        this.$axios.get(url)
            .then(response => {
                const user = response.data.user;
                commit('setUser', user);
                commit('setIsLoggedIn', true);
                commit('setToken', token);
            })
            .catch(err => console.log(err.response.data.message));
    },
};
