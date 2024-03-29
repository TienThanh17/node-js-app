const Book = require("../models/bookModel");
const Author = require("../models/authorModel");

const bookController = {
  //ADD A BOOK
  addBook: async (req, res) => {
    try {
      const newBook = new Book(req.body);
      const savedBook = await newBook.save();
      if (req.body.author) {
        await Author.findByIdAndUpdate(req.body.author, {
          $push: { books: savedBook._id },
        });
      }
      res.status(200).json(savedBook);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //GET ALL BOOKS
  getAllBooks: async (req, res) => {
    try {
      const PAGE_SIZE = 2;
      var page = parseInt(req.query.page);
      if (page) {
        if ((page === "NaN" || page < 1)) {
          page = 1;
        }
        var skip_quantity = (page - 1) * PAGE_SIZE;
        var books = await Book.find()
          .skip(skip_quantity)
          .limit(PAGE_SIZE)
          .populate("author");
      } else {
        var books = await Book.find().populate("author");
      }
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //GET A BOOK
  getBook: async (req, res) => {
    try {
      const books = await Book.findById(req.params.id).populate("author");
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //UPDATE A BOOK
  updateBook: async (req, res) => {
    try {
      await Book.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("updated successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //DELETE A BOOK
  deleteBook: async (req, res) => {
    try {
      await Author.updateMany(
        { books: req.params.id },
        { $pull: { books: req.params.id } }
      );
      await Book.findByIdAndDelete(req.params.id);
      res.status(200).json("deleted successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = bookController;
