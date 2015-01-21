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
            error: 'alert-error',
            success: 'alert-success',
            info: 'alert-info',
            warning: 'alert-warning'
        },
        positionClass: '', // I position it properly already. not needed.
        fadeIn : 100, // .3 seconds
        fadeOut: 200, // .3 seconds
        timeOut: 2000, // 2 seconds – set to 0 for “infinite”
        extendedTimeOut: 2000, // 2 seconds more if the user interact with it
        target: 'body'
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
        .when('/post', {
            templateUrl: 'views/partials/post-message.html'
            //controller: 'UsersController'
        })
         .otherwise({
        redirectTo: '/'
    });
});

//app.run(function ($rootScope, $window, notifier) {
//    $rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
//        if (rejection === 'not authorized') {
//            notifier.error('You are not authorized!');
//            $window.history.back();
//        }
//    });
//});