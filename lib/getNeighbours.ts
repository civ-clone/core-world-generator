import { ITopology } from '@civ-clone/core-world/Topology';
import SquareTopology from '@civ-clone/core-world/SquareTopology';
import coordsToIndex from './coordsToIndex';
import indexToCoords from './indexToCoords';

/**
 * The indices of the tiles around `index`: those sharing an edge with it
 * (`topology.edgeDirections()`) when `directNeighbours` is set, otherwise
 * every neighbour (`topology.directions()`), in the topology's order. A
 * neighbour off an edge that does not wrap is left out.
 *
 * Without a `topology` the grid is square, so this is `n e s w` or
 * `n ne e se s sw w nw`, wrapped on both axes, as it has always been.
 */
export const getNeighbours = (
  height: number,
  width: number,
  index: number,
  directNeighbours: boolean = true,
  topology: ITopology = new SquareTopology(width, height)
): number[] => {
  const [x, y] = indexToCoords(height, width, index),
    neighbours: number[] = [];

  for (const direction of directNeighbours
    ? topology.edgeDirections()
    : topology.directions()) {
    const neighbour = topology.neighbour(x, y, direction);

    if (neighbour === null) {
      continue;
    }

    neighbours.push(coordsToIndex(height, width, neighbour[0], neighbour[1]));
  }

  return neighbours;
};

export default getNeighbours;
