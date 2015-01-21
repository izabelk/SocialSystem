var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');

module.exports = function () {
    passport.use(new LocalStrategy(function (email, password, done) { 
        User.findOne({ email: email }, function(err, user) {
          if (err) { return done(err); }
          if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
          }
          if (!user.authenticate(password)) {
            return done(null, false, { message: 'Incorrect password.' });
          }

          return done(null, user);
        });

    }));
    
    passport.serializeUser(function (user, done) {
        if (user) {
            return done(null, user._id);
        }
    });
    
    passport.deserializeUser(function (id, done) {
        User.findOne({ _id: id }).exec(function (err, user) {
            if (err) {
                console.log('Error loading user: ' + err);
                return;
            }
            
            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        })
    });
};