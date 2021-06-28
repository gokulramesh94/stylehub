export default {
  setUser({ commit }, user) {
    commit("SET_USER", user);
  },
  logout({ commit }) {
    commit("LOGOUT");
  },
  addUser({ commit }, user) {
    commit("ADD_USER", user);
  },
  updateUser({ commit }, { check, value }) {
    commit("UPDATE_USER", { check, value });
  },
};
