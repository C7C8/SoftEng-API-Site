'use strict';

// Declare app level module which depends on views, and components
angular.module('apiRepo', [
	'ngRoute',
	'apiRepo.home',
	'apiRepo.about'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
	$routeProvider.otherwise({redirectTo: '/home'});
}]);
