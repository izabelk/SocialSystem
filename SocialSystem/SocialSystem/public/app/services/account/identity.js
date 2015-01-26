'use strict';

app.factory('identity', function ($window, UsersResource) { 
    return {
        currentUser: undefined, 
        isAuthenticated: function () {
            return !!this.currentUser;
        }
    };
});