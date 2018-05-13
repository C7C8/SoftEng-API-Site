'use strict';

angular.module('apiRepo.list', ['ngRoute'])

	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/list', {
			templateUrl: 'list/list.html',
			controller: 'ListCtl'
		});
	}])

	.controller('ListCtl', [function () {

	}]);