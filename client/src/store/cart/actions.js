export default {
  addProductToCart({ commit }, { product, isLoggedIn }) {
    commit("ADD_PRODUCT_TO_CART", { product, isLoggedIn });
  },
  removeProductFromCart({ commit }, { product, isLoggedIn }) {
    commit("REMOVE_PRODUCT_FROM_CART", { product, isLoggedIn });
  },
  removeAllProductsFromCart({ commit }) {
    commit("REMOVE_ALL_PRODUCTS_FROM_CART");
  },
  addProductsToWishlist({ commit }, products) {
    commit("ADD_PRODUCTS_TO_WISHLIST", products);
  },
  addProductToWishlist({ commit }, product) {
    commit("ADD_PRODUCT_TO_WISHLIST", product);
  },
  removeProductFromWishlist({ commit }, productId) {
    commit("REMOVE_PRODUCT_FROM_WISHLIST", productId);
  },
  currentProduct: ({ commit }, product) => {
    commit("CURRENT_PRODUCT", product);
  },
  updateCart: ({ commit }, { product, key, value, isLoggedIn }) => {
    commit("UPDATE_CART", { product, key, value, isLoggedIn });
  },
  updateProducts: ({ commit }, products) => {
    commit("UPDATE_PRODUCTS", products);
  },
  updateProductInProducts: ({ commit }, product) => {
    commit("UPDATE_PRODUCT_IN_PRODUCTS", product);
  },
  replaceCartFromServer: ({ commit }, products) => {
    commit("REPLACE_CART_FROM_SERVER", products);
  },
  replaceCartFromLocal: ({ commit }) => {
    commit("REPLACE_CART_FROM_LOCAL");
  },
};
