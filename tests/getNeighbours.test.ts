import coordsToIndex from '../lib/coordsToIndex';
import { expect } from 'chai';
import getNeighbours from '../lib/getNeighbours';

describe('getNeighbours', () => {
  const height = 5,
    width = 6,
    at = (x: number, y: number): number => coordsToIndex(height, width, x, y),
    // `n ne e se s sw w nw`, as `getNeighbours` returns them.
    expected = (x: number, y: number): number[] => [
      at(x, y - 1),
      at(x + 1, y - 1),
      at(x + 1, y),
      at(x + 1, y + 1),
      at(x, y + 1),
      at(x - 1, y + 1),
      at(x - 1, y),
      at(x - 1, y - 1),
    ];

  (
    [
      ['in the middle of the map', 2, 2],
      ['in the top-left corner', 0, 0],
      ['in the top-right corner', width - 1, 0],
      ['in the bottom-left corner', 0, height - 1],
      ['in the bottom-right corner', width - 1, height - 1],
      ['on the top seam', 3, 0],
      ['on the bottom seam', 3, height - 1],
      ['on the left seam', 0, 2],
      ['on the right seam', width - 1, 2],
    ] as [string, number, number][]
  ).forEach(([description, x, y]) => {
    it(`should return all eight distinct neighbours for a tile ${description}`, () => {
      const neighbours = getNeighbours(height, width, at(x, y), false);

      expect(neighbours).to.deep.equal(expected(x, y));
      expect(new Set(neighbours).size).to.equal(8);
      expect(neighbours).to.not.include(at(x, y));
    });

    it(`should return the four direct neighbours for a tile ${description}`, () => {
      const [n, , e, , s, , w] = expected(x, y);

      expect(getNeighbours(height, width, at(x, y))).to.deep.equal([
        n,
        e,
        s,
        w,
      ]);
    });
  });

  it('should include the tile to the south-east', () => {
    expect(getNeighbours(height, width, at(2, 2), false)).to.include(at(3, 3));
  });
});
