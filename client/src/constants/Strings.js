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
    MEN: "/e1dfb32c-a226-4f40-96e2-f574bf14107c",
    WOMEN: "/42d79cd9-0461-4abc-a904-d07a655094c3",
    USERS: "/876777a1-b55c-4b33-ab51-75877d846e10",
    FETCH_USER_INFO: "/fetch-user-info",
    LOGIN: "/login",
    REGISTER: "/registerUser",
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
