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
  private _height: number;
  private _options: { [key: string]: any };
  private _width: number;

  constructor(
    height: number,
    width: number,
    options: { [key: string]: any } = {}
  ) {
    this._height = height;
    this._options = options;
    this._width = width;
  }

  coordsToIndex(x: number, y: number): number {
    return coordsToIndex(this._height, this._width, x, y);
  }

  distanceFrom(from: number, to: number): number {
    return distanceFrom(this._height, this._width, from, to);
  }

  generate(): Promise<Terrain[]> {
    throw new Error(
      `Generator#generate(): Must be overridden in '${this.constructor.name}'.`
    );
  }

  getNeighbours(index: number, directNeighbours: boolean = true): number[] {
    return getNeighbours(this._height, this._width, index, directNeighbours);
  }

  height(): number {
    return this._height;
  }

  indexToCoords(index: number): [number, number] {
    return indexToCoords(this._height, this._width, index);
  }

  options(): { [key: string]: any } {
    return this._options;
  }

  width(): number {
    return this._width;
  }
}

export default Generator;
