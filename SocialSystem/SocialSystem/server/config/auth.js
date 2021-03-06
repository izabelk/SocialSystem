﻿var passport = require('passport');

module.exports = {
    login: function (req, res, next) {
        var auth = passport.authenticate('local', function (err, user) {
            if (err) return next(err);
            if (!user) {
                res.send({ success: false }); 
            }
            
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                else {
                    res.send({ success: true, user: user });
                }
            })
        });
        
        if (!req.body.username && req.body.email) {
            req.body.username = req.body.email;
        }
        
        auth(req, res, next);
    },
    logout: function (req, res, next) {
        console.log(req.user);
        req.logout();
        res.send({ success: true });
    },
    isAuthenticated: function (req, res, next)
    {
        if (!req.isAuthenticated()) {
            res.status(403).send('Access denied.');
        }
        else {
            next();
        }
    }
};