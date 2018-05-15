'use strict';

var app = angular.module('apiRepo', [
	'ngRoute',
	'apiRepo.home',
	'apiRepo.list',
	'apiRepo.submit',
	'apiRepo.about'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
	$routeProvider.otherwise({redirectTo: '/home'});
}]);
