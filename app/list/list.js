'use strict';

angular.module('apiRepo.list', ['ngRoute'])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/list', {
			templateUrl: 'list/list.html',
			controller: 'ListCtl'
		});
	}])

	.controller('ListCtl', ['$scope', 'apilist', function($scope, apilist) {
		$scope.test="world";
		apilist.success(function(data) {
			console.log("Grabbed API list data");
			$scope.apilist = data;
		});
	}]);