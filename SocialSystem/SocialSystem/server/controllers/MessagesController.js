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

            console.log(filters);
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

            		searchText += '"#' + filters[i] +  '"';
            	}

            	console.log(searchText);
            	Message.textSearch(searchText, function(err, output) {
            		if (err || !output.results) {
            			res.status(500).send('Failed to get messages');
            		} else {
            			var result = [],
            				resultsCount = output.results.length;
            			for (i = 0; i < resultsCount; i++) {
            				result.push(output.results[i].obj);
            			}

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