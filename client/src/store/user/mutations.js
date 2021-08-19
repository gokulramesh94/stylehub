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
};
