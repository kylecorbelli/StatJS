(function() {
  'use strict';

  var Stat = require('../Stat');
  var expect = require('chai').expect;

  describe('StatJS', function() {

    var testArr;

    beforeEach(function() {
      testArr = [7, 4, 4.3, -1, 3.14, 8, 2, 9.22221, 4];
    });

    it('should have methods "requiredArray", "sum", "mean", "variance", "stdev"', function() {
      expect(Stat.requireArray).to.be.a('function');
      expect(Stat.sum).to.be.a('function');
      expect(Stat.mean).to.be.a('function');
      expect(Stat.variance).to.be.a('function');
      expect(Stat.stdev).to.be.a('function');
    });

  });

})();