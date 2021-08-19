export default {
  ADD_PRODUCT_TO_CART(state, { product, isLoggedIn }) {
    const carts = [...state.carts];
    const cartIndex = carts.findIndex((cart) => cart.id === product.id);

    if (cartIndex === -1) {
      carts.push({ ...product, quantity: 1 });
    }

    state.carts = [...carts];

    if (!isLoggedIn) localStorage.setItem("carts", JSON.stringify(state.carts));
  },
  REMOVE_PRODUCT_FROM_CART(state, { product, isLoggedIn }) {
    const carts = [...state.carts];
    const cartIndex = carts.findIndex((cart) => cart.id === product.id);

    if (cartIndex !== -1) {
      carts.splice(cartIndex, 1);
    }

    state.carts = [...carts];

    if (!isLoggedIn) localStorage.setItem("carts", JSON.stringify(state.carts));
  },
  ADD_PRODUCTS_TO_WISHLIST(state, products) {
    state.wishList = products;
  },
  ADD_PRODUCT_TO_WISHLIST(state, product) {
    const wishList = [...state.wishList];

    wishList.push(product);

    state.wishList = [...wishList];
  },
  REMOVE_PRODUCT_FROM_WISHLIST(state, product) {
    const wishList = [...state.wishList];
    const wishListIndex = wishList.findIndex((item) => item.id === product.id);

    if (wishListIndex !== -1) {
      wishList.splice(wishListIndex, 1);
    }

    state.wishList = [...wishList];
  },
  REMOVE_ALL_PRODUCTS_FROM_CART(state) {
    state.carts = [];
    localStorage.setItem("carts", JSON.stringify(state.carts));
  },
  CURRENT_PRODUCT: (state, product) => {
    state.currentProduct = product;
  },
  UPDATE_CART: (state, { product, key, value, isLoggedIn }) => {
    let filteredProduct = state.carts.filter((item) => {
      return item.id === product.id;
    });
    if (filteredProduct.length > 0) {
      filteredProduct[0][key] = value;
    } else {
      state.carts.push(product);
    }
    if (!isLoggedIn) localStorage.setItem("carts", JSON.stringify(state.carts));
  },
  UPDATE_PRODUCTS: (state, products) => {
    products.forEach((product) => {
      let filteteredProducts = state.products.filter((item) => {
        return item.id === product.id;
      });
      if (filteteredProducts.length > 0) filteteredProducts[0] = product;
      else state.products.push(product);
    });
    localStorage.setItem("products", JSON.stringify(state.products));
  },
  UPDATE_PRODUCT_IN_PRODUCTS: (state, product) => {
    let filteteredProducts = state.products.filter((item) => {
      return item.id === product.id;
    });
    if (filteteredProducts.length > 0) filteteredProducts[0] = product;
    else state.products.push(product);

    console.log(state.products);
    localStorage.setItem("products", JSON.stringify(state.products));
  },
  REPLACE_CART_FROM_SERVER: (state, products) => {
    state.carts = products;
  },
  REPLACE_CART_FROM_LOCAL: (state) => {
    let cart = localStorage.getItem("carts");
    if (cart) {
      state.carts = JSON.parse(cart);
    } else {
      state.carts = [];
    }
  },
};
