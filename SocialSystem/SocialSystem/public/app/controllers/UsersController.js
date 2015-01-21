'use strict';

app.controller('UsersController',
    function UsersController($scope, UsersService, identity) {
    
    $scope.users;
    //$scope.usersToFollow;
    //$scope.usersToUnfollow;
    
    UsersService.getAllUsers()
      .then(function (response) {
        $scope.users = response;
    }, function (err) {
        notifier.error(err.error_description);
    });
    
    //UsersService.getUsersToFollow()
    //  .then(function (response) {
    //    $scope.usersToFollow = response;
    //}, function (err) {
    //    notifier.error(err.error_description);
    //});
    
    //UsersService.getUsersToUnfollow()
    //  .then(function (response) {
    //    $scope.usersToUnfollow = response;
    //}, function (err) {
    //    notifier.error(err.error_description);
    //});
    
    $scope.followUser = function (id) {
        UsersService.followUser(id)
        .then(function (response) {

        }, function (err) {
            notifier.error(err.error_description);
        });
    }
    
    $scope.stopFollowUser = function (id) {
        UsersService.stopFollowUser(id)
        .then(function (response) {

        }, function (err) {
            notifier.error(err.error_description);
        });
    }
    
});