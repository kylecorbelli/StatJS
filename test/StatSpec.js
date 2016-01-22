(function() {
  'use strict';

  var Stat = require('../Stat');
  var expect = require('chai').expect;

  describe('StatJS', function() {

    var testArr;
    var someString;
    var someNumber;
    var someFunc;
    var someObj;

    beforeEach(function() {
      testArr = [7, 4, 4.3, -1, 3.14, 8, 2, 9.22221, 4];
      someString = 'is not a numer';
      someNumber = 7;
      someFunc = function(){};
      someObj = {};
    });

    it('should have methods "requireArray", "sum", "mean", "variance", "stdev", "stdError"', function() {
      expect(Stat.requireArray).to.be.a('function');
      expect(Stat.sum).to.be.a('function');
      expect(Stat.mean).to.be.a('function');
      expect(Stat.variance).to.be.a('function');
      expect(Stat.stdev).to.be.a('function');
      expect(Stat.stdError).to.be.a('function');
    });

    it('should trow an error when passed something other than a numeric array', function() {
      expect(Stat.requireArray).to.throw(Error);
      expect(Stat.sum).to.throw(Error);
      expect(Stat.mean).to.throw(Error);
      expect(Stat.variance).to.throw(Error);
      expect(Stat.stdev).to.throw(Error);
      expect(Stat.stdError).to.throw(Error);
    });

    describe('Stat.sum', function() {

      it('should return a number', function() {
        expect(Stat.sum(testArr)).to.be.a('number');
      });

      it('should return the correct sum', function() {
        expect(Stat.sum(testArr)).to.equal(40.66221);
      });

    });

    describe('Stat.mean', function() {

      it('should return a number', function() {
        expect(Stat.mean(testArr)).to.be.a('number');
      });

      it('should return the correct mean', function() {
        expect(Stat.mean(testArr)).to.equal(4.518023333333334);
      });

    });

  });

})();