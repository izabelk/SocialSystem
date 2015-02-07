'use strict';

app.controller('RegisterController', ['$scope', '$location', 'auth', 'notifier', 
    function ($scope, $location, auth, notifier) { 
	
    $scope.register = function(user) {
        auth.signup(user).then(function() {
            notifier.success('Registration successful!');
            $location.path('/');
        }, function() { 
        	notifier.error('An error occurred.');
        });
    } 
}]);