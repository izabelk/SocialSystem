'use strict';

app.controller('MessagesController', ['$scope', '$timeout', 'MessagesService', 'notifier',
     function ($scope, $timeout, MessagesService, notifier) {
    
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
            notifier.error('Incorrect message.')
        }
    }
}])