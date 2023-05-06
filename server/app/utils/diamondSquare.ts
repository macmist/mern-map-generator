import { create as randomSeed, RandomSeed } from "random-seed";

export class DiamondSquare {
  n: number;
  dimension: number;
  matrix: Array<Array<number>>;
  rb: number;
  min: number;
  max: number;
  seed: string;
  rand: RandomSeed;
  constructor(
    n: number,
    rb: number = 20,
    seed: string = Date.now().toString()
  ) {
    if (n <= 0 || !Number.isInteger(n))
      throw new Error("Only natural positive numbers allowed");
    if (n >= 32) throw new Error("n must be between 1 and 31 included");
    this.n = n;
    this.dimension = 1 + Math.pow(2, n);
    this.matrix = new Array(this.dimension)
      .fill(0)
      .map(() => new Array(this.dimension));
    this.rb = rb;
    this.min = Number.MAX_SAFE_INTEGER;
    this.max = Number.MIN_SAFE_INTEGER;
    this.rand = randomSeed(seed);
    this.seed = seed;
  }

  generate(): Promise<Array<Array<number>>> {
    return new Promise((resolve) => {
      const matrix = this.initMatrix();
      let size = this.dimension - 1;
      while (size > 1) {
        this.diamondStep(size);
        this.squareStep(size);
        size /= 2;
        this.rb = Math.max(this.rb / 2, 1);
      }
      this.normalize();
      return resolve(matrix);
    });
  }

  normalize() {
    for (let x = 0; x < this.dimension; ++x) {
      for (let y = 0; y < this.dimension; ++y) {
        this.matrix[x][y] = this.normalizeHeight(this.matrix[x][y]);
      }
    }
  }

  initMatrix(): Array<Array<number>> {
    const last = this.dimension - 1;
    this.assignAndCompare(0, 0, this.generateRandom(-this.rb, this.rb));
    this.assignAndCompare(0, last, this.generateRandom(-this.rb, this.rb));
    this.assignAndCompare(last, 0, this.generateRandom(-this.rb, this.rb));
    this.assignAndCompare(last, last, this.generateRandom(-this.rb, this.rb));
    return this.matrix;
  }

  generateRandom(a: number, b: number): number {
    return Math.floor(this.rand.random() * (b - a + 1) + a);
  }

  diamondStep(squareSize: number) {
    const half = squareSize / 2;
    for (let x = half; x < this.dimension; x += squareSize) {
      for (let y = half; y < this.dimension; y += squareSize) {
        const average = this.getAverage(x, y, half);
        this.assignAndCompare(x, y, average + this.generateRandom(-half, half));
      }
    }
  }

  getAverage(x: number, y: number, middle: number) {
    const topLeft = this.matrix[x - middle][y - middle];
    const topRight = this.matrix[x + middle][y - middle];
    const bottomLeft = this.matrix[x - middle][y + middle];
    const bottomRight = this.matrix[x + middle][y + middle];
    return Math.floor((topLeft + topRight + bottomRight + bottomLeft) / 4);
  }

  squareStep(diamondSize: number) {
    const half = diamondSize / 2;
    let offset = 0;
    for (let x = 0; x < this.dimension; x += half) {
      if (offset === 0) offset = half;
      else offset = 0;
      for (let y = offset; y < this.dimension; y += diamondSize) {
        this.assignAndCompare(
          x,
          y,
          this.squareStepAverage(half, x, y) + this.generateRandom(-half, half)
        );
      }
    }
  }

  squareStepAverage(half: number, x: number, y: number): number {
    let total = 0;
    let vertices = 0;
    if (x >= half) {
      total += this.matrix[x - half][y];
      vertices += 1;
    }
    if (x + half < this.dimension) {
      total += this.matrix[x + half][y];
      vertices += 1;
    }
    if (y >= half) {
      total += this.matrix[x][y - half];
      vertices += 1;
    }
    if (y + half < this.dimension) {
      total += this.matrix[x][y + half];
      vertices += 1;
    }
    return total / vertices;
  }

  compareWithMinMax(n: number) {
    if (n > this.max) this.max = n;
    if (n < this.min) this.min = n;
  }
  assignAndCompare(x: number, y: number, n: number) {
    this.matrix[x][y] = n;
    this.compareWithMinMax(n);
  }

  normalizeHeight(height: number): number {
    const divider = this.max - this.min;
    return (height - this.min) / divider;
  }
}
