var Message = require('mongoose').model('Message');

var CONTROLLER_NAME = 'messages';

module.exports = {
    postMessage: function (req, res, next) {
        var currentUser = req.user;
        if (currentUser) {
            var message = req.body;
            message.date = new Date();
            message.author = req.user._id;
            
            Message.create(message, function (err, message) {
                if (err) {
                    console.log('Failed to post message: ' + message);
                    res.status(500).end();
                } else {
                    res.status(200).end();
                }
            });
        } else {
            res.status(403).end();
        }
    },
    
    getMessages: function (req, res, next) {
        var currentUser = req.user;
        if (currentUser) {
            Message.find({
                author: { $in: currentUser.followedUsers }
            }).sort({ 'date': -1 }).limit(50).populate('author', 'username').exec(function (err, messages) {
                if (err) {
                    res.status(500).end();
                } else {
                    res.status(200).send(messages);
                }
            });
        } 
        else {
            res.status(403).end();
        }
    },
    
    getMessagesByHashTag: function (req, res, next) {
        var tags = req.params.tag.split('&');
        
        for (var i in tags) {
            tags[i] = "#" + tags[i];
        }
        
        Message.find({ content: { $in: tags } }, 
            function (err, filteredMessages) {
            if (err) {
                res.status(500).send("Error getting messages by " + tag);
            }
            else {
                //console.log(filteredMessages);
                res.send(filteredMessages);
            }
        });
    }
};