var Stat = {
  requireArray: function(array) {
    if (!Array.isArray(array)) {
      throw new Error('This method requires a numeric array as input');
    }
    array.forEach(function(element) {
      if (typeof element !== 'number') {
        throw new Error('This method requires a NUMERIC array as input');
      }
    });
    if (array.length === 0) {
      throw new Error('This method requires a NON-EMPTY numeric array as input');
    }
  },
  sum: function(array) {
    Stat.requireArray(array);
    return array.reduce(function(prev, next) {
      return (prev + next);
    });
  },
  mean: function(array) {
    Stat.requireArray(array);
    return (Stat.sum(array) / array.length);
  },
  variance: function(array) {
    Stat.requireArray(array);
    var mean = Stat.mean(array);
    return (array.reduce(function(prev, next) {
      return (prev + Math.pow(next - mean, 2));
    }, 0) / (array.length - 1));
  },
  stdev: function(array) {
    Stat.requireArray(array);
    return Math.pow(Stat.variance(array), 0.5);
  }
};

module.exports = Stat;