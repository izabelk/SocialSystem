'use strict';

app.controller('MessagesController', ['$scope', 'MessagesService', 'notifier', function ($scope, MessagesService, notifier) {
    
    MessagesService.getMessages();

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