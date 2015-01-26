'use strict';

app.controller('MessagesController', ['$scope', '$timeout', '$sce', 'MessagesService', 'notifier',
     function ($scope, $timeout, $sce, MessagesService, notifier) {
    
    $scope.hashTagQuery = '';
    $scope.messages;
    $scope.filters = [];
    
    $timeout(function () {
        MessagesService.getMessages()
        .then(function (response) {
            $scope.messages = response;
        }, function (err) {
            notifier.error('Messages could not be loaded.');
        });
     }, 30 * 1000);
    
    MessagesService.getMessages()
        .then(function (response) {
        $scope.messages = response;
    }, function (err) {
        notifier.error('Messages could not be loaded.');
    });
    
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
            }, function () {
                notifier.error('An error occured while posting message.');
            });
        }
        else {
            notifier.error('Message text should be shorter than 140 symbols.');
        }
    }

    $scope.containsHashTag = function (msg) {
        return msg.content[0] === "#";
    }
    
    $scope.filtersExist = function () {
        return $scope.hashTagQuery !== '';
    }
    
    $scope.collectFilter = function ($event) {
        
        var hashTag = $event.currentTarget.innerText;
        hashTag = hashTag.substr(1);
        $scope.hashTagQuery = $scope.hashTagQuery.trim();
        $scope.filters.push(hashTag);

        if ($scope.hashTagQuery === '') {
            $scope.hashTagQuery += hashTag;
        }
        else {
            $scope.hashTagQuery = $scope.hashTagQuery + '&' + hashTag;
        }
    }
    
    $scope.getAllMessages = function () {
        
        $scope.hashTagQuery = '';
        $scope.filters = [];

        MessagesService.getMessages()
        .then(function (response) {
            $scope.messages = response;
        }, function (err) {
            notifier.error('Messages could not be loaded.');
        });
    }

    $scope.getFilteredMessages = function () {
       
        MessagesService.getFilteredMessages($scope.hashTagQuery)
            .then(function (response) {
                $scope.messages = response;
            }, function (err) {
                notifier.error('Messages could not be loaded.');
            });
    }
}])