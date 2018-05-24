'use strict';

angular.module('apiRepo.submit', ['ngRoute'])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/manage', {
			templateUrl: 'views/manage/manage.html',
			controller: 'SubmitCtl'
		});
	}])

	.controller('SubmitCtl', [function () {
		$("#button-manage").addClass("active").siblings().removeClass("active");
	}]);