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

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    year: Number,
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
  },
  {
    collection: "authors",
  }
);

const Book = mongoose.model("Book", bookSchema);
const Author = mongoose.model("Author", authorSchema);

module.exports = { Book, Author };
