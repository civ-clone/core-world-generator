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
   * The grid's shape is `options.topology`, an `ITopology`, if given;
   * otherwise the one `options.topologyId` names (`'square'` by default),
   * built when it is first asked for (see `topology()`).
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
   * The shape of the grid this generator lays out: the `topology` option if
   * one was given, otherwise core-world's `createTopology` of the
   * `topologyId` option (`'square'` if there is none) at this generator's
   * `width()` and `height()`, made the first time it is asked for.
   *
   * It is built at the size this generator really lays out, which can differ
   * from the size its caller asked for (civ1-earth-generator's `Earth` picks
   * the nearest of its fixed maps), and lazily, so that a subclass has
   * finished constructing first. An unknown id, or a size the topology cannot
   * make (an odd height on a grid that wraps north to south), throws
   * `createTopology`'s `Error` here, the first time it is asked for.
   */
  topology(): ITopology;
  width(): number;
}
export default Generator;
