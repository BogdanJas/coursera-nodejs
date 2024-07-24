const Book = require("../models/Book");
const Review = require("../models/Review");
const User = require("../models/User");
const axios = require("axios");

// Task 1: Get the book list available in the shop.
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("reviews");
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Task 2: Get the books based on ISBN.
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

// Task 3: Get all books by Author.
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

// Task 4: Get all books based on Title.
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

// Task 5: Get book Review.
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

// Task 8: Add/Modify a book review.
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

// Task 9: Delete book review added by that particular user.
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
