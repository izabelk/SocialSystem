'use strict';

app.controller('NavController', function ($scope, auth, notifier) {

    $scope.isAuthenticated = function (){
        return auth.isAuthenticated();
    }

    $scope.logout = function() {
        auth.logout()
        .then(function (response) {
            notifier.success("Successful logout!")
        }, function (err) {
            notifier.error("An error occured during logout.");
        });
    }
});