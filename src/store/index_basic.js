import Vue from 'vue';
import Vuex from 'vuex';
import Request from '../util/request';
import { LOGIN_STATE } from './enums';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    login_state: LOGIN_STATE.DEFAULT,
    login_token: null,
  },
  mutations: {
    login_setState(state, newState) {
      state.login_state = newState;
    },
    login_setToken(state, token) {
      state.login_token = token;
    },
  },
  getters: {
    login_token: state => {
      return state.login_token;
    },
    login_state: state => {
      return state.login_state;
    },
    login_isLoading: state => {
      return [LOGIN_STATE.PASSWORD_RESET_LOADING, LOGIN_STATE.LOADING].includes(
        state.login_state,
      );
    },
    login_isError: state => {
      return [LOGIN_STATE.PASSWORD_RESET_ERROR, LOGIN_STATE.ERROR].includes(
        state.login_state,
      );
    },
  },
  actions: {
    reset({ commit }) {
      commit('login_setState', LOGIN_STATE.DEFAULT);
      commit('login_setToken', null);
    },
    login({ commit }, { username, password }) {
      commit('login_setState', LOGIN_STATE.LOADING);
      Request.login({ username, password })
        .then(({ token }) => {
          commit('login_setState', LOGIN_STATE.SUCCESS);
          commit('login_setToken', token);
        })
        .catch(err => {
          commit('login_setState', LOGIN_STATE.ERROR);
          return err.message;
        });
    },
  },
});
