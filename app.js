require('dotenv').config();
require('./passport/passport.js');

const express = require('express');
const path = require('path');
const passport = require("passport");
const logger = require('morgan');

// routes
const apiRouter = require('./routes/api');

// database
const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URI;
main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
    console.log(`Connected to MongoDB`);
}

var app = express();

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/api', apiRouter);

module.exports = app;
