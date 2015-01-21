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
                        res.send({ success: true });
                    }
                })
            });
        }
    },
    getAllUsers: function (req, res, next) {
        User.find({}, function (err, userData) {
            if (err) {
                console.log("Error getting all users: " + err);
            }
            else {
                res.send(userData);
            }
        });
    },
    getUsersToFollow: function (req, res, next) {
        var currentUser = req.user;
        if (currentUser) {
             User.find({ $and: [ { _id: { $not: { $in: currentUser.followedUsers } } },
                                 { _id: { $ne: currentUser._id } }] }, function (err, userData) {
                if (err) {
                    console.log("Error getting users to follow: " + err);
                }
                else {
                    res.send(userData);
                }
            });
        } else {
            res.status(403).end();
        }
    },

    getUsersToUnfollow: function (req, res, next) {
        console.log('in  unfollow');
        var currentUser = req.user;
        if (currentUser) {
            User.find({
                $and: [ { _id: { $in: currentUser.followedUsers }},
                               { _id: { $ne: currentUser._id } }]
            }, function (err, userData) {
                if (err) {
                    console.log("Error getting users to unfollow: " + err);
                }
                else {
                    console.log(userData);
                    res.send(userData);
                }
            });
        } else {
            res.status(403).end();
        }
    },
    followUser: function (req, res, next) {
        var currentUser = req.user;
        
        if (currentUser) {
            var id = req.params.id;
            if (id) {
                User.findOne({ _id: id }, function (err, userToFollow) {
                    if (err) {
                        console.log("Error getting user to follow");
                    }
                    else {
                        User.update({ _id: currentUser._id }, { $push: { followedUsers: userToFollow._id } },
                             function (error, num) {
                            if (error) {
                                console.log(error);
                            }
                        });
                        res.send({ success: true });
                    }
                });
            }
        }
        else {
            res.status(403).end();
        }
    },
    stopFollowUser: function (req, res, next) {
        var currentUser = req.user;
        
        if (currentUser) {
            var id = req.params.id;
            if (id) {
                User.findOne({ _id: id }, function (err, userToFollow) {
                    if (err) {
                        console.log("Error getting user to strop follow");
                    }
                    else {
                        User.update({ _id: currentUser._id }, { $pull: { followedUsers: userToFollow._id } },
                             function (error, num) {
                            if (error) {
                                console.log(error);
                            }
                        });
                        res.send({ success: true });
                    }
                });
            }
        }
        else {
            res.status(403).end();
        }
    },

    getCurrentUser: function (req, res, next) {
        var currentUser = req.user;
        if (currentUser) {
            res.send(currentUser);
        } else {
            res.status(403).end();
        }
    }

};