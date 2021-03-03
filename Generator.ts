import Terrain from '@civ-clone/core-terrain/Terrain';

export interface IGenerator {
  coordsToIndex(x: number, y: number): number;
  distanceFrom(from: number, to: number): number;
  generate(): Promise<Terrain[]>;
  height(): number;
  indexToCoords(index: number): [number, number];
  options(): { [key: string]: any };
  width(): number;
}

export class Generator implements IGenerator {
  #height: number;
  #options: { [key: string]: any };
  #width: number;

  constructor(
    height: number,
    width: number,
    options: { [key: string]: any } = {}
  ) {
    this.#height = height;
    this.#options = options;
    this.#width = width;
  }

  coordsToIndex(x: number, y: number): number {
    while (x < 0) {
      x += this.width();
    }

    while (y < 0) {
      y += this.height();
    }

    x = x % this.width();
    y = y % this.height();

    return y * this.width() + x;
  }

  distanceFrom(from: number, to: number): number {
    const [fromX, fromY]: [number, number] = this.indexToCoords(from),
      [toX, toY]: [number, number] = this.indexToCoords(to),
      map: [number, number][] = [
        [-1, 1],
        [-1, 0],
        [-1, -1],
        [0, 1],
        [0, 0],
        [0, -1],
        [1, 1],
        [1, 0],
        [1, -1],
      ],
      [shortestDistance]: number[] = map
        .map(([x, y]: [number, number]): [number, number] => [
          x * this.width(),
          y * this.height(),
        ])
        .map(([x, y]: [number, number]): [number, number] => [
          fromX - toX + x,
          fromY - toY + y,
        ])
        .map((coords: [number, number]): number => Math.hypot(...coords))
        .sort((a: number, b: number): number => a - b);

    return shortestDistance;
  }

  generate(): Promise<Terrain[]> {
    throw new Error(
      `Generator#generate(): Must be overridden in '${this.constructor.name}'.`
    );
  }

  height(): number {
    return this.#height;
  }

  indexToCoords(index: number): [number, number] {
    const total: number = this.height() * this.width();

    while (index < 0) {
      index += total;
    }

    index = index % total;

    return [index % this.width(), Math.floor(index / this.width())];
  }

  options(): { [key: string]: any } {
    return this.#options;
  }

  width(): number {
    return this.#width;
  }
}

export default Generator;
