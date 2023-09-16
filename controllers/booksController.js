const User = require("../models/user");
const Message = require("../models/book");
const asyncHandler = require('express-async-handler');

exports.books = asyncHandler(async (req, res, next) => {
    return res.status(200).json({
        message: `protected route accessed.`,
    });
});
