'use strict';

angular.module('apiRepo.version', [
  'apiRepo.version.interpolate-filter',
  'apiRepo.version.version-directive'
])

.value('version', '0.1');
