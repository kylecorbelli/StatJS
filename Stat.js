var Stat = {
  requireArray: function(array) {
    if (!Array.isArray(array)) {
      throw new Error('This method requires a numeric array as input');
    }
  },
  sum: function(array) {
    Stat.requireArray(array);
    return array.reduce(function(prev, next) {
      return (prev + next);
    });
  }
};

module.exports = Stat;