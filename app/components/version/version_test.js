'use strict';

describe('apiRepo.version module', function() {
  beforeEach(module('apiRepo.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
