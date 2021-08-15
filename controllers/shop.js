const Products = require("../models/product");

exports.getProductByCategory = (req, res, next) => {
  const category = req.body.category || "";
  console.log("category : ", category);
  if (category && category !== "") {
    Products.find({ category })
      .then((products) => {
        res.send(products);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.send({ errorMsg: "Category not found!" });
  }
};

exports.getProductById = (req, res, next) => {
  const id = req.body.id || "";
  console.log("Product ID : ", id);
  if (id && id !== "") {
    Products.find({ id })
      .then((product) => {
        res.send(product);
      })
      .catch((err) => {
        console.log(err);
        res.send({ errorMsg: "Oops, something went wrong!" });
      });
  } else {
    res.send({ errorMsg: "Product ID not found!" });
  }
};

exports.addComment = async (req, res, next) => {
  const { user, title, review, ratings, productId } = req.body;
  if (user && title && review && ratings && productId) {
    var product = await Products.findOne({ id: productId });

    if (product) {
      product.comments = [
        ...product.comments,
        { user, title, review, ratings },
      ];
      await product.save();
      res.send("Comment added!");
    } else {
      res.send({ errorMsg: "Product ID not found!" });
    }
  } else {
    res.send({ errorMsg: "All fields are mandatory!" });
  }
};
