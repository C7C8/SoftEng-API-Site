'use strict';

angular.module('apiRepo.landingPage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/landingPage', {
    templateUrl: 'landingPage/landingPage.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [function() {

}]);