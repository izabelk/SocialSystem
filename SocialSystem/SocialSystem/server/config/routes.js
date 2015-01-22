var auth = require('./auth'),
    controllers = require('../controllers'),
    path = require('path');

module.exports = function (app) {
    app.get('/views/partials/:name', function (req, res) {
        var name = req.params.name;
        res.sendFile(path.join(__dirname, '../../public/app/views/partials', name));
    });
    
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '../views', 'index.html'));
    });
    
    app.route('/api/users')
        .post(controllers.users.postRegister)
        .get(controllers.users.getAllUsers);
    
    app.route('/api/users/followed').get(controllers.users.getUsersToFollow);
    
    app.route('/api/users/unfollowed').get(controllers.users.getUsersToUnfollow);
    
    app.route('/api/users/follow-user/:id')
        .post(controllers.users.followUser);
    
    app.route('/api/users/stop-follow-user/:id')
        .post(controllers.users.stopFollowUser);
    
    app.route('/api/user')
        .get(controllers.users.getCurrentUser);

    app.route('/api/messages')
        .post(controllers.messages.postMessage)
        .get(controllers.messages.getMessages);

    app.route('/api/login').post(auth.login);
    app.route('/api/logout').post(auth.logout);

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../views', 'index.html'));
    });
};