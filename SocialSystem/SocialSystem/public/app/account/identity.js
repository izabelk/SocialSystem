'use strict';

app.factory('identity', function ($window, UsersResource) {
    var user;
    var token;
 
    if ($window.bootstrappedUserObject) {
        user = new UsersResource();
        angular.extend(user, $window.bootstrappedUserObject);
    }
    return {
        currentUser: user,
        token: token,
        isAuthenticated: function () {
            return !!this.currentUser;
        }
    };
});