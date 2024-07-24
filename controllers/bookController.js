const Book = require("../models/Book");
const Review = require("../models/Review");
const User = require("../models/User");
const axios = require("axios");

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("reviews");
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookByISBN = async (req, res) => {
  try {
    const book = await Book.findOne({ isbn: req.params.isbn }).populate(
      "reviews"
    );
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBooksByAuthor = async (req, res) => {
  try {
    const books = await Book.find({ author: req.params.author }).populate(
      "reviews"
    );
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBooksByTitle = async (req, res) => {
  try {
    const books = await Book.find({ title: req.params.title }).populate(
      "reviews"
    );
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId)
      .populate("user")
      .populate("book");
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addOrModifyReview = async (req, res) => {
  const { review } = req.body;
  const userId = req.user.id;
  const bookId = req.params.bookId;

  try {
    let reviewDoc = await Review.findOne({ user: userId, book: bookId });
    if (reviewDoc) {
      reviewDoc.review = review;
    } else {
      reviewDoc = new Review({ user: userId, book: bookId, review });
    }
    await reviewDoc.save();
    res.json(reviewDoc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  const userId = req.user.id;
  const reviewId = req.params.reviewId;

  try {
    const review = await Review.findOneAndDelete({
      _id: reviewId,
      user: userId,
    });
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
