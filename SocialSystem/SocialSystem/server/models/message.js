'use strict';

var mongoose = require('mongoose'),
    textSearch = require('mongoose-text-search');
var Message;

module.exports.init = function () {
    var messagesSchema = new mongoose.Schema({
        content: { type: String, required: '{PATH} is required', max: 140 },
        date: Date,
        author : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        place: String
    });
    
    messagesSchema.plugin(textSearch);
    messagesSchema.index({ content: 'text' });

    Message = mongoose.model('Message', messagesSchema);
};