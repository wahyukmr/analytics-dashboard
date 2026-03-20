export class SeededRandom {
  private value: number;

  constructor(seed: number = Date.now()) {
    this.value = seed;
  }

  next(): number {
    this.value = (this.value * 16807) % 2147483647;
    return (this.value - 1) / 2147483646;
  }

  int(max: number): number {
    return Math.floor(this.next() * max);
  }

  choice<T>(array: T[]): T {
    return array[this.int(array.length)];
  }
}
