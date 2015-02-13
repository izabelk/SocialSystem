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
                            authorIds = [],
                            resultsCount = output.results.length;

                        for (i = 0; i < resultsCount; i++) {

                        	// We need toObject() method call in order to get a normal JS object instead of Mongoose model entity.
                        	// The plain JS object can be modified.
                            result.push(output.results[i].obj.toObject()); 
                            authorIds.push(output.results[i].obj.author);
                        }

                        User.find({
                        	_id: {
                        		$in: authorIds
                        	}
                        }, function(err, users) {
                        	if (err) {
                        		res.status(500).send('Failed to load authors data');
                        	} else {
                        		var idToAuthorMapping = {},
                        		 	usersCount = users.length,
                        		 	i;

                        		for (i = 0; i < usersCount; i++) {
                        			idToAuthorMapping[users[i]._id] = { 
                        				_id: users[i]._id,
                        				username: users[i].username
                        			};
                        		}

                        		for (i = 0; i < resultsCount; i++) {
                        			var authorId = result[i].author;

                        			result[i].author = idToAuthorMapping[authorId];
                        		}

                        		result.sort(function(a, b) {
                        			return b.date - a.date;
                        		});                        		

		                        res.status(200).send(result);
                        	}
                        });
                    }
                });
            }
        }
        else {
            res.status(403).end();
        }
    }
};