'use strict';

app.factory('UsersService', function ($http, $q, baseServiceUrl) {
    
    var usersApi = baseServiceUrl + '/api/users',
        userApi = baseServiceUrl + '/api/user';
    
    var getCurrentUser = function () {
        var deferred = $q.defer();

        $http.get(userApi)
        .success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
    }

    var getAllUsers = function () {
        var deferred = $q.defer();
        
        $http.get(usersApi)
        .success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        
        return deferred.promise;
    };
    
    var getUsersToFollow = function () {
        var deferred = $q.defer();
        
        $http.get(usersApi + '/tofollow')
        .success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        
        return deferred.promise;
    };
    
    var getUsersToUnfollow = function () {
        var deferred = $q.defer();
        
        $http.get(usersApi + '/followed')
        .success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        
        return deferred.promise;
    }
    
    var followUser = function (id) {
        var deferred = $q.defer();
        
        $http.post(usersApi + '/follow-user/' + id)
        .success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        
        return deferred.promise;
    };
    
    var stopFollowUser = function (id) {
        var deferred = $q.defer();
        
        $http.post(usersApi + '/stop-follow-user/' + id)
        .success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        
        return deferred.promise;
    };
    
    return {
        getAllUsers: getAllUsers,
        followUser: followUser,
        stopFollowUser: stopFollowUser,
        getUsersToFollow: getUsersToFollow,
        getUsersToUnfollow: getUsersToUnfollow,
        getCurrentUser: getCurrentUser
    };
});