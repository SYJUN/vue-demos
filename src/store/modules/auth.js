import axios from 'axios'

//state状态数据容器
export const state = {
  // 存储token
  currentUser: getSavedState('auth.currentUser'),
};

//修改 state 的方法，就是state状态数据的处理函数
export const mutations = {
  // 修改token，并将token存入localStorage
  SET_CURRENT_USER(state, newValue) {
    state.currentUser = newValue;
    saveState('auth.currentUser', newValue);
    setDefaultAuthHeaders(state);
  },
};

//对获取到的state数据进行过滤修改
export const getters = {
  // Whether the user is currently logged in.
  loggedIn(state) {
    return !!state.currentUser;
  },
};

//异步，通过commit触发mutations中的方法来修改state
export const actions = {
  init({ state, dispatch }) {
    setDefaultAuthHeaders(state);
    dispatch('validate');
  },

  logIn({ commit, dispatch, getters }, { username, password } = {}) {
    if (getters.loggedIn) return dispatch('validate');

    return new Promise((resolve, reject) => {
      commit('SET_CURRENT_USER', { username, password, token: 'Shinn_11166666' });
      resolve();
    });

    // return axios
    //   .post('/api/session', { username, password })
    //   .then((response) => {
    //     const user = response.data
    //     commit('SET_CURRENT_USER', user)
    //     return user
    //   })
  },

  // Logs out the current user.
  logOut({ commit }) {
    commit('SET_CURRENT_USER', null);
  },

  validate({ commit, state }) {
    if (!state.currentUser) return Promise.resolve(null);

    commit('SET_CURRENT_USER', getSavedState('auth.currentUser'));

    // return axios
    //   .get('/api/session')
    //   .then((response) => {
    //     const user = response.data
    //     commit('SET_CURRENT_USER', user)
    //     return user
    //   })
    //   .catch((error) => {
    //     if (error.response && error.response.status === 401) {
    //       commit('SET_CURRENT_USER', null)
    //     }
    //     return null
    //   });
  },
};

// ===
// Private helpers
// ===

function getSavedState(key) {
  return JSON.parse(window.localStorage.getItem(key));
}

function saveState(key, state) {
  window.localStorage.setItem(key, JSON.stringify(state));
}

function setDefaultAuthHeaders(state) {
  axios.defaults.headers.common.Authorization = state.currentUser ? state.currentUser.token : '';
}