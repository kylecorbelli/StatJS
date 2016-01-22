class Stat {

  private static requireArray(arrayInput: number[]): void {
    if (!Array.isArray(arrayInput)) {
      throw new Error('This method requires a numeric array as input');
    }
    arrayInput.forEach(function(element: number) {
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
    return arrayInput.reduce(function(prev: number, next: number) {
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

}

module.exports = Stat;