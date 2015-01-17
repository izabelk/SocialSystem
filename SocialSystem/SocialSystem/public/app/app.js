'use strict';

var app = angular.module('app', ['ngResource', 'ngRoute'])
                 .value('toastr', toastr);

app.config(function ($routeProvider, $locationProvider) {
    
    //var routeUserChecks = {
    //    authenticated: {
    //        authenticate: function (auth) {
    //            return auth.isAuthenticated();
    //        }
    //    }
    //};
    
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