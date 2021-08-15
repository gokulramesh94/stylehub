const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  username: {
    type: String,
  },
  orderSummary: {
    date: {
      type: Date,
      required: true,
    },
    total: {
      type: Schema.Types.Decimal128,
      required: true,
    },
    order: [
      {
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
        quantity: {
          type: Number,
          required: true,
          default: 0,
        },
      },
    ],
  },
});

module.exports = mongoose.model("Orders", orderSchema);
