class Stat {

  private static requireArray(arrayInput: number[]): void {
    if (!Array.isArray(arrayInput)) {
      throw new Error('This method requires a numeric array as input');
    }
    arrayInput.forEach(function(element: number): void {
      if (typeof element !== 'number') {
        throw new Error('This method requires a NUMERIC array as input');
      }
    });
    if (arrayInput.length === 0) {
      throw new Error('This method requires a NON-EMPTY numeric array as input');
    }
  }

  public static sum(arrayInput: number[]): number {
    Stat.requireArray(arrayInput);
    return arrayInput.reduce(function(prev: number, next: number): number {
      return (prev + next);
    });
  }

  public static mean(arrayInput: number[]): number {
    Stat.requireArray(arrayInput);
    return (Stat.sum(arrayInput) / arrayInput.length);
  }

  public static variance(arrayInput: number[]): number {
    Stat.requireArray(arrayInput);
    var mean = Stat.mean(arrayInput);
    return (arrayInput.reduce(function(prev: number, next: number) {
      return (prev + Math.pow(next - mean, 2));
    }, 0) / (arrayInput.length - 1));
  }

  public static stdev(arrayInput: number[]): number {
    Stat.requireArray(arrayInput);
    return Math.sqrt(Stat.variance(arrayInput));
  }

  public static stdError(arrayInput: number[]): number {
    Stat.requireArray(arrayInput);
    return (Stat.stdev(arrayInput) / Math.sqrt(arrayInput.length));
  }

  public static correl(array1: number[], array2: number[]): number {
    Stat.requireArray(array1);
    Stat.requireArray(array2);
    var size: number = array1.length;
    if (size !== array2.length) {
      throw new Error('Stat.correl requires two arrays of the same length');
    }
    var sumOfXYproducts: number = 0;
    for (var i = 0; i < size; i++) {
      sumOfXYproducts += (array1[i] * array2[i]);
    }
    var meanOfArray1: number = Stat.mean(array1);
    var meanOfArray2: number = Stat.mean(array2);
    var stdevOfArray1: number = Stat.stdev(array1);
    var stdevOfArray2: number = Stat.stdev(array2);
    return (sumOfXYproducts - size * meanOfArray1 * meanOfArray2) / (stdevOfArray1 * stdevOfArray2) / (size - 1);
  }

}

module.exports = Stat;