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
    return Stat;
})();
module.exports = Stat;
