'use strict';

// Declare app level module which depends on views, and components
angular.module('apiRepo', [
  'ngRoute',
  'apiRepo.landingPage',
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/landingPage'});
}]);
