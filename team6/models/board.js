var mongoose = require("mongoose");

var boardSchema = mongoose.Schema({
    writer: String,
    title: String,
    contents: String,
    comments: [{
        name: String,
        memo: String,
        date: { type: Date, default: Date.now }
    }],
    count: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
    updated: [{ contents: String, date: { type: Date, default: Date.now } }],
    deleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('BoardContents', boardSchema);