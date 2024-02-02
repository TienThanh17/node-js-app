const express = require("express");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const authorRouter = require("./routes/author");
const bookRouter = require("./routes/book");

const app = express();
const port = 5000;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(morgan("common"));

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected!"));


app.use("/v1/author", authorRouter);
app.use("/v1/book", bookRouter);


app.listen(process.env.PORT || port, () => {
  console.log(`server start at port ${port}`);
});
