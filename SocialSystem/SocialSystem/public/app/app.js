'use strict';

var app = angular.module('app', ['ngResource', 'ngRoute'])
                 .value('toastr', toastr);

app.config(function ($routeProvider) {
    
    //var routeUserChecks = {
    //    authenticated: {
    //        authenticate: function (auth) {
    //            return auth.isAuthenticated();
    //        }
    //    }
    //};
    
    $routeProvider
        .when('/', {
            template: '<h1>Sasho</h1>'
    })
        .when('/register', {
            templateUrl: 'views/partials/register.html',
            controller: 'RegisterController'

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