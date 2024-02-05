// const { Author, Book } = require("../model/model");
const Author = require("../model/authorModel");

const authorController = {
  //ADD AN AUTHOR
  addAuthor: async (req, res) => {
    try {
      // const newAuthor = new Author(req.body);
      // const savedAuthor = await newAuthor.save();
      const savedAuthor = await Author.create(req.body);
      res.status(200).json(savedAuthor);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //GET ALL AUTHOR
  getAllAuthors: async (req, res) => {
    try {
      const authors = await Author.find();
      res.status(200).json(authors);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //GET AN AUTHOR
  getAuthor: async (req, res) => {
    try {
      const authors = await Author.findById(req.params.id).populate("books");
      res.status(200).json(authors);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = authorController;
