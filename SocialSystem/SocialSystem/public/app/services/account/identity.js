'use strict';

app.factory('identity', ['$window', 'UsersResource',
     function ($window, UsersResource) {
    //var user;

        return {
            currentUser: undefined, 
            isAuthenticated: function () {
                return !!this.currentUser;
            }
        };
}]);