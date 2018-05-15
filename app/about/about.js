'use strict';

angular.module('apiRepo.about', ['ngRoute'])

	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/about', {
			templateUrl: 'about/about.html',
			controller: 'AboutCtl'
		});
	}])

	.controller('AboutCtl', [function () {
		$("#button-about").addClass("active").siblings().removeClass("active");
	}]);