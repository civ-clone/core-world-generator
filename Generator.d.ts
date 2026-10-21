import { ITopology } from '@civ-clone/core-world/Topology';
import Terrain from '@civ-clone/core-terrain/Terrain';
export interface IGenerator {
  coordsToIndex(x: number, y: number): number;
  distanceFrom(from: number, to: number): number;
  generate(): Promise<Terrain[]>;
  getNeighbours(index: number, directNeighbours: boolean): number[];
  height(): number;
  indexToCoords(index: number): [number, number];
  options(): {
    [key: string]: any;
  };
  topology(): ITopology;
  width(): number;
}
export declare class Generator implements IGenerator {
  private _height;
  private _options;
  private _topology;
  private _width;
  /**
   * `options.topology`, if given, is the grid's shape; otherwise it is square
   * (see `topology()`).
   */
  constructor(
    height: number,
    width: number,
    options?: {
      [key: string]: any;
    }
  );
  coordsToIndex(x: number, y: number): number;
  distanceFrom(from: number, to: number): number;
  generate(): Promise<Terrain[]>;
  getNeighbours(index: number, directNeighbours?: boolean): number[];
  height(): number;
  indexToCoords(index: number): [number, number];
  options(): {
    [key: string]: any;
  };
  /**
   * The shape of the grid this generator lays out: the `topology` option, or
   * a `SquareTopology` of this width and height, made the first time it is
   * asked for.
   */
  topology(): ITopology;
  width(): number;
}
export default Generator;
