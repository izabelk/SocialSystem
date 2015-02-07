var Message = require('mongoose').model('Message');
var User = require('mongoose').model('User');

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
                    res.status(500).send('Failed to create the message.');
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
            })
            .sort({ 'date': -1 })
            .limit(50)
            .populate('author', 'username')
            .exec(function (err, messages) {
                if (err) {
                    res.status(500).send('Failed to get messages');
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
        var currentUser = req.user;
        if (currentUser) {
            var filters = req.query.filters;
            
            if (filters && !(filters instanceof Array)) {
                filters = [filters];
            }
            
            if (!filters || filters.length === 0) {
                Message.find({
                    author: { $in: currentUser.followedUsers }
                })
	            .sort({ 'date': -1 })
	            .limit(50)
	            .populate('author', 'username')
	            .exec(function (err, messages) {
                    if (err) {
                        res.status(500).send('Failed to get messages');
                    } else {
                        res.status(200).send(messages);
                    }
                });
            } else {
                var searchText = '',
                    filtersCount = filters.length;
                
                for (i = 0; i < filtersCount; i++) {
                    if (i > 0) {
                        searchText += ' ';
                    }
                    
                    searchText += '"#' + filters[i] + '"';
                }
                
                Message.textSearch(searchText, function (err, output) {
                    if (err || !output.results) {
                        res.status(500).send('Failed to get messages.');
                    } else {
                        var result = [],
                            authorNames = [],
                            resultsCount = output.results.length;

                        for (i = 0; i < resultsCount; i++) {

                            result.push(output.results[i].obj);

                            User.findOne({ _id: output.results[i].obj.author })
                            .exec(function (err, user) {
                                if (err) {
                                    res.status(500).send('Failed to load author for filtered messages.');
                                } else {
                                    authorNames.push(user.username);
                                    //Executed third! 
                                    console.log(authorNames);
                                }
                            });
                        }
                        
                        //Executed first! 
                        console.log(authorNames); // authorNames : []
                        for (var i = 0; i < authorNames.length; i++) {
                            result[i].author = authorNames[i];
                        }
                        //Executed second! 
                        console.log(result);

                        res.status(200).send(result);
                    }
                });
            }
        }
        else {
            res.status(403).end();
        }
    }
};