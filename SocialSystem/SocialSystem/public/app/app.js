'use strict';

var app = angular.module('app', ['ngResource', 'ngRoute', 'ngSanitize'])
                 .value('toastr', toastr)
                 .constant('baseServiceUrl', 'http://localhost:3000')

app.config(function ($routeProvider, $locationProvider) {
    
    var loginRequired = function ($location, $q, auth, notifier) {

        var deferred = $q.defer();
        
        if (auth.isAuthenticated()) {
            deferred.resolve();
        } 
        else {
            deferred.reject();
            notifier.info('Please login.');
            $location.path('/login');
        }
        
        return deferred.promise;
    }
        
    $routeProvider
        .when('/', {
            templateUrl: 'views/partials/home.html'
        })
        .when('/register', {
            templateUrl: 'views/partials/register.html',
            controller: 'RegisterController'
        })
        .when('/login', {
            templateUrl: 'views/partials/login.html',
            controller: 'LoginController'
        })
        .when('/users', {
            templateUrl: 'views/partials/users.html',
            controller: 'UsersController',
            resolve: { loginRequired: loginRequired }
        })
        .when('/newsfeed', {
            templateUrl: 'views/partials/newsfeed.html',
            controller: 'MessagesController',
            resolve: { loginRequired: loginRequired }
        })
         .otherwise({
        redirectTo: '/'
    });
});

app.run(function ($rootScope, $window, notifier, auth) {
    auth.loadCurrentUser();
    //$rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
    //    if (rejection === 'not authorized') {
    //        notifier.error('You are not authorized!');
    //        $window.history.back();
    //    }
    //});
});