'use strict';

var app = angular.module('app', ['ngResource', 'ngRoute', 'ngSanitize'])
                 .value('toastr', toastr)
                 .constant('baseServiceUrl', 'http://localhost:3000')

app.config(function ($routeProvider, $locationProvider) {
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
            controller: 'UsersController'
        })
        .when('/newsfeed', {
            templateUrl: 'views/partials/newsfeed.html',
            controller: 'MessagesController'
        })
         .otherwise({
        redirectTo: '/'
    });
});

app.run(function ($rootScope, $window, $location, notifier, auth) {
    auth.loadCurrentUser();

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

    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        console.log($location.url());
        if (routeRequiresAuth($location.url()) && !auth.isAuthenticated()) {
            notifier.info('Please login.');
            $location.path('/login');
        }
    });
});