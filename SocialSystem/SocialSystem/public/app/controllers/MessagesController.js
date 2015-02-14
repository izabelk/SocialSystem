'use strict';

app.controller('MessagesController', ['$scope', '$interval', '$sce', '$routeParams', '$location', '$route', 'MessagesService', 'notifier',
     function ($scope, $interval, $sce, $routeParams, $location, $route, MessagesService, notifier) {
    
    $scope.messages;
    
    var defaultForm = {
        content: "",
        place: ""
    };

    if ($routeParams && $routeParams.filters) {
        if ($routeParams.filters instanceof Array) {
            $scope.filters = $routeParams.filters;
        } else {
            $scope.filters = [$routeParams.filters];
        }
    } else {
        $scope.filters = [];
    }
    
    MessagesService.getFilteredMessages($scope.filters)
        .then(function (response) {
        $scope.messages = response;
    }, function (err) {
        notifier.error('Messages could not be loaded.');
    });
    
    $interval(function () {
        MessagesService.getFilteredMessages($scope.filters)
        .then(function (response) {
            $scope.messages = response;
        }, function (err) {
            notifier.error('Messages could not be loaded.');
        });
    }, 30 * 1000);
    
    $scope.areMessagesEmpty = function () {
        if ($scope.messages) {
            return $scope.messages.length === 0;
        }
        else {
            return false;
        }
    }

    $scope.postMessage = function (message, messageForm) {
        if (messageForm.$valid) {
            MessagesService.postMessage(message)
                .then(function () {
                notifier.success('Message posted successfully!');
               $scope.message.content = '';
               $scope.message.place = '';
               $scope.messageForm.$setPristine();
            }, function () {
                notifier.error('An error occured while posting the message.');
            });

        }
        else {
            notifier.error('Message text should be shorter than 140 symbols.');
        }
    }

    $scope.clearFilters = function() {
        $location.url($location.path());
    }
    
    $scope.filtersExist = function () {
        return $scope.filters.length > 0;
    }
}])