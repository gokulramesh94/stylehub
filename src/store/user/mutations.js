import cookieUtils from "../../utils/cookies";

export default {
  SET_USER: (state, user) => {
    state.user = user;
    cookieUtils.setCookie("user", JSON.stringify(user));
  },
  LOGOUT(state) {
    state.user = { username: "", password: "", isLoggedIn: false };
    cookieUtils.deleteCookie("user");
  },
  ADD_USER(state, user) {
    state.users.push(user);
    localStorage.setItem("users", JSON.stringify(state.users));
  },
  UPDATE_USER(state, { check, value }) {
    let user = state.users.filter((user) => {
      return user.username === check;
    });
    if (user.length > 0) {
      user[0] = value;
      localStorage.setItem("users", JSON.stringify(state.users));
    }
  },
};
