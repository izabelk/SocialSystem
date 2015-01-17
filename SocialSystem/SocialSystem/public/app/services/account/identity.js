'use strict';

app.factory('identity', function ($window, UsersResource) { 
    return {
        currentUser: undefined,
        token: undefined,
        isAuthenticated: function () {
            return !!this.currentUser;
        }
    };
});