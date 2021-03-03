import Terrain from '@civ-clone/core-terrain/Terrain';
import coordsToIndex from './lib/coordsToIndex';
import distanceFrom from './lib/distanceFrom';
import getNeighbours from './lib/getNeighbours';
import indexToCoords from './lib/indexToCoords';

export interface IGenerator {
  coordsToIndex(x: number, y: number): number;
  distanceFrom(from: number, to: number): number;
  generate(): Promise<Terrain[]>;
  getNeighbours(index: number, directNeighbours: boolean): number[];
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
    return coordsToIndex(this.#height, this.#width, x, y);
  }

  distanceFrom(from: number, to: number): number {
    return distanceFrom(this.#height, this.#width, from, to);
  }

  generate(): Promise<Terrain[]> {
    throw new Error(
      `Generator#generate(): Must be overridden in '${this.constructor.name}'.`
    );
  }

  getNeighbours(index: number, directNeighbours: boolean = true): number[] {
    return getNeighbours(this.#height, this.#width, index, directNeighbours);
  }

  height(): number {
    return this.#height;
  }

  indexToCoords(index: number): [number, number] {
    return indexToCoords(this.#height, this.#width, index);
  }

  options(): { [key: string]: any } {
    return this.#options;
  }

  width(): number {
    return this.#width;
  }
}

export default Generator;
