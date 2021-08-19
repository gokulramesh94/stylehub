import getters from "./getters";
import mutations from "./mutations.js";
import actions from "./actions";

const state = {
  carts: localStorage.getItem("carts")
    ? JSON.parse(localStorage.getItem("carts"))
    : [],
  wishList: [],
  products: localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [],
  currentProduct: {},
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
