const Order = require("../models/order");
const User = require("../models/user");
const UserController = require("./user");

exports.placeOrder = (req, res, next) => {
  let { username, orderSummary } = req.body;
  if (orderSummary) {
    if (!username) {
      UserController.createAnonymousUser(req, res, next)
        .then((user) => {
          username = user.username;
          Order.create({ username, orderSummary })
            .then((result) => {
              if (result) res.send("Order placed.");
              else
                res.send("Oops, something went wrong! Couldn't place order.");
            })
            .catch((error) => {
              console.log(error);
              res.send("Oops, something went wrong! Couldn't place order.");
            });
        })
        .catch((error) => {
          console.log(error);
          res.send("Couldn't create anonymous user!");
        });
    } else {
      Order.create({ username, orderSummary })
        .then((result) => {
          if (result) res.send("Order placed.");
          else res.send("Oops, something went wrong! Couldn't place order.");
        })
        .catch((error) => {
          console.log(error);
          res.send("Oops, something went wrong! Couldn't place order.");
        });
    }
  } else {
    res.send("OrderSummary is required!");
  }
};

exports.fetchOrders = (req, res, next) => {
  const { username } = req.query;
  if (username) {
    User.findOne({ username }).then((user) => {
      if (user) {
        Order.find({ username })
          .then((orders) => {
            if (orders) res.send(orders);
            else res.send("Oops, something went wrong! Couldn't fetch orders.");
          })
          .catch((error) => {
            console.log(error);
            res.send("Oops, something went wrong! Couldn't fetch orders.");
          });
      } else {
        res.send("Username not found!");
      }
    });
  } else {
    res.send("username is required!");
  }
};
