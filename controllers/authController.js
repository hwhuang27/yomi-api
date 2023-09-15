const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

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

exports.register = async function(req, res, next){

    return res.status(200).json({ message: 'New user registered'});
};