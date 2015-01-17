﻿'use strict';

app.factory('auth', function ($http, $q, identity, UsersResource) {
    
    return {
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
                    identity.token = response.token;
                    identity.socket = connect(response.token);
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