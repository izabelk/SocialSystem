'use strict';

app.factory('auth', ['$http', '$q', 'identity', 'UsersResource', 'UsersService',
     function ($http, $q, identity, UsersResource, UsersService) {
        var AUTH_ROUTES = [
            '/users',
            '/newsfeed'
        ];

        function routeRequiresAuth(url) {
            var routesCount = AUTH_ROUTES.length,
                i = 0;
            for (i = 0; i < routesCount; i++) {
                if (AUTH_ROUTES[i] === url) {
                    return true;
                }
            }
            return false;
        }
    
    return {
        loadCurrentUser: function () {
            return UsersService.getCurrentUser()
                    .then(function (user) {
                        identity.currentUser = user;
                    }, function (error) {
                        console.log("Error getting the current user.");
                    })
                    .finally(function () {
                        $rootScope.$on('$routeChangeStart', function (event, next, current) {
                            if (routeRequiresAuth($location.url()) && !auth.isAuthenticated()) {
                                notifier.info('Please login.');
                                $location.path('/login');
                            }
                        });
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
}]);