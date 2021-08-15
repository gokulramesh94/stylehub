const Wishlist = require("../models/wishlist");
const User = require("../models/user");

exports.addItemToWishlist = async (req, res, next) => {
  const { username, product } = req.body;
  var { id, category, name, description, image, price, ratings } = product;
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
          var cartItem = await Wishlist.findOne({ username, id });
          if (cartItem) {
            res.send("Product is already added to wishlist!");
          } else {
            Wishlist.create({
              username,
              id,
              category,
              name,
              description,
              image,
              price,
              ratings,
            })
              .then(() => {
                res.send("Product added to wishlist");
              })
              .catch((error) => {
                res.send(
                  "Something went wrong! Could not add product to wishlist 1"
                );
              });
          }
        } else {
          res.send("username not found!");
        }
      })
      .catch((error) => {
        console.log(error);
        res.send("Something went wrong! Could not add product to wishlist 2");
      });
  } else {
    res.send({
      errorMsg:
        "Username, product id, category, name, description, image, price, ratings are all mandatory!",
    });
  }
};

exports.removeItemFromWishlist = async (req, res, next) => {
  const { username, product } = req.body;
  var { id, category, name, description, image, price, ratings } = product;
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
          var cartItem = await Wishlist.findOne({ username, id });
          if (cartItem) {
            Wishlist.findOneAndDelete({ username, id })
              .then((result) => {
                if (result) res.send("Product removed from wishlist.");
                else res.send("Product not found!");
              })
              .catch((error) => {
                console.log(error);
                res.send("Could not remove product from wishlist!");
              });
          } else {
            res.send("Product not found!");
          }
        } else {
          res.send("Username not found!");
        }
      })
      .catch((error) => {
        console.log(error);
        res.send("Something went wrong! Could not add product to wishlist");
      });
  } else {
    res.send({
      errorMsg:
        "Username, product id, category, name, description, image, price, ratings are all mandatory!",
    });
  }
};

exports.getWishlistItems = async (req, res, next) => {
  const { username } = req.body;
  if (username) {
    User.findOne({ username })
      .then((user) => {
        if (user) {
          Wishlist.find({ username })
            .then((result) => {
              res.send(result);
            })
            .catch((error) => {
              console.log(error);
              res.send(
                "Oops, something went wrong! Could not fetch products from wishlist."
              );
            });
        } else {
          res.send("Username not found!");
        }
      })
      .catch((error) => {
        console.log(error);
        res.send(
          "Oops, something went wrong! Could not fetch products from wishlist."
        );
      });
  } else {
    res.send("Username is mandatory!");
  }
};
