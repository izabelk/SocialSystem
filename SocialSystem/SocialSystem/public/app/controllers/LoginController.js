'use strict';

app.controller('LoginController', ['$scope', '$location', 'notifier', 'identity', 'auth',
     function ($scope, $location, notifier, identity, auth) {

    $scope.identity = identity;

    $scope.login = function(user, loginForm) {
        if (loginForm.$valid) {
            auth.login(user).then(function(success) {
                if (success) {
                    notifier.success('Successful login!');
                    $location.path('/');
                }
                else {
                    notifier.error('Invalid username or password.');
                }
            });
        }
        else {
            notifier.error('Username and password are required.')
        }
    }

    $scope.logout = function() {
        auth.logout().then(function() {
            notifier.success('Successful logout!');
            if ($scope.user) {
                $scope.user.email = '';
                $scope.user.username = '';
                $scope.user.password = '';
            }
            
            $location.path('/');
        })
    }
}])