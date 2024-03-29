const express = require("express");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const authorRouter = require("./routes/author");
const bookRouter = require("./routes/book");

const app = express();
const port = 5000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("common"));

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected!"));


app.get('/', (req, res) => {
  res.send('/v1/author to get data')
})

app.use("/v1/author", authorRouter);
app.use("/v1/book", bookRouter);


app.listen(process.env.PORT || port, () => {
  console.log(`server start at port ${port}`);
});
