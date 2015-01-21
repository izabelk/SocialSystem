'use strict';

app.factory('auth', function ($http, $q, identity, UsersResource, UsersService) {
    
    return {
        loadCurrentUser: function () {
            return UsersService.getCurrentUser()
                    .then(function (user) {
                        console.log(user);
                        identity.currentUser = user;
                    }, function (error) {
                        // TODO: handle error.
                    });
        },

        signup: function (user) {
            var deferred = $q.defer();
            
            user = new UsersResource(user);
            user.$save().then(function () {
                identity.currentUser = user;
                deferred.resolve();
            }, function (response) {
                deferred.reject(response);
            });
            
            return deferred.promise;
        },
        login: function (user) {
            var deferred = $q.defer();
            
            $http.post('/api/login', user).success(function (response) {
                if (response.success) {
                    var user = new UsersResource();
                    angular.extend(user, response.user);
                    identity.currentUser = user;
                    deferred.resolve(true);
                }
                else {
                    deferred.resolve(false);
                }
            });
            
            return deferred.promise;
        },
        logout: function () {
            var deferred = $q.defer();

            $http.post('/api/logout').success(function () {
                identity.currentUser = undefined;
                deferred.resolve();
            });
            
            return deferred.promise;
        },
        isAuthenticated: function () {
            return identity.isAuthenticated();
        }
    };
});