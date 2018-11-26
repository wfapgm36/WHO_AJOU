var mongoose = require("mongoose");
var autoIncrement = require('mongoose-auto-increment')

autoIncrement.initialize(mongoose.connection)

var boardSchema = mongoose.Schema({
    writer: String,
    title: String,
    contents: String,
    comments: [{
        name: String,
        memo: String,
        createAt: { type: Date, default: Date.now }
    }],
    count: { type: Number, default: 0 },
    createAt: { type: Date, default: Date.now },
    updated: [{ contents: String, date: { type: Date, default: Date.now } }],
    deleted: { type: Boolean, default: false },
    _id: {
        type: Number,
        unique: true
    }
},{
    versionKey:false
});

boardSchema.plugin(autoIncrement.plugin, {
    model: 'Board',
    field: '_id',
    startAt: 1
})

var Board = mongoose.model('Board', boardSchema, 'Boardlist');
module.exports =  Board;