export default {
  setUser({ commit }, user) {
    commit("SET_USER", user);
  },
  logout({ commit }) {
    commit("LOGOUT");
  },
};
