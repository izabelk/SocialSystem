'use strict';

app.controller('HomeController', ['$scope', '$location', 'identity', 'auth', 'notifier',
     function ($scope, $location, identity, auth, notifier) { 
    $scope.auth = auth;

    $scope.redirectToRegister = redirectToRegister;
    $scope.redirectToLogin = redirectToLogin;
    $scope.logout = logout;

    function redirectToRegister() {
        $location.path('/register');
    }

    function redirectToLogin() {
        $location.path('/login');
    }

    function logout() {
        auth.logout()
        .then(function (response) {
            notifier.success("Successful logout!")
        }, function (err) {
            notifier.error("An error occured during logout.");
        });
    }
}]);