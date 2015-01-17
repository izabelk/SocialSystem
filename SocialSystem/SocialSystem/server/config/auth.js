var passport = require('passport');

module.exports = {
    login: function (req, res, next) {
        var auth = passport.authenticate('local', function (err, user) {
            if (err) return next(err);
            if (!user) {
                res.send({ success: false }); // TODO: Show error to user 
            }
            
            req.logIn(user, function (err) {
                console.log(err);
                if (err) {
                    return next(err);
                }

                res.send({success: true, user: user});
            })
        });
        
        if (!req.body.username && req.body.email) {
            req.body.username = req.body.email;
        }
        
        auth(req, res, next);
    },
    logout: function (req, res, next) {
        req.logout();
        res.send({ success: true });
    },
    isAuthenticated: function (req, res, next) { // TODO: Show error to user 
        if (!req.isAuthenticated()) {
            res.status(403).send('Access denied.');
        }
        else {
            next();
        }
    }
};