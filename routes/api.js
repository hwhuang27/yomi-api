var express = require('express');
var router = express.Router();

const auth_controller = require("../controllers/authController");
const books_controller = require("../controllers/booksController");

router.post('/login', authController.login);

router.post('/register', authController.register);

router.post('/logout', authController.logout);

router.get('/user/:userid/books', booksController.allBooks);

module.exports = router;