const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const BookSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, maxLength: 25 },
    author: { type: String, required: true, maxLength: 25 },
    notes: { type: String, maxLength: 500 },
    status: {
        type: String,
        required: true,
        enum: ["Reading", "Finished", "Wishlist", "Dropped"],
        default: "Finished",
    },
    rating: {
        type: String,
        required: true,
        enum: ["-", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        default: "-",
    },
    date_added: { type: Date, default: Date.now },
});

BookSchema.virtual("date_formatted").get(function () {
    return DateTime.fromJSDate(this.date_added).toLocaleString(DateTime.DATETIME_MED);
});

// BookSchema.virtual("url").get(function () {
//     return `book/${this._id}`;
// });

module.exports = mongoose.model("Book", BookSchema);