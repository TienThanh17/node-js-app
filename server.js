const express = require("express");
const router = require("./apiRouter");
var bodyParser = require("body-parser");

const app = express();
const port = 5000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json('hello fen')
})

app.use("/api/", router);

app.listen(5000, () => {
  console.log(`server start at port ${port}`);
});
