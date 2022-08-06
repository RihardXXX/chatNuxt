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
    // метод который помогает разлогинится пользователю
    logout({ commit }) {
        console.log('logout');
        window.localStorage.removeItem('token');
        commit('setUser', {});
        commit('setIsLoggedIn', false);
        commit('setToken', '');
    },
    // авторизоваться в вручную по логину и паролю
    login({ commit }, user) {
        return new Promise((resolve, reject) => {
            // console.log('login action');
            // console.log('user: ', user);
            commit('setUser', user);
            commit('setIsLoggedIn', true);
            window.localStorage.setItem('token', user.token);
            commit('setToken', user.token);
            resolve();
        });
    },
    // это для сокета обновление состояния данных юзера с сервера
    SOCKET_updateUserClient({ commit }, user) {
        commit('setUser', user);
    },
};
