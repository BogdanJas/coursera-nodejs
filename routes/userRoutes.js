const express = require("express");
const { register, login } = require("../controllers/userController");

const router = express.Router();

// Task 6: Register New user.
router.post("/register", register);

// Task 7: Login as a Registered user.
router.post("/login", login);

module.exports = router;
