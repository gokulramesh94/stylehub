import getters from "./getters";
import mutations from "./mutations.js";
import actions from "./actions";
import cookieUtils from "../../utils/cookies";

const state = {
  user: cookieUtils.getCookie("user")
    ? JSON.parse(cookieUtils.getCookie("user"))
    : { username: "", token: "" },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
