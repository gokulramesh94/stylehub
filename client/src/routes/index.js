import { createRouter, createWebHashHistory } from "vue-router";
import { Strings } from "../constants";
import Home from "../views/Home.vue";

const routes = [
  {
    path: Strings.ROUTES.HOME,
    name: "Home",
    component: Home,
  },
  {
    path: Strings.ROUTES.CATEGORY,
    name: "Category",
    component: Home,
    props: true,
  },
  {
    path: Strings.ROUTES.ABOUT,
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: Strings.ROUTES.CART,
    name: "Cart",
    component: () => import("../views/Cart.vue"),
  },
  {
    path: Strings.ROUTES.WISHLIST,
    name: "Wishlist",
    component: () => import("../views/Wishlist.vue"),
  },
  {
    path: Strings.ROUTES.PDP,
    name: "pdp",
    component: () => import("../views/Pdp.vue"),
    props: true,
  },
  {
    path: Strings.ROUTES.ACCOUNT,
    name: "Account",
    component: () => import("../views/Account.vue"),
  },
  {
    path: Strings.ROUTES.ORDER_CONFIRMATION,
    name: "OrderConfirmation",
    component: () => import("../views/OrderConfirmation.vue"),
  },
  {
    path: Strings.ROUTES.LOGIN,
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: Strings.ROUTES.HOME,
    name: "Home",
    component: Home,
  },
  {
    path: Strings.ROUTES.ERROR_404,
    name: "Error",
    component: () => import("../views/Error.vue"),
  },
  {
    path: Strings.ROUTES.ALL,
    redirect: Strings.ROUTES.ERROR_404,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
