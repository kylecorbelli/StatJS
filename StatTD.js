var Stat = require('./Stat.js');

var test = function(method, testArray, expected) {
  var message;
  var computed = method(testArr);
  if (computed === expected) {
    message = 'success';
  } else {
    message = 'failure: expected ' + computed + ' to be ' + expected;
  }
  console.log(message);
};