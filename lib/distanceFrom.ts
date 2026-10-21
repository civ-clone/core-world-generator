import { ITopology } from '@civ-clone/core-world/Topology';
import SquareTopology from '@civ-clone/core-world/SquareTopology';
import indexToCoords from './indexToCoords';

/**
 * The distance between the tiles at `from` and `to`, as `topology` measures
 * it: the short way round any wrap.
 *
 * Without a `topology` the grid is square, so this is the straight-line
 * distance on a world that wraps on both axes, as it has always been.
 */
export const distanceFrom = (
  height: number,
  width: number,
  from: number,
  to: number,
  topology: ITopology = new SquareTopology(width, height)
): number => {
  const [fromX, fromY] = indexToCoords(height, width, from),
    [toX, toY] = indexToCoords(height, width, to);

  return topology.distance(fromX, fromY, toX, toY);
};

export default distanceFrom;
