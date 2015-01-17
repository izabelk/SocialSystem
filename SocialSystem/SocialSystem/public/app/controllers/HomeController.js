'use strict';

app.controller('HomeController', ['$scope', '$location', 'identity', 'auth', function ($scope, $location, identity, auth) {
    $scope.auth = auth;

    $scope.redirectToRegister = redirectToRegister;
    $scope.redirectToLogin = redirectToLogin;


    function redirectToRegister() {
        $location.path('/register');
    }

    function redirectToLogin() {
        $location.path('/login');
    }
}]);