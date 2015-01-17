var encryption = require('../utilities/encryption'),
    User = require('mongoose').model('User');

var CONTROLLER_NAME = 'users';

module.exports = {
    postRegister: function (req, res, next) {
        var newUserData = req.body;
        
        if (newUserData.password != newUserData.confirmPassword) {
            req.session.error = 'Passwords do not match!'; 
        }
        else {
            newUserData.salt = encryption.generateSalt();
            newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
            User.create(newUserData, function (err, user) {
                if (err) {
                    console.log('Failed to register new user: ' + err);
                    return;
                }
                
                req.logIn(user, function (err) {
                    if (err) {
                        res.status(400);
                        return res.send({ reason: err.toString() }); // TODO
                    }
                    else {
                        console.log('success register');
                        console.log(user);
                        res.send({success: true});
                    }
                })
            });
        }
    }
};