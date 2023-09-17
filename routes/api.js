var express = require('express');
var router = express.Router();
const passport = require("passport");

const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

// AUTHENTICATION CONTROLLER
router.post('/register', authController.register);
router.post('/login', authController.login);
// note: Logout route not needed because of JWT authentication

// USER CONTROLLER
router.get('/user/test', passport.authenticate('jwt', { session: false }), userController.test);

// GET all user books - limit to 10?
router.get('/user/:username', passport.authenticate('jwt', {session: false}), userController.get_books);

// POST create new user book
router.post('/user/:username/book', passport.authenticate('jwt', { session: false }), userController.create_book);

// PUT update user book
router.put('/user/:username/book/:bookId', passport.authenticate('jwt', { session: false }), userController.update_book);

// DELETE delete user book
router.delete('/user/:username/book/:bookId', passport.authenticate('jwt', { session: false }), userController.delete_book);

module.exports = router;