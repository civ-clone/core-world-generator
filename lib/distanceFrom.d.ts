import { ITopology } from '@civ-clone/core-world/Topology';
/**
 * The distance between the tiles at `from` and `to`, as `topology` measures
 * it: the short way round any wrap.
 *
 * Without a `topology` the grid is square, so this is the straight-line
 * distance on a world that wraps on both axes, as it has always been.
 */
export declare const distanceFrom: (
  height: number,
  width: number,
  from: number,
  to: number,
  topology?: ITopology
) => number;
export default distanceFrom;
