const User = require("../models/user");
const Message = require("../models/book");
const asyncHandler = require('express-async-handler');

exports.test = asyncHandler(async (req, res, next) => {
    return res.status(200).json({
        message: `protected route accessed.`,
    });
});

exports.get_books = asyncHandler(async (req, res, next) => {
    return res.status(200).json({
        message: `GET: protected route accessed.`,
    });
});

exports.create_book = asyncHandler(async (req, res, next) => {
    return res.status(200).json({
        message: `POST: protected route accessed.`,
    });
});

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
