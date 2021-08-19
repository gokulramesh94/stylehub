const path = require("path");

require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const { MONGO_URI, PORT } = process.env;

const errorController = require("./controllers/error");

const app = express();

const routes = require("./routes/index");

//Enable cors
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.use(errorController.get404);

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("listening on port ", PORT);
    app.listen(PORT);
  })
  .catch((err) => console.log(err));

module.exports = app;
