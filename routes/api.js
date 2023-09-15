var express = require('express');
var router = express.Router();

const authController = require("../controllers/authController");
const booksController = require("../controllers/booksController");

router.post('/login', authController.login);

router.post('/register', authController.register);

// Cannot logout server-side after token is created
// router.post('/logout', authController.logout);

// router.get('/user/:userid/books', booksController.allBooks);

module.exports = router;