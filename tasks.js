const axios = require("axios");

const API_URL = "http://localhost:5000/api/books";

const getAllBooks = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
};

const getBookByISBN = (isbn) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/isbn/${isbn}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

const getBooksByAuthor = async (author) => {
  try {
    const response = await axios.get(`${API_URL}/author/${author}`);
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
};

const getBooksByTitle = async (title) => {
  try {
    const response = await axios.get(`${API_URL}/title/${title}`);
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
};

(async () => {
  await getAllBooks();
  getBookByISBN("some-isbn").then(console.log).catch(console.error);
  await getBooksByAuthor("some-author");
  await getBooksByTitle("some-title");
})();
