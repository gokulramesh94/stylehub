export default {
  getCurrentProduct: (state) => state.currentProduct,
  getProductFromWishlist: (state) => (productId) =>
    state.wishList.filter((product) => {
      return product.id == productId;
    }),
  getProductFromCart: (state) => (productId) =>
    state.carts.filter((product) => {
      return product.id == productId;
    })[0],
  getCartCount: (state) => state.carts.length,
  getCartItems: (state) => state.carts,
  getWishlistCount: (state) => state.wishList.length,
  getWishlistItems: (state) => state.wishList,
  getAllProducts: (state) => state.products,
};
