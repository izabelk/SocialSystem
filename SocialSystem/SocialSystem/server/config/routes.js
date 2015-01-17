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

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../views', 'index.html'));
    });

    app.route('/api/users').post(controllers.users.postRegister);
    app.route('/api/login').post(auth.login);
    app.route('/api/logout').post(auth.logout);
};