var express = require('express');
var router = express.Router();
const passport = require("passport");

const authController = require("../controllers/authController");
const booksController = require("../controllers/booksController");

// AUTHENTICATION CONTROLLER
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/verify', authController.verify);

// BOOK CONTROLLER

// GET all User books
router.get('/books', passport.authenticate('jwt', {session: false}), booksController.get_books);

// POST create new Book for User
router.post('/books', passport.authenticate('jwt', { session: false }), booksController.create_book);

// GET one User book
router.get('/books/:bookId', passport.authenticate('jwt', { session: false }), booksController.get_book);

// PUT update existing Book for User
router.put('/books/:bookId', passport.authenticate('jwt', { session: false }), booksController.update_book);

// DELETE delete existing Book for User
router.delete('/books/:bookId', passport.authenticate('jwt', { session: false }), booksController.delete_book);

module.exports = router;