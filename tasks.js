const axios = require("axios");

const API_URL = "http://localhost:5000/api/books";

// Task 10: Get all books – Using async callback function.
const getAllBooks = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
};

// Task 11: Search by ISBN – Using Promises.
const getBookByISBN = (isbn) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/isbn/${isbn}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

// Task 12: Search by Author.
const getBooksByAuthor = async (author) => {
  try {
    const response = await axios.get(`${API_URL}/author/${author}`);
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
};

// Task 13: Search by Title.
const getBooksByTitle = async (title) => {
  try {
    const response = await axios.get(`${API_URL}/title/${title}`);
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
};

// Test the functions
(async () => {
  await getAllBooks();
  getBookByISBN("some-isbn").then(console.log).catch(console.error);
  await getBooksByAuthor("some-author");
  await getBooksByTitle("some-title");
})();
