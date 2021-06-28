import getters from "./getters";
import mutations from "./mutations.js";
import actions from "./actions";

const state = {
  carts: localStorage.getItem("carts")
    ? JSON.parse(localStorage.getItem("carts"))
    : [],
  wishList: localStorage.getItem("wishList")
    ? JSON.parse(localStorage.getItem("wishList"))
    : [],
  orders: localStorage.getItem("orders")
    ? JSON.parse(localStorage.getItem("orders"))
    : [],
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
