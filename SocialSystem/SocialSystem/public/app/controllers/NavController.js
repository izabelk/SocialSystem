'use strict';

app.controller('NavController', function ($scope, auth, identity, notifier) {

    $scope.isAuthenticated = function (){
        return auth.isAuthenticated();
    }
    
    $scope.getCurrentUser = function () {
        if (identity.currentUser) {
            return identity.currentUser.username;
        }
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