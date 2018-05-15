'use strict';

angular.module('apiRepo.list', ['ngRoute'])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/list', {
			templateUrl: 'list/list.html',
			controller: 'ListCtl'
		});
	}])

	.controller('ListCtl', ['$scope', 'apilist', function($scope, apilist) {
		$('#button-list').addClass("active").siblings().removeClass("active");

		apilist.success(function(data) {
			console.log("Grabbed API list data");
			$scope.apilist = data;
		});

		//Expand or hide an API class section
		$scope.toggleClassView = function($event){
			$($event.currentTarget).toggleClass("select-chevron-expand", 400);
			$($event.currentTarget).parent().siblings().slideToggle();
		}
	}]);