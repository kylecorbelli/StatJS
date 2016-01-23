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
    Stat.correl = function (array1, array2) {
        Stat.requireArray(array1);
        Stat.requireArray(array2);
        var size = array1.length;
        if (size !== array2.length) {
            throw new Error('Stat.correl requires two arrays of the same length');
        }
        var sumOfXYproducts = 0;
        for (var i = 0; i < size; i++) {
            sumOfXYproducts += (array1[i] * array2[i]);
        }
        var meanOfArray1 = Stat.mean(array1);
        var meanOfArray2 = Stat.mean(array2);
        var stdevOfArray1 = Stat.stdev(array1);
        var stdevOfArray2 = Stat.stdev(array2);
        return (sumOfXYproducts - size * meanOfArray1 * meanOfArray2) / (stdevOfArray1 * stdevOfArray2) / (size - 1);
    };
    return Stat;
})();
module.exports = Stat;
