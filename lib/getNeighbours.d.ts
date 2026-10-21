import { ITopology } from '@civ-clone/core-world/Topology';
/**
 * The indices of the tiles around `index`: those sharing an edge with it
 * (`topology.edgeDirections()`) when `directNeighbours` is set, otherwise
 * every neighbour (`topology.directions()`), in the topology's order. A
 * neighbour off an edge that does not wrap is left out.
 *
 * Without a `topology` the grid is square, so this is `n e s w` or
 * `n ne e se s sw w nw`, wrapped on both axes, as it has always been.
 */
export declare const getNeighbours: (
  height: number,
  width: number,
  index: number,
  directNeighbours?: boolean,
  topology?: ITopology
) => number[];
export default getNeighbours;
