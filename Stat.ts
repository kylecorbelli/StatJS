class Stat {

  private static each(array: any[], callback: Function): void {
    for (var i: number = 0; i < array.length; i++) {
      callback(array[i]);
    }
  }

  private static all(array: any[], conditionCheckFn: Function): boolean {
    for (var i: number = 0; i < array.length; i++) {
      if (!conditionCheckFn(array[i])) {
        return false;
      }
    }
    return true;
  }

  private static requireArray(collection: number[]): number[];
  private static requireArray(collection: Object[], keySelectorFn: Function): number[];
  private static requireArray(collection: number[] | Object, keySelectorFn?: Function): number[] {
    var array: number[] = [];
    if (Array.isArray(collection)) {
      if (collection.length === 0) {
        throw new Error('Method requires a non-empty numeric array as input');
      }
      var isAllNumbers = Stat.all(collection, function(element) {
        return (typeof element === 'number');
      });
      var isAllObjects = Stat.all(collection, function(element) {
        return ((typeof element === 'object') && !Array.isArray(element));
      });
      if (isAllNumbers) {
        array = collection.slice();
      } else if (isAllObjects) {
        Stat.each(collection, function(element) {
          array.push(keySelectorFn(element));
        });
      } else {
        throw new Error('Method requires as input an array of numeric values or an arry of objects with a numeric property');
      }
    } else {
      throw new Error('Method requires as input an array of numeric values or an arry of objects with a numeric property');
    }
    return array;
  }

  // private static objectToNumber(collection: number[]): number;
  // private static objectToNumber(collection: Object[], keySelectorFn: Function): number;
  private static objectToNumber(collection: number[] | Object[], keySelectorFn?: Function): any {
    var resultArray: number[] = [];
    if (typeof collection[0] === 'number') {
      return collection;
    }
    for (var i: number = 0; i < collection.length; i++) {
      resultArray.push(keySelectorFn(collection[i]));
    }
    return resultArray;
  }

  public static sum(collection: number[] | Object[], keySelectorFn?: Function): number {
    var array: number[] = Stat.objectToNumber(collection, keySelectorFn);
    Stat.requireArray(array);
    return array.reduce(function(prev: number, next: number): number {
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