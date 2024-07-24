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

router.get("/", getBooks);

router.get("/isbn/:isbn", getBookByISBN);

router.get("/author/:author", getBooksByAuthor);

router.get("/title/:title", getBooksByTitle);

router.get("/review/:reviewId", getBookReview);

router.post("/review/:bookId", auth, addOrModifyReview);

router.delete("/review/:reviewId", auth, deleteReview);

module.exports = router;
