'use strict';

app.factory('MessagesService', function ($http, $q, baseServiceUrl) {
    
    var messagesApi = baseServiceUrl + '/api/messages';

    var getMessages = function() {
        var deferred = $q.defer();
        
        $http.get(messagesApi)
        .success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        
        return deferred.promise;
    }
    
    var postMessage = function (message) {
        var deferred = $q.defer();
        
        $http.post(messagesApi, message)
        .success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        
        return deferred.promise;
    }
    
    return {
        postMessage: postMessage,
        getMessages: getMessages
    };
});