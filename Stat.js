var Stat = (function () {
    function Stat() {
    }
    Stat.requireArray = function (arrayInput) {
        if (!Array.isArray(arrayInput)) {
            throw new Error('This method requires a numeric array as input');
        }
        arrayInput.forEach(function (element) {
            if (typeof element !== 'number') {
                throw new Error('This method requires a NUMERIC array as input');
            }
        });
        if (arrayInput.length === 0) {
            throw new Error('This method requires a NON-EMPTY numeric array as input');
        }
    };
    Stat.sum = function (arrayInput) {
        Stat.requireArray(arrayInput);
        return arrayInput.reduce(function (prev, next) {
            return (prev + next);
        });
    };
    Stat.mean = function (arrayInput) {
        Stat.requireArray(arrayInput);
        return (Stat.sum(arrayInput) / arrayInput.length);
    };
    Stat.variance = function (arrayInput) {
        Stat.requireArray(arrayInput);
        var mean = Stat.mean(arrayInput);
        return (arrayInput.reduce(function (prev, next) {
            return (prev + Math.pow(next - mean, 2));
        }, 0) / (arrayInput.length - 1));
    };
    Stat.stdev = function (arrayInput) {
        Stat.requireArray(arrayInput);
        return Math.sqrt(Stat.variance(arrayInput));
    };
    Stat.stdError = function (arrayInput) {
        Stat.requireArray(arrayInput);
        return (Stat.stdev(arrayInput) / Math.sqrt(arrayInput.length));
    };
    Stat.covar = function (array1, array2) {
        Stat.requireArray(array1);
        Stat.requireArray(array2);
        if (array1.length !== array2.length) {
            throw new Error('Stat.covar requires two arrays of the same length');
        }
        var mean1 = Stat.mean(array1);
        var mean2 = Stat.mean(array2);
        var sumOfErrorProducts = 0;
        for (var i = 0; i < array1.length; i++) {
            sumOfErrorProducts += ((array1[i] - mean1) * (array2[i] - mean2));
        }
        return sumOfErrorProducts / (array1.length - 1);
    };
    Stat.correl = function (array1, array2) {
        Stat.requireArray(array1);
        Stat.requireArray(array2);
        var size = array1.length;
        if (size !== array2.length) {
            throw new Error('Stat.correl requires two arrays of the same length');
        }
        var stdev1 = Stat.stdev(array1);
        var stdev2 = Stat.stdev(array2);
        return Stat.covar(array1, array2) / (stdev1 * stdev2);
    };
    return Stat;
})();
module.exports = Stat;
