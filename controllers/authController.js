const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { body, validationResult } = require('express-validator')
const asyncHandler = require('express-async-handler');

exports.login = async function (req, res, next){
    try {
        passport.authenticate('local', {session: false}, (err, user, info) => {
            // user not found -> return 403
            if( err || !user){
                return res.status(403).json({
                    info,
                });
            }
            // user found -> login & create jwt
            req.login(user, {session: false}, (err) => {
                if(err){
                    next(err);
                }
                // create token
                const body = { _id: user._id, username: user.username };
                const token = jwt.sign(body, process.env.SECRET_KEY, {expiresIn: '1d'});
                
                return res.status(200).json({ body, token });
            });
        }) (req, res, next);
    } catch (err) {
        res.status(403).json({
            err,
        })
    }
};
exports.register = async function (req, res, next) {
    return res.status(200).json({ message: 'New user registered' });
};

exports.register = [
    // Validate and sanitize fields.
    body("first_name")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("First name must be specified."),
    body("last_name")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Last name must be specified."),
    body("username")
        .trim()
        .isLength({ min: 2 })
        .escape()
        .withMessage("Username must be specified.")
        .custom(async (value) => {
            const user = await User.findOne({username: value});
            if(user){
                throw new Error('Username is already in use');
            }
        }),
    body("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters.')
        .escape(),
    body('confirm-password').custom((value, { req }) => {
        return value === req.body.password;
    }),
    // Process request after validation and sanitization
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({
                message: 'Error when registering',
                username: req.body.username,
                errors: errors.array(),
            });
            // return;
        } else {
            bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
                if (err) {
                    throw new Error("Password failed to hash.");
                }

                const user = new User({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    username: req.body.username,
                    password: hashedPassword,
                });
                const result = await user.save();

                res.status(200).json({
                    message: `User created successfully.`,
                    user,
                })
            });
        }
    }),
]

