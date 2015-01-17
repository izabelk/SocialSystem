var Message = require('mongoose').model('Message');

var CONTROLLER_NAME = 'messages';

module.exports = {
	getMessages: function(req, res, next) {
		console.log(req.user);

		res.send({
			messages: [] 
		});
	}
};