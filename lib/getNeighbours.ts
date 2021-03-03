import coordsToIndex from './coordsToIndex';
import indexToCoords from './indexToCoords';

export const getNeighbours = (
  height: number,
  width: number,
  index: number,
  directNeighbours: boolean = true
): number[] => {
  const [x, y] = indexToCoords(height, width, index),
    n = coordsToIndex(height, width, x, y - 1),
    ne = coordsToIndex(height, width, x + 1, y - 1),
    e = coordsToIndex(height, width, x + 1, y),
    se = coordsToIndex(height, width, x + 1, y),
    s = coordsToIndex(height, width, x, y + 1),
    sw = coordsToIndex(height, width, x - 1, y + 1),
    w = coordsToIndex(height, width, x - 1, y),
    nw = coordsToIndex(height, width, x - 1, y - 1);

  return directNeighbours ? [n, e, s, w] : [n, ne, e, se, s, sw, w, nw];
};

export default getNeighbours;
