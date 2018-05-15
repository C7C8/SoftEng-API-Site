'use strict';

angular.module('apiRepo.submit', ['ngRoute'])

	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/submit', {
			templateUrl: 'submit/submit.html',
			controller: 'SubmitCtl'
		});
	}])

	.controller('SubmitCtl', [function () {
		$("#button-submit").addClass("active").siblings().removeClass("active");
	}]);