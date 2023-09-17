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
                message: 'ERROR: Create book failed, invalid fields',
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
                    message: `Book created successfully.`,
                    result,
                });
            }
    }),
]

exports.update_book = asyncHandler(async (req, res, next) => {
    return res.status(200).json({
        message: `PUT: protected route accessed.`,
    });
});

exports.delete_book = asyncHandler(async (req, res, next) => {
    return res.status(200).json({
        message: `DELETE: protected route accessed.`,
    });
});
