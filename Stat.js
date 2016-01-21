var Stat = {
  requireArray: function(array) {
    if (!Array.isArray(array)) {
      throw new Error('This method requires a numeric array as input');
    }
  }
};

module.exports = Stat;