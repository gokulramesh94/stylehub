const Cart = require("../models/cart");
const User = require("../models/user");

exports.addItemToCart = async (req, res, next) => {
  const { username, product } = req.body;
  var { id, category, name, description, image, price, ratings, quantity } =
    product;
  if (!quantity) quantity = 1;
  if (
    username &&
    id &&
    category &&
    name &&
    description &&
    image &&
    price &&
    ratings
  ) {
    User.findOne({ username })
      .then(async (user) => {
        if (user) {
          var cartItem = await Cart.findOne({ username, id });
          if (cartItem) {
            cartItem.quantity = quantity;
            await cartItem.save();
            res.send("Product is already in cart. Updated the product count.");
          } else {
            Cart.create({
              username,
              id,
              category,
              name,
              description,
              image,
              price,
              ratings,
              quantity,
            })
              .then(() => {
                res.send("Items added to cart");
              })
              .catch((error) => {
                res.send("Something went wrong! Could not add item to cart");
              });
          }
        } else {
          res.send("username not found!");
        }
      })
      .catch((error) => {
        res.send("Something went wrong! Could not add item to cart");
      });
  } else {
    res.send({
      errorMsg:
        "Username, product id, category, name, description, image, price, ratings and quantiy are all mandatory!",
    });
  }
};

exports.removeItemFromCart = async (req, res, next) => {
  const { username, product } = req.body;
  var { id, category, name, description, image, price, ratings, quantity } =
    product;
  if (!quantity) quantity = 0;
  if (
    username &&
    id &&
    category &&
    name &&
    description &&
    image &&
    price &&
    ratings
  ) {
    User.findOne({ username })
      .then(async (user) => {
        if (user) {
          var cartItem = await Cart.findOne({ username, id });
          if (cartItem) {
            if (quantity !== 0) {
              cartItem.quantity = quantity;
              await cartItem.save();
              res.send("Updated the product count.");
            } else {
              Cart.findOneAndDelete({ username, id })
                .then((result) => {
                  if (result) res.send("Product removed from cart.");
                  else res.send("Product not found!");
                })
                .catch((error) => {
                  console.log(error);
                  res.send("Could not remove item from cart!");
                });
            }
          } else {
            res.send("Product not found!");
          }
        } else {
          res.send("username not found!");
        }
      })
      .catch((error) => {
        res.send("Something went wrong! Could not add item to cart");
      });
  } else {
    res.send({
      errorMsg:
        "Username, product id, category, name, description, image, price, ratings and quantiy are all mandatory!",
    });
  }
};

exports.removeAllItemsFromCart = (req, res, next) => {
  const { username } = req.body;
  if (username) {
    User.findOne({ username })
      .then((user) => {
        if (user) {
          Cart.deleteMany({ username })
            .then((result) => {
              if (result) res.send("All Products removed from cart.");
              else res.send("Product not found!");
            })
            .catch((error) => {
              console.log(error);
              res.send("Could not remove products from cart!");
            });
        } else {
          res.send("username not found!");
        }
      })
      .catch((error) => {
        console.log(error);
        res.send("Something went wrong! Could not remove products cart");
      });
  } else {
    res.send({
      errorMsg: "Username is mandatory!",
    });
  }
};

exports.getCartItems = async (req, res, next) => {
  const { username } = req.query;
  if (username) {
    User.findOne({ username })
      .then((user) => {
        if (user) {
          Cart.find({ username })
            .then((result) => {
              res.send(result);
            })
            .catch((error) => {
              console.log(error);
              res.send(
                "Oops, something went wrong! Could not fetch cart Items."
              );
            });
        } else {
          res.send("Username not found!");
        }
      })
      .catch((error) => {
        console.log(error);
        res.send("Oops, something went wrong! Could not fetch cart Items.");
      });
  } else {
    res.send("Username is mandatory!");
  }
};
