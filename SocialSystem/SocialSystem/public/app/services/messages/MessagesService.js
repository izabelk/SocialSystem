'use strict';

app.factory('MessagesService', ['$http', '$q', 'baseServiceUrl',
     function ($http, $q, baseServiceUrl) {
    
    var messagesApi = baseServiceUrl + '/api/messages',
        filteredMessagesApi = baseServiceUrl + '/api/filteredMessages';

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
    
    var getMessages = function () {
        var deferred = $q.defer();
        
        $http.get(messagesApi)
        .success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        
        return deferred.promise;
    }
    
    var getFilteredMessages = function (filters) {
        var deferred = $q.defer(),
            tagsQuery = '',
            filtersCount = filters.length;

        if (filtersCount > 0) {
            tagsQuery += '?';
        }
        for (var i = 0; i < filtersCount; i++) {
            if (i > 0) {
                tagsQuery += '&';
            }

            tagsQuery += 'filters=' + filters[i];
        }

        
        $http.get(filteredMessagesApi + tagsQuery)
        .success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        
        return deferred.promise;
    }
    
    return {
        postMessage: postMessage,
        getMessages: getMessages,
        getFilteredMessages: getFilteredMessages
    };
}]);