'use strict';

app.factory('UsersResource', function ($resource, $http, $q, baseServiceUrl) {
    var UsersResource = $resource('/api/users/:id', { _id: '@id' }, { update: { method: 'PUT', isArray: false } });
    
    return UsersResource;
});