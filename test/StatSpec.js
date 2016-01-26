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

    it('should have methods "each", "all", "requireArray", "sum", "mean", "variance", "stdev", "stdError", "covar", "correl"', function() {
      expect(Stat.each).to.be.a('function');
      expect(Stat.all).to.be.a('function');
      expect(Stat.requireArray).to.be.a('function');
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

    describe('Stat.each', function() {

      it('should call the callback function on each item in the input array', function() {
        var a = [1, 2, 3, 4];
        var b = [];
        Stat.each(a, function(e) {
          b.push(2 * e);
        });
        expect(b).to.deep.equal([2, 4, 6, 8]);
      });

    });

    describe('Stat.all', function() {

      it('should return true if every element in the array passes the truth test', function() {
        var a = [2, 4, 6, 8, 10];
        var result = Stat.all(a, function(e) {
          return (e % 2 === 0);
        });
        expect(result).to.equal(true);
      });

      it('should return false if any element in the array does not pass the truth test', function() {
        var a = [2, 4, 6, 8, 9, 52, 10];
        var result = Stat.all(a, function(e) {
          return (e % 2 === 0);
        });
        expect(result).to.equal(false);
      });

    });

    describe('Stat.requireArray', function() {

      it('should return the same array it is given if the input array is numeric', function() {
        expect(Stat.requireArray([1, 2, 3])).to.deep.equal([1, 2, 3]);
      });

      it('should return a numeric array when given an array of objects', function() {
        expect(Stat.requireArray(objs, function(obj) {
          return obj.dataPoint;
        })).to.deep.equal(cArr1);
      });

      it('should throw an error when given anything other than an array', function() {
        expect(function() {
          Stat.requireArray('a');
        }).to.throw(Error);
        expect(function() {
          Stat.requireArray(1, 6);
        }).to.throw(Error);
        expect(function() {
          Stat.requireArray(true);
        }).to.throw(Error);
        expect(function() {
          Stat.requireArray(null);
        }).to.throw(Error);
        expect(function() {
          Stat.requireArray(undefined);
        }).to.throw(Error);
        expect(function() {
          Stat.requireArray();
        }).to.throw(Error);
      });


      it('should throw an error when given an array containing something other than a number or object', function() {
        expect(function() {
          Stat.requireArray([1, 2, 'a']);
        }).to.throw(Error);
      });

      it('should not throw an error when given valid array-of-numbers input', function() {
        expect(function() {
          Stat.requireArray([1, 2, 3]);
        }).not.to.throw(Error);
      });

      it('should not throw an error when given valid array-of-objects input', function() {
        expect(function() {
          Stat.requireArray(objs, function(obj) {
            return obj.dataPoint;
          });
        }).not.to.throw(Error);
      });

      it('should convert an array of objects with a numeric property into an array of numbers', function() {
        expect(Stat.requireArray(objs, function(obj) {
          return obj.dataPoint;
        })).to.deep.equal(cArr1);
      });

    });

    describe('Stat.sum', function() {

      it('should return a number when passed an array of numbers', function() {
        expect(Stat.sum(testArr)).to.be.a('number');
      });

      it('should return the correct sum when passed an array of numbers', function() {
        expect(Stat.sum(testArr)).to.equal(40.66221);
      });

      it('should return a number when passed an array of objects', function() {
        var resultOnObj = Stat.sum(objs, function(item) {
          // console.log(item.dataPoint);
          return item.dataPoint;
        });
        expect(resultOnObj).to.be.a('number');
      });

      it('should return the correct sum when passed an array of objects', function() {
        var resultOnObj = Stat.sum(objs, function(item) {
          return item.dataPoint;
        });
        expect(resultOnObj).to.equal(47);
      });

    });

    describe('Stat.mean', function() {

      it('should return a number when passed an array of numbers', function() {
        expect(Stat.mean(testArr)).to.be.a('number');
      });

      it('should return the correct mean when passed an array of numbers', function() {
        expect(Stat.mean(testArr)).to.equal(4.518023333333334);
      });

      it('should return a number when passed an array of objects', function() {
        expect(Stat.mean(objs, function(obj) {
          return obj.dataPoint;
        })).to.be.a('number');
      });

      it('should return the correct mean when passed an array of objects', function() {
        expect(Stat.mean(objs, function(obj) {
          return obj.dataPoint;
        })).to.equal(4.7);
      });

    });

    describe('Stat.variance', function() {

      it('should return a number when passed an array of numbers', function() {
        expect(Stat.variance(testArr)).to.be.a('number');
      });

      it('should return the correct variance when passed an array of numbers', function() {
        expect(Stat.variance(testArr)).to.equal(9.960742964900001);
      });

      it('should return a number when passed an array of objects', function() {
        expect(Stat.variance(objs, function(obj) {
          return obj.dataPoint;
        })).to.be.a('number');
      });

      it('should return the correct variance when passed an array of objects', function() {
        expect(Stat.variance(objs, function(obj) {
          return obj.dataPoint;
        })).to.equal(4.677777777777779);
      });

    });

    describe('Stat.covar', function() {

      it('should return a number when passed an array of numbers', function() {
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