var Message = require('mongoose').model('Message');

var CONTROLLER_NAME = 'messages';

module.exports = {
	postMessage: function(req, res, next) {
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

	getMessages: function(req, res, next) {
	}
};