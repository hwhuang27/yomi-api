var express = require('express');
var router = express.Router();
const passport = require("passport");

const authController = require("../controllers/authController");
const bookController = require("../controllers/bookController");

// AUTHENTICATION CONTROLLER
router.post('/register', authController.register);
router.post('/login', authController.login);
// logout route - clear localstorage?

// BOOK CONTROLLER
// GET all User books
router.get('/books', passport.authenticate('jwt', {session: false}), bookController.get_books);

// POST create new Book for User
router.post('/book', passport.authenticate('jwt', { session: false }), bookController.create_book);

// PUT update existing Book for User
router.put('/book/:bookId', passport.authenticate('jwt', { session: false }), bookController.update_book);

// DELETE delete existing Book for User
router.delete('/book/:bookId', passport.authenticate('jwt', { session: false }), bookController.delete_book);

module.exports = router;