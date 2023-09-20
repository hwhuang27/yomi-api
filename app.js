require('dotenv').config();
require('./passport/passport.js');

const express = require('express');
const path = require('path');
const passport = require('passport');
const logger = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');

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
let corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:3000', 'https://bookshelf-client-eight.vercel.app/'],
    optionsSuccessStatus: 200
}
app.use(helmet());
app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));
app.options('*', cors(corsOptions));

// routes
app.use('/api', cors(corsOptions), apiRouter);

module.exports = app;
