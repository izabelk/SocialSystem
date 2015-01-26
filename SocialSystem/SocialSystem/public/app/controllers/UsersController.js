'use strict';

app.controller('UsersController', ['$scope', 'UsersService', 'identity',
    function UsersController($scope, UsersService, identity) {
     
    $scope.usersToFollow;
    $scope.usersToUnfollow;
    
    UsersService.getUsersToFollow()
      .then(function (response) {
        console.log(response);
        $scope.usersToFollow = response;
    }, function (err) {
        notifier.error(err.error_description);
    });
    
    UsersService.getUsersToUnfollow()
      .then(function (response) {
        $scope.usersToUnfollow = response;
    }, function (err) {
        notifier.error(err.error_description);
    });
    
    $scope.followUser = function (user) {
        UsersService.followUser(user._id)
        .then(function (response) {
            $scope.usersToUnfollow.push(user);
            var index = $scope.usersToFollow.indexOf(user);
            if (index > -1) {
                $scope.usersToFollow.splice(index, 1);
            }

        }, function (err) {
            notifier.error(err.error_description);
        });
    }
    
    $scope.stopFollowUser = function (user) {
        UsersService.stopFollowUser(user._id)
        .then(function (response) {
            $scope.usersToFollow.push(user);
            var index = $scope.usersToUnfollow.indexOf(user);
            if (index > -1) {
                $scope.usersToUnfollow.splice(index, 1);
            }
        }, function (err) {
            notifier.error(err.error_description);
        });
    }
    
}]);