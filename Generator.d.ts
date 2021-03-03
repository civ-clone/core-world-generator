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
  width(): number;
}
export declare class Generator implements IGenerator {
  #private;
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
  width(): number;
}
export default Generator;
