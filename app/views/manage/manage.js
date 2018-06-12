'use strict';

angular.module('apiRepo.submit', ['ngRoute'])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/manage', {
			templateUrl: 'views/manage/manage.html',
			controller: 'ManageCtl'
		});
	}])

	.controller('ManageCtl', ["$scope", "auth", function ($scope, auth) {
		$("#button-manage").addClass("active").siblings().removeClass("active");

		$scope.user = {};
		$scope.login = function() {
			console.log("Logging in as " + $scope.user.username);
			auth.login($scope.user.username, $scope.user.password)
				.success(function(data){
					console.log("Message: " + data.message);
					console.log("Token: " + data.access_token);
				});
		};

		$scope.register = function() {
			console.log("Registering as " + $scope.user.username);
			auth.register($scope.user.username, $scope.user.password);
		}
	}]);