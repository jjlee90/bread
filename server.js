// Dependencies
const express = require("express");
// DEPENDENCIES
const mongoose = require("mongoose");

const methodOverride = require("method-override");

// Configuration
require("dotenv").config();
const PORT = process.env.PORT;
const app = express();
console.log(PORT);

// Middleware
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// MIDDLEWARE
app.use(methodOverride("_method"));

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to mongo: ", process.env.MONGO_URI);
  }
);

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to an Awesome App about Breads!");
});

// Breads
const breadsController = require("./controllers/breads_controller.js");
app.use("/breads", breadsController);

// 404 Page
app.get("*", (req, res) => {
  res.send("404");
});

// Listen
app.listen(PORT, () => {
  console.log("nomming at port", PORT);
});
