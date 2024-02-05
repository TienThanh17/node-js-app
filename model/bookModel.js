const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    publishedDate: String,
    genres: [String],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
  },
  {
    collection: "books",
  }
);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
