import { Images } from "../constants";

export default {
  APPLICATION: "Style Hub",
  ROUTES: {
    ALL: "/:catchAll(.*)",
    ABOUT: "/about",
    HOME: "/",
    LOGIN: "/login",
    CATEGORY: "/category/:category",
    CART: "/cart",
    ACCOUNT: "/account",
    WISHLIST: "/wishlist",
    ORDER_CONFIRMATION: "/order-confirmation",
    PDP: "/pdp/:productId",
    ERROR_404: "/404",
  },
  API_ENDPOINTS: {
    ADD_COMMENT: "/add-comment",
    FETCH_PRODUCTS_BY_CATEGORY: "/fetchProductsByCategory",
    FETCH_PRODUCT_BY_ID: "/fetchProductById",
    FETCH_USER_INFO: "/fetch-user-info",
    LOGIN: "/login",
    REGISTER: "/registerUser",
    FETCH_CART_ITEMS: "/get-cart-items",
    ADD_ITEM_TO_CART: "/add-item-to-cart",
    REMOVE_ITEM_FROM_CART: "/remove-item-from-cart",
    REMOVE_ALL_ITEMS_FROM_CART: "/remove-all-items-from-cart",
  },
  SHOP: {
    CATEGORIES: [
      {
        NAME: "Men",
        PATH: "/category/men",
      },
      {
        NAME: "Women",
        PATH: "/category/women",
      },
    ],
  },
  ABOUT: {
    BANNER: [
      {
        NAME: "Find your style here!",
        IMAGE_SOURCE: Images.TOP_BANNER,
      },
      {
        NAME: "Working from home?",
        IMAGE_SOURCE: Images.MIDDLE_BANNER,
      },
    ],
    INFO: [
      {
        TITLE: "Customer Support",
        DESCRIPTION:
          "Have you ever finally just gave in to the temptation and read your horoscope.",
        IMAGE: Images.CUSTOMER_SUPPORT,
      },
      {
        TITLE: "Five Star Quality",
        DESCRIPTION:
          "Have you ever finally just gave in to the temptation and read your horoscope.",
        IMAGE: Images.FIVE_STAR_QUALITY,
      },
      {
        TITLE: "Express Delivery",
        DESCRIPTION:
          "Have you ever finally just gave in to the temptation and read your horoscope.",
        IMAGE: Images.EXPRESS_DELIVERY,
      },
      {
        TITLE: "Reasonable Prices",
        DESCRIPTION:
          "Have you ever finally just gave in to the temptation and read your horoscope.",
        IMAGE: Images.REASONABLE_PRICES,
      },
    ],
  },
};
