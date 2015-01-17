'use strict';

var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption');

var User;

module.exports.init = function () {
    var userSchema = mongoose.Schema({
        username: { type: String, require: '{PATH} is required', unique: true },
        email: { type: String, require: '{PATH} is required', unique: true },
        salt: String,
        hashPass: String,
        registeredOn: Date,
        followedUsers: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
        messages: [mongoose.model('Message').schema],
        verified: Boolean
    });
    
    userSchema.method({
        authenticate: function (password) {
            return encryption.generateHashedPassword(this.salt, password) === this.hashPass;
        }
    });
    
    User = mongoose.model('User', userSchema);
};

function addPassword(user) {
    var salt = encryption.generateSalt();
    var hashedPwd = encryption.generateHashedPassword(salt, user.username);
    user.salt = salt;
    user.hashPass = hashedPwd;
}

module.exports.seedInitialUsers = function (callback) {
    
    User.count({}, function (err, count) {
        if (err) {
            return console.log(err);
        }
        
        // if db is empty or we are in development mode -> seed
        if (count == 0 || !process.env.NODE_ENV) {
            seed(callback);
        }
    });
};

function seed(callback) {
    //User.remove({}, function (err) {
    //    if (err) return console.log(err);
        
    //    var users = require('./users.json');
    //    users.forEach(function (user) {
    //        addPassword(user);
    //    });
        
    //    User.create(users, function (err) {
    //        if (err) return console.log(err);
            
    //        console.log('Database seeded with users...');
            
    //        if (typeof (callback) === "function") {
    //            callback();
    //        }
    //    });
    //});
}