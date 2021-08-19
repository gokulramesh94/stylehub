const path = require("path");

const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop");
const userController = require("../controllers/user");
const cartController = require("../controllers/cart");
const wishlistController = require("../controllers/wishlist");
const orderController = require("../controllers/order");

const auth = require("./middleware/auth");

// Product Routes
router.get("/fetchProductsByCategory", shopController.getProductByCategory);
router.get("/fetchProductById", shopController.getProductById);
router.post("/add-comment", auth, shopController.addComment);

// User Routes
router.post("/registerUser", userController.addUser);
router.post("/login", userController.authenticateUser);
router.post("/fetch-user-info", auth, userController.fetchUserInfo);

// Cart Routes
router.post("/add-item-to-cart", auth, cartController.addItemToCart);
router.post("/remove-item-from-cart", auth, cartController.removeItemFromCart);
router.get("/get-cart-items", auth, cartController.getCartItems);
router.post(
  "/remove-all-items-from-cart",
  auth,
  cartController.removeAllItemsFromCart
);

// Wishlist Routes
router.post(
  "/add-item-to-wishlist",
  auth,
  wishlistController.addItemToWishlist
);
router.post(
  "/remove-item-from-wishlist",
  auth,
  wishlistController.removeItemFromWishlist
);
router.get("/get-wishlist-items", auth, wishlistController.getWishlistItems);

// Order Routes
router.post("/place-order", orderController.placeOrder);
router.get("/get-order-history", auth, orderController.fetchOrders);

module.exports = router;
