import moduleApi from '~/config/api/module';

export const state = () => ({
    user: {},
    token: '',
    isLoggedIn: false,
    errors: null,
    isLoading: false,
    allUsers: null,
});

export const mutations = {
    setUser(state, user) {
        state.user = { ...user };
    },
    setIsLoggedIn(state, status) {
        state.isLoggedIn = status;
    },
    setIsLoading(state, status) {
        state.isLoading = status;
    },
    setToken(state, token) {
        state.token = token;
    },
    setAllUsers(state, allUsers) {
        state.allUsers = [...allUsers];
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
        commit('setIsLoading', true);
        const token = window?.localStorage.getItem('token');
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
                commit('setIsLoading', false);
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
    // получение списка всех пользователей приложения, чтобы приглашать можно было
    getAllUsers({ commit }) {
        const url = moduleApi.authorization.allUsers;
        this.$axios.get(url)
            .then(res => commit('setAllUsers', res.data.allUsers))
            .catch(err => console.log(err.response.data.message));
    },
};
