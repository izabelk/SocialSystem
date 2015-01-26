'use strict';

app.controller('UsersController', ['$scope', 'UsersService', 'identity', 'notifier',
    function UsersController($scope, UsersService, identity, notifier) {
     
    $scope.usersToFollow;
    $scope.followedUsers;
    
    UsersService.getUsersToFollow()
      .then(function (response) {
        $scope.usersToFollow = response;
    }, function (err) {
        notifier.error('Failed to load users to follow.');
    });
    
    UsersService.getFollowedUsers()
      .then(function (response) {
        $scope.followedUsers = response;
    }, function (err) {
        notifier.error('Failed to load followed users');
    });
    
    $scope.followUser = function (user) {
        UsersService.followUser(user._id)
        .then(function (response) {
            $scope.followedUsers.push(user);
            var index = $scope.usersToFollow.indexOf(user);
            if (index > -1) {
                $scope.usersToFollow.splice(index, 1);
            }

        }, function (err) {
            notifier.error('Failed to follow the user.');
        });
    }
    
    $scope.stopFollowUser = function (user) {
        UsersService.stopFollowUser(user._id)
        .then(function (response) {
            $scope.usersToFollow.push(user);
            var index = $scope.followedUsers.indexOf(user);
            if (index > -1) {
                $scope.followedUsers.splice(index, 1);
            }
        }, function (err) {
            notifier.error('Failed to unfollow the user.');
        });
    }
    
}]);