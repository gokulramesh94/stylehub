import axios from "../utils/axios";
import { Strings } from "../constants";

export default class productService {
  static getProductByCategory = async (category) => {
    try {
      category = category ? category : "men";
      const response = await axios.get(
        Strings.API_ENDPOINTS.FETCH_PRODUCTS_BY_CATEGORY,
        {
          params: {
            category,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error - productService -> getProductByCategory : ", error);
    }
  };
  static getProductById = async (id) => {
    try {
      id = id ? id : "";
      const response = await axios.get(
        Strings.API_ENDPOINTS.FETCH_PRODUCT_BY_ID,
        {
          params: {
            id,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error - productService -> getProductById : ", error);
    }
  };
  static addComment = async (
    user,
    title,
    review,
    ratings,
    productId,
    token
  ) => {
    try {
      user = user ? user : "";
      const response = await axios.post(
        Strings.API_ENDPOINTS.ADD_COMMENT,
        {
          user,
          title,
          review,
          ratings,
          productId,
        },
        { headers: { "x-access-token": token } }
      );
      return response.data;
    } catch (error) {
      console.log("Error - productService -> addComment : ", error);
    }
  };

  static fetchCartItems = async (username, token) => {
    try {
      const response = await axios.get(Strings.API_ENDPOINTS.FETCH_CART_ITEMS, {
        params: {
          username,
          token,
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error - productService -> fetchCartItems : ", error);
    }
  };

  static addItemToCart = async (username, product, token) => {
    try {
      const response = await axios.post(
        Strings.API_ENDPOINTS.ADD_ITEM_TO_CART,
        {
          username,
          product,
        },
        { headers: { "x-access-token": token } }
      );
      return response.data;
    } catch (error) {
      console.log("Error - productService -> addItemToCart : ", error);
    }
  };

  static removeItemFromCart = async (username, product, token) => {
    try {
      const response = await axios.post(
        Strings.API_ENDPOINTS.REMOVE_ITEM_FROM_CART,
        {
          username,
          product,
        },
        { headers: { "x-access-token": token } }
      );
      return response.data;
    } catch (error) {
      console.log("Error - productService -> removeItemFromCart : ", error);
    }
  };

  static placeOrder = async (username, orderSummary) => {
    let params = username
      ? {
          username,
          orderSummary,
        }
      : {
          orderSummary,
        };
    try {
      const response = await axios.post(
        Strings.API_ENDPOINTS.PLACE_ORDER,
        params
      );
      return response.data;
    } catch (error) {
      console.log("Error - productService -> placeOrder : ", error);
    }
  };

  static removeAllItemsFromCart = async (username, token) => {
    try {
      const response = await axios.post(
        Strings.API_ENDPOINTS.REMOVE_ALL_ITEMS_FROM_CART,
        { username },
        { headers: { "x-access-token": token } }
      );
      console.log(response.data);
    } catch (error) {
      console.log("Error - productService -> removeAllItemsFromCart : ", error);
    }
  };

  static fetchOrderHistory = async (username, token) => {
    try {
      const response = await axios.get(
        Strings.API_ENDPOINTS.FECTH_ORDER_HISTORY,
        {
          params: {
            username,
            token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error - productService -> fetchOrderHistory : ", error);
    }
  };

  static addItemToWishlist = async (username, product, token) => {
    try {
      const response = await axios.post(
        Strings.API_ENDPOINTS.ADD_ITEM_TO_WISHLIST,
        {
          username,
          product,
        },
        { headers: { "x-access-token": token } }
      );
      return response.data;
    } catch (error) {
      console.log("Error - productService -> addItemToWishlist : ", error);
    }
  };

  static removeItemFromWishlist = async (username, product, token) => {
    try {
      const response = await axios.post(
        Strings.API_ENDPOINTS.REMOVE_ITEM_FROM_WISHLIST,
        {
          username,
          product,
        },
        { headers: { "x-access-token": token } }
      );
      return response.data;
    } catch (error) {
      console.log("Error - productService -> removeItemFromWishlist : ", error);
    }
  };

  static getWishlistItems = async (username, token) => {
    try {
      const response = await axios.get(
        Strings.API_ENDPOINTS.GET_WISHLIST_ITEMS,
        {
          params: {
            username,
            token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error - productService -> getWishlistItems : ", error);
    }
  };
}
