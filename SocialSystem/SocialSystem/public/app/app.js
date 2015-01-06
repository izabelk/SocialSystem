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
    
    //$routeProvider
    //    .when('/', {
    //    templateUrl: '/partials/main/home',
    //    controller: 'MainCtrl'
    //})
    //    .when('/login', {
    //    templateUrl: '/partials/account/login',
    //    controller: 'LoginCtrl'
    //})
    //    .when('/users/:id', {
    //    templateUrl: '/partials/users/user-details',
    //    controller: 'UserDetailsCtrl'
    //})
    //    .when('/inbox', {
    //    templateUrl: '/partials/messages/inbox',
    //    controller: 'InboxCtrl',
    //    resolve: routeUserChecks.authenticated
    //})
    //    .when('/send-message/:username', {
    //    templateUrl: '/partials/messages/send-message-form',
    //    controller: 'SendMessageCtrl',
    //    resolve: routeUserChecks.authenticated
    //})
    //    .when('/signup', {
    //    templateUrl: '/partials/account/signup',
    //    controller: 'SignUpCtrl'
    //})
});

//app.run(function ($rootScope, $window, notifier) {
//    $rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
//        if (rejection === 'not authorized') {
//            notifier.error('You are not authorized!');
//            $window.history.back();
//        }
//    });
//});