export default {
  ADD_PRODUCT_TO_CART(state, product) {
    const carts = [...state.carts];
    const cartIndex = carts.findIndex((cart) => cart.id === product.id);

    if (cartIndex === -1) {
      carts.push({ ...product, quantity: 1 });
    }

    state.carts = [...carts];

    localStorage.setItem("carts", JSON.stringify(state.carts));
  },
  REMOVE_PRODUCT_FROM_CART(state, product) {
    const carts = [...state.carts];
    const cartIndex = carts.findIndex((cart) => cart.id === product.id);

    if (cartIndex !== -1) {
      carts.splice(cartIndex, 1);
    }

    state.carts = [...carts];

    localStorage.setItem("carts", JSON.stringify(state.carts));
  },
  ADD_PRODUCT_TO_WISHLIST(state, product) {
    const wishList = [...state.wishList];
    const wishListIndex = wishList.findIndex((item) => item.id === product.id);

    if (wishListIndex === -1) {
      wishList.push({ ...product, quantity: 1 });
    }

    state.wishList = [...wishList];

    localStorage.setItem("wishList", JSON.stringify(state.wishList));
  },
  REMOVE_PRODUCT_FROM_WISHLIST(state, product) {
    const wishList = [...state.wishList];
    const wishListIndex = wishList.findIndex((item) => item.id === product.id);

    if (wishListIndex !== -1) {
      wishList.splice(wishListIndex, 1);
    }

    state.wishList = [...wishList];

    localStorage.setItem("wishList", JSON.stringify(state.wishList));
  },
  REMOVE_ALL_PRODUCTS_FROM_CART(state) {
    state.carts = [];
    localStorage.setItem("carts", JSON.stringify(state.carts));
  },
  REMOVE_ALL_PRODUCTS_FROM_WISHLIST(state) {
    state.wishList = [];
    localStorage.setItem("wishList", JSON.stringify(state.wishList));
  },
  CURRENT_PRODUCT: (state, product) => {
    state.currentProduct = product;
  },
  UPDATE_CART: (state, { product, key, value }) => {
    console.log(product.id + " " + key + " " + value);
    let filteredProduct = state.carts.filter((item) => {
      return item.id === product.id;
    });
    if (filteredProduct.length > 0) {
      filteredProduct[0][key] = value;
    } else {
      state.carts.push(product);
    }
    localStorage.setItem("carts", JSON.stringify(state.carts));
  },
  UPDATE_WISHLIST: (state, { product, key, value }) => {
    console.log(product.id + " " + key + " " + value);
    let filteredProduct = state.wishList.filter((item) => {
      return item.id === product.id;
    });
    if (filteredProduct.length > 0) {
      filteredProduct[0][key] = value;
    } else {
      state.wishList.push(product);
    }
    localStorage.setItem("wishList", JSON.stringify(state.wishList));
  },
  PLACE_ORDER: (state, order) => {
    state.orders = [...state.orders, order];
    localStorage.setItem("orders", JSON.stringify(state.orders));
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
};
