export default {
  addProductToCart({ commit }, product) {
    commit("ADD_PRODUCT_TO_CART", product);
  },
  removeProductFromCart({ commit }, productId) {
    commit("REMOVE_PRODUCT_FROM_CART", productId);
  },
  removeAllProductsFromCart({ commit }) {
    commit("REMOVE_ALL_PRODUCTS_FROM_CART");
  },
  addProductToWishlist({ commit }, product) {
    commit("ADD_PRODUCT_TO_WISHLIST", product);
  },
  removeProductFromWishlist({ commit }, productId) {
    commit("REMOVE_PRODUCT_FROM_WISHLIST", productId);
  },
  removeAllProductsFromWishlist({ commit }) {
    commit("REMOVE_ALL_PRODUCTS_FROM_WISHLIST");
  },
  currentProduct: ({ commit }, product) => {
    commit("CURRENT_PRODUCT", product);
  },
  updateCart: ({ commit }, { product, key, value }) => {
    commit("UPDATE_CART", { product, key, value });
  },
  updateWishlist: ({ commit }, { product, key, value }) => {
    commit("UPDATE_WISHLIST", { product, key, value });
  },
  placeOrder: ({ commit }, order) => {
    commit("PLACE_ORDER", order);
  },
  updateProducts: ({ commit }, products) => {
    commit("UPDATE_PRODUCTS", products);
  },
  updateProductInProducts: ({ commit }, product) => {
    commit("UPDATE_PRODUCT_IN_PRODUCTS", product);
  },
};
