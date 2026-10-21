import { ITopology } from '@civ-clone/core-world/Topology';
import Terrain from '@civ-clone/core-terrain/Terrain';
import coordsToIndex from './lib/coordsToIndex';
import createTopology from '@civ-clone/core-world/topologies';
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
  topology(): ITopology;
  width(): number;
}

export class Generator implements IGenerator {
  private _height: number;
  private _options: { [key: string]: any };
  private _topology: ITopology | null;
  private _width: number;

  /**
   * The grid's shape is `options.topology`, an `ITopology`, if given;
   * otherwise the one `options.topologyId` names (`'square'` by default),
   * built when it is first asked for (see `topology()`).
   */
  constructor(
    height: number,
    width: number,
    options: { [key: string]: any } = {}
  ) {
    this._height = height;
    this._options = options;
    this._topology = options.topology ?? null;
    this._width = width;
  }

  coordsToIndex(x: number, y: number): number {
    return coordsToIndex(this._height, this._width, x, y);
  }

  distanceFrom(from: number, to: number): number {
    return distanceFrom(this._height, this._width, from, to, this.topology());
  }

  generate(): Promise<Terrain[]> {
    throw new Error(
      `Generator#generate(): Must be overridden in '${this.constructor.name}'.`
    );
  }

  getNeighbours(index: number, directNeighbours: boolean = true): number[] {
    return getNeighbours(
      this._height,
      this._width,
      index,
      directNeighbours,
      this.topology()
    );
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
  topology(): ITopology {
    if (this._topology === null) {
      this._topology = createTopology(
        this._options.topologyId ?? 'square',
        this.width(),
        this.height()
      );
    }

    return this._topology;
  }

  width(): number {
    return this._width;
  }
}

export default Generator;
