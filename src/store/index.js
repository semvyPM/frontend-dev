import { createStore } from 'vuex';

export default createStore({
    state: {
        user: null, // Здесь будет храниться информация о пользователе
        token: null
    },
    mutations: {
        setUser(state, userData) {
            state.user = userData;
            localStorage.setItem('user', JSON.stringify(userData));
        },
        clearUser(state) {
            state.user = null;
            localStorage.removeItem('user');
        },
        setToken(state, token) {
            state.token = token;
            localStorage.setItem('token', token);
        },
        clearToken(state) {
            state.token = null;
            localStorage.removeItem('token');
        }
    },
    actions: {
        setUser({ commit }, userData) {
            commit('setUser', userData);
        },
        clearUser({ commit }) {
            commit('clearUser');
        },
        setToken({ commit }, token) {
            commit('setToken', token);
        },
        clearToken({ commit }) {
            commit('clearToken');
        },
        loadUser({ commit }) {
            const userData  = localStorage.getItem('user');
            if (userData) {
                commit('setUser', JSON.parse(userData));
            }
        },
        loadToken({ commit }) {
            const token  = localStorage.getItem('token');
            if (token) {
                commit('setToken', token);
            }
        }

    }
});
