'use strict';

// Declare app level module which depends on views, and components
angular.module('apiRepo', [
  'ngRoute',
  'apiRepo.view1',
  'apiRepo.view2',
  'apiRepo.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
