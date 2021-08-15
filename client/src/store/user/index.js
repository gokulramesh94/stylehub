import getters from "./getters";
import mutations from "./mutations.js";
import actions from "./actions";
import cookieUtils from "../../utils/cookies";

const state = {
  users: localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [],
  user: cookieUtils.getCookie("user")
    ? JSON.parse(cookieUtils.getCookie("user"))
    : { username: "", password: "", isLoggedIn: false },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
