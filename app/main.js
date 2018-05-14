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

$(".navbutton").on("click", event => {
	$(event.currentTarget).siblings().removeClass("active");
	$(event.currentTarget).addClass("active");
});