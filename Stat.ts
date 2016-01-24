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

  private static objectToNumber(objectArray: Object[], keySelectorFn: Function): number[] {
    var resultArray: number[] = [];
    for (var i: number = 0; i < objectArray.length; i++) {
      resultArray.push(keySelectorFn(objectArray[i]));
    }
    return resultArray;
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

  public static covar(array1: number[], array2: number[]): number {
    Stat.requireArray(array1);
    Stat.requireArray(array2);
    if (array1.length !== array2.length) {
      throw new Error('Stat.covar requires two arrays of the same length');
    }
    var mean1: number = Stat.mean(array1);
    var mean2: number = Stat.mean(array2);
    var sumOfErrorProducts: number = 0;
    for (var i: number = 0; i < array1.length; i++) {
      sumOfErrorProducts += ((array1[i] - mean1) * (array2[i] - mean2));
    }
    return sumOfErrorProducts / (array1.length - 1);
  }

  public static correl(array1: number[], array2: number[]): number {
    Stat.requireArray(array1);
    Stat.requireArray(array2);
    var size: number = array1.length;
    if (size !== array2.length) {
      throw new Error('Stat.correl requires two arrays of the same length');
    }
    var stdev1 = Stat.stdev(array1);
    var stdev2 = Stat.stdev(array2);
    return Stat.covar(array1, array2) / (stdev1 * stdev2);    
  }

}

module.exports = Stat;