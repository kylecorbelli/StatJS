(function() {
  'use strict';

  var Stat = require('../Stat');
  var expect = require('chai').expect;

  describe('StatJS', function() {

    var testArr;
    var cArr1;
    var cArr2;
    var someString;
    var someNumber;
    var someFunc;
    var someObj;
    var objs;
    var result;

    beforeEach(function() {
      testArr = [7, 4, 4.3, -1, 3.14, 8, 2, 9.22221, 4];
      cArr1 = [4, 6, 8, 4, 2, 1, 5, 7, 4, 6];
      cArr2 = [85, 80, 92, 70, 65, 60, 89, 82, 81, 95];
      objs = [
        {name: 'a', dataPoint: 4},
        {name: 'b', dataPoint: 6},
        {name: 'c', dataPoint: 8},
        {name: 'd', dataPoint: 4},
        {name: 'e', dataPoint: 2},
        {name: 'f', dataPoint: 1},
        {name: 'g', dataPoint: 5},
        {name: 'h', dataPoint: 7},
        {name: 'i', dataPoint: 4},
        {name: 'j', dataPoint: 6}
      ];
      someString = 'is not a numer';
      someNumber = 7;
      someFunc = function(){};
      someObj = {};
    });

    it('should have methods "requireArray", "sum", "mean", "variance", "stdev", "stdError", "covar", "correl"', function() {
      expect(Stat.requireArray).to.be.a('function');
      expect(Stat.objectToNumber).to.be.a('function');
      expect(Stat.sum).to.be.a('function');
      expect(Stat.mean).to.be.a('function');
      expect(Stat.variance).to.be.a('function');
      expect(Stat.stdev).to.be.a('function');
      expect(Stat.stdError).to.be.a('function');
      expect(Stat.covar).to.be.a('function');
      expect(Stat.correl).to.be.a('function');
    });

    it('should trow an error when passed something other than a numeric array', function() {
      expect(Stat.requireArray).to.throw(Error);
      expect(Stat.sum).to.throw(Error);
      expect(Stat.mean).to.throw(Error);
      expect(Stat.variance).to.throw(Error);
      expect(Stat.stdev).to.throw(Error);
      expect(Stat.stdError).to.throw(Error);
      expect(Stat.covar).to.throw(Error);
      expect(Stat.correl).to.throw(Error);
    });

    describe('Stat.objectToNumber', function() {

      beforeEach(function() {
        result = Stat.objectToNumber(objs, function(item) {
          return item.dataPoint;
        });
      });

      it('should return the correct array of numbers', function() {
        expect(result).to.deep.equal(cArr1);
      });

    });

    describe('Stat.sum', function() {

      it('should return a number', function() {
        expect(Stat.sum(testArr)).to.be.a('number');
      });

      it('should return the correct sum when passed an array', function() {
        expect(Stat.sum(testArr)).to.equal(40.66221);
      });

      it('should return a number when passed an object', function() {
        var resultOnObj = Stat.sum(objs, function(item) {
          // console.log(item.dataPoint);
          return item.dataPoint;
        });
        expect(resultOnObj).to.be.a('number');
      });

      it('should return the correct sum when passed an object', function() {
        var resultOnObj = Stat.sum(objs, function(item) {
          // console.log(item.dataPoint);
          return item.dataPoint;
        });
        expect(resultOnObj).to.equal(47);
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

    describe('Stat.covar', function() {

      it('should return a number', function() {
        expect(Stat.covar(cArr1, cArr2)).to.be.a('number');
      });

      it('should return the correct covariance', function() {
        expect(Stat.covar(cArr1, cArr2)).to.equal(20.4111111111111111);
      });

    });

    describe('Stat.correl', function() {

      it('should return a number', function() {
        expect(Stat.correl(cArr1, cArr2)).to.be.a('number');
      });

      it('should return the correct correlation coefficient', function() {
        expect(Stat.correl(cArr1, cArr2)).to.equal(0.8156289010485822);
      });

    });

  });

})();