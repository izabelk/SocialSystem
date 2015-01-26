'use strict';

app.factory('UsersResource', ['$resource', '$http', '$q', 'baseServiceUrl',
     function ($resource, $http, $q, baseServiceUrl) {
    var UsersResource = $resource('/api/users/:id', { _id: '@id' }, { update: { method: 'PUT', isArray: false } });
    
    return UsersResource;
}]);