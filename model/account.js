const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/myDB")
  .then(() => console.log("Connected!"));


const Schema = mongoose.Schema;

const accountSchema = new Schema({
    username: String,
    password: String,
}, {
    collection: 'account'
});

const accountModel = mongoose.model('account', accountSchema)

module.exports = accountModel