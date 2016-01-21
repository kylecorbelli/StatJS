var Stat = require('./Stat.js');

var test = function(method, testArray, expected) {
  var message;
  var computed = method(testArray);
  if (computed === expected) {
    message = 'success';
  } else {
    message = 'failure: expected ' + computed + ' to be ' + expected;
  }
  console.log(message);
};

var testWithTolerance = function(method, testArray, expected, tolerance) {
  var computed = method(testArray);
  if (Math.abs(computed - expected) < tolerance) {
    message = 'success';
  } else {
    message = 'failure: expected ' + computed + ' to be ' + expected;
  }
  console.log(message);
};

var testArr = [4, 3, 6, 3, 5, 12];
var errorTolerance = 0.00000000000001;

// Test Stat.sum
test(Stat.sum, testArr, 33);

// Test Stat.mean
test(Stat.mean, testArr, 5.5);

// Test Stat.variance
test(Stat.variance, testArr, 11.5);

// Test Stat.stdev
testWithTolerance(Stat.stdev, testArr, 3.39116499156263, errorTolerance);