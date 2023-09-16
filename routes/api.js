var express = require('express');
var router = express.Router();
const passport = require("passport");


const authController = require("../controllers/authController");
const booksController = require("../controllers/booksController");

router.post('/login', authController.login);
// router.post('/logout', authController.logout);
// Logout not needed because of JWT authentication

router.post('/register', authController.register);

router.get('/books', passport.authenticate('jwt', { session: false }), booksController.books);
// router.get('/user/:userid/books', booksController.allBooks);

module.exports = router;