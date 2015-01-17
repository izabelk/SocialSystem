'use strict';

app.controller('HomeController', ['$scope', 'identity', 'auth', function ($scope, identity, auth) { 
    $scope.auth = auth;
}]);