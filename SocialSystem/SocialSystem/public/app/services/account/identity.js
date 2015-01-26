'use strict';

app.factory('identity', ['$window', 'UsersResource',
     function ($window, UsersResource) { 
    return {
        currentUser: undefined, 
        isAuthenticated: function () {
            return !!this.currentUser;
        }
    };
}]);