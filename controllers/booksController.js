const User = require("../models/user");
const Book = require("../models/book");
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator')

exports.get_books = asyncHandler(async (req, res, next) => {
    
    const books = await Book.find({ user: req.user._id }).sort({ date_added: -1 });
    
    return res.status(200).json({
        message: `GET books from user: ${req.user.username}`,
        books,
    });
});

exports.create_book = [
    body("title")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Title must be specified."),
    body("author")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Author must be specified."),
    body("notes")
        .trim()
        .escape(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({
                message: 'ERROR: Create book failed',
                errors: errors.array(),
            });
        } else {
                const book = new Book({
                    user: req.user._id,
                    title: req.body.title,
                    author: req.body.author,
                    notes: req.body.notes,
                    status: req.body.status,
                    rating: req.body.rating,
                });
                const result = await book.save();

                res.status(200).json({
                    message: `Book created successfully for user: ${req.user.username}`,
                    result,
                });
            }
    }),
]

exports.update_book = [
    body("title")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Title must be specified."),
    body("author")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Author must be specified."),
    body("notes")
        .trim()
        .escape(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({
                message: 'ERROR: Update book failed',
                errors: errors.array(),
            });
        } else {
            // check if the correct user is editing the book
            const book = await Book.findById(req.params.bookId);
            if(book.user.toString() !== req.user._id){
                res.status(403).json({
                    message: `User not authorized to edit this book`,
                });
            } else {
                const updatedBook = new Book({
                    _id: req.params.bookId,
                    user: req.user._id,
                    title: req.body.title,
                    author: req.body.author,
                    notes: req.body.notes,
                    status: req.body.status,
                    rating: req.body.rating,
                });
                const oldBook = await Book.findByIdAndUpdate(req.params.bookId, updatedBook, {});

                res.status(200).json({
                    message: `Book updated successfully from user: ${req.user.username}`,
                    oldBook,
                });
            }
        }
    }),
]

exports.delete_book = asyncHandler(async (req, res, next) => {
    return res.status(200).json({
        message: `DELETE: protected route accessed.`,
    });
});
