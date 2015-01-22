'use strict';

var app = angular.module('app', ['ngResource', 'ngRoute'])
                 .value('toastr', toastr)
                 .constant('baseServiceUrl', 'http://localhost:3000')

app.config(function ($routeProvider, $locationProvider) {
    
    //var routeUserChecks = {
    //    authenticated: {
    //        authenticate: function (auth) {
    //            return auth.isAuthenticated();
    //        }
    //    }
    //};
    
    toastr.options = {
        toastClass: 'alert',
        iconClasses: {
            error: 'alert-danger',
            success: 'alert-success',
            info: 'alert-info',
            warning: 'alert-warning'
        },
        positionClass: 'toast-top-left', // I position it properly already. not needed.
        fadeIn : 100, // .3 seconds
        fadeOut: 200, // .3 seconds
        timeOut: 2000, // 2 seconds – set to 0 for “infinite”
        extendedTimeOut: 2000, // 2 seconds more if the user interact with it
        target: 'body',
    };
    
    $routeProvider
        .when('/', {
            templateUrl: 'views/partials/home.html',
            controller: 'HomeController'
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

app.run(function ($rootScope, $window, notifier, auth) {
    auth.loadCurrentUser();
});