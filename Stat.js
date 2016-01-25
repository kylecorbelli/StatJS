var Stat = (function () {
    function Stat() {
    }
    Stat.each = function (array, callback) {
        for (var i = 0; i < array.length; i++) {
            callback(array[i]);
        }
    };
    Stat.all = function (array, conditionCheckFn) {
        for (var i = 0; i < array.length; i++) {
            if (!conditionCheckFn(array[i])) {
                return false;
            }
        }
        return true;
    };
    Stat.requireArray = function (collection, keySelectorFn) {
        var array = [];
        // collection is even an array... of either numeric values hopefully or objects hopefully
        if (Array.isArray(collection)) {
            if (collection.length === 0) {
                throw new Error('Method requires a non-empty numeric array as input');
            }
            var isAllNumbers = Stat.all(collection, function (element) {
                return (typeof element === 'number');
            });
            var isAllObjects = Stat.all(collection, function (element) {
                return ((typeof element === 'object') && !Array.isArray(element));
            });
            if (isAllNumbers) {
                array = collection.slice();
            }
            else if (isAllObjects) {
                Stat.each(collection, function (element) {
                    array.push(keySelectorFn(element));
                });
            }
            else {
                throw new Error('Method requires as input an array of numeric values or an arry of objects with a numeric property');
            }
        }
        else {
            throw new Error('Method requires as input an array of numeric values or an arry of objects with a numeric property');
        }
        return array;
    };
    // private static objectToNumber(collection: number[]): number;
    // private static objectToNumber(collection: Object[], keySelectorFn: Function): number;
    Stat.objectToNumber = function (collection, keySelectorFn) {
        var resultArray = [];
        if (typeof collection[0] === 'number') {
            return collection;
        }
        for (var i = 0; i < collection.length; i++) {
            resultArray.push(keySelectorFn(collection[i]));
        }
        return resultArray;
    };
    Stat.sum = function (collection, keySelectorFn) {
        var array = Stat.objectToNumber(collection, keySelectorFn);
        Stat.requireArray(array);
        return array.reduce(function (prev, next) {
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
