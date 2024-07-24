const express = require("express");
const {
  getBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle,
  getBookReview,
  addOrModifyReview,
  deleteReview,
} = require("../controllers/bookController");
const auth = require("../middlewares/authMiddleware");

const router = express.Router();

// Task 1: Get the book list available in the shop.
router.get("/", getBooks);

// Task 2: Get the books based on ISBN.
router.get("/isbn/:isbn", getBookByISBN);

// Task 3: Get all books by Author.
router.get("/author/:author", getBooksByAuthor);

// Task 4: Get all books based on Title.
router.get("/title/:title", getBooksByTitle);

// Task 5: Get book Review.
router.get("/review/:reviewId", getBookReview);

// Task 8: Add/Modify a book review.
router.post("/review/:bookId", auth, addOrModifyReview);

// Task 9: Delete book review added by that particular user.
router.delete("/review/:reviewId", auth, deleteReview);

module.exports = router;
