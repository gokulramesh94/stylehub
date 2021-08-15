const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const anonymousSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  token: { type: String },
});

module.exports = mongoose.model("Anonymous", anonymousSchema);
