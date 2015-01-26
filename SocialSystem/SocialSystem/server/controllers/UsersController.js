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
                    res.status(500).send('Failed to register the user.')
                }
                
                req.logIn(user, function (err) {
                    if (err) {
                        res.status(400).end();
                    }
                    else {
                        res.status(200).end();
                    }
                })
            });
        }
    },
    getAllUsers: function (req, res, next) {
        User.find({}, function (err, userData) {
            if (err) {
                res.status(500).end();
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
                    res.status(500).send('Failed to load users to follow.');
                }
                else {
                    res.status(200).send(userData);
                }
            });
        } else {
            res.status(403).end();
        }
    },

    getFollowedUsers: function (req, res, next) {
        var currentUser = req.user;
        if (currentUser) {
            User.find({
                $and: [ { _id: { $in: currentUser.followedUsers }},
                               { _id: { $ne: currentUser._id } }]
            }, function (err, userData) {
                if (err) {
                    res.status(500).send('Failed to load followed users.');
                }
                else {
                    res.status(200).send(userData);
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
                        res.status(500).send('Failed to load the current user.');
                    }
                    else {
                        User.update({ _id: currentUser._id }, { $push: { followedUsers: userToFollow._id } },
                             function (error, num) {
                            if (error) {
                                res.status(500).send('Failed to update the current user.');
                            }
                        });
                        res.status(200).end();
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
                        res.status(500).send('Failed to load the current user.');
                    }
                    else {
                        User.update({ _id: currentUser._id }, { $pull: { followedUsers: userToFollow._id } },
                             function (error, num) {
                            if (error) {
                                res.status(500).send('Failed to update the current user.');
                            }
                        });
                        res.status(200).end();
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
            console.log("IMA USER");
            res.send(currentUser);
        } else {
            console.log("NQMA USER");
            //res.send(null);
            res.status(403).end();
        }
    }
};