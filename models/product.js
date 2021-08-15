const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  ratings: {
    type: Number,
    required: true,
  },
  comments: [
    {
      title: {
        type: String,
        required: true,
      },
      review: {
        type: String,
        required: true,
      },
      ratings: {
        type: Number,
        required: true,
      },
      user: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Products", productSchema);
