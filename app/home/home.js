'use strict';

angular.module('apiRepo.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtl'
  });
}])

.controller('HomeCtl', [function() {

}]);