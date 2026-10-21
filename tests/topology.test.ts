import { ITopology } from '@civ-clone/core-world/Topology';
import Generator from '../Generator';
import SquareTopology from '@civ-clone/core-world/SquareTopology';
import coordsToIndex from '../lib/coordsToIndex';
import distanceFrom from '../lib/distanceFrom';
import { expect } from 'chai';
import getNeighbours from '../lib/getNeighbours';
import indexToCoords from '../lib/indexToCoords';

// The implementations from before `getNeighbours` and `distanceFrom` went
// through a topology, copied unchanged as the oracle for the square grid.
const oldGetNeighbours = (
    height: number,
    width: number,
    index: number,
    directNeighbours: boolean = true
  ): number[] => {
    const [x, y] = indexToCoords(height, width, index),
      n = coordsToIndex(height, width, x, y - 1),
      ne = coordsToIndex(height, width, x + 1, y - 1),
      e = coordsToIndex(height, width, x + 1, y),
      se = coordsToIndex(height, width, x + 1, y + 1),
      s = coordsToIndex(height, width, x, y + 1),
      sw = coordsToIndex(height, width, x - 1, y + 1),
      w = coordsToIndex(height, width, x - 1, y),
      nw = coordsToIndex(height, width, x - 1, y - 1);

    return directNeighbours ? [n, e, s, w] : [n, ne, e, se, s, sw, w, nw];
  },
  oldDistanceFrom = (
    height: number,
    width: number,
    from: number,
    to: number
  ): number => {
    const [fromX, fromY]: [number, number] = indexToCoords(height, width, from),
      [toX, toY]: [number, number] = indexToCoords(height, width, to),
      map: [number, number][] = [
        [-1, 1],
        [-1, 0],
        [-1, -1],
        [0, 1],
        [0, 0],
        [0, -1],
        [1, 1],
        [1, 0],
        [1, -1],
      ],
      [shortestDistance]: number[] = map
        .map(([x, y]: [number, number]): [number, number] => [
          x * width,
          y * height,
        ])
        .map(([x, y]: [number, number]): [number, number] => [
          fromX - toX + x,
          fromY - toY + y,
        ])
        .map((coords: [number, number]): number => Math.hypot(...coords))
        .sort((a: number, b: number): number => a - b);

    return shortestDistance;
  },
  // `[height, width]`: odd and even, wider and taller than they are long, and
  // the degenerate ones where a tile is its own neighbour.
  sizes: [number, number][] = [
    [1, 1],
    [1, 3],
    [2, 2],
    [3, 2],
    [5, 5],
    [5, 6],
    [7, 4],
    [9, 13],
    [10, 16],
    [17, 11],
    [25, 40],
  ],
  // Every index in range, plus some either side, which `indexToCoords` wraps.
  indices = (height: number, width: number): number[] => {
    const total = height * width;

    return [
      ...new Array(total).fill(0).map((_, index: number): number => index),
      -1,
      -total - 2,
      total,
      total + 3,
      total * 3 + 1,
    ];
  };

describe('getNeighbours and distanceFrom on the square grid', function () {
  // About a million pairs of tiles on the largest world.
  this.timeout(30000);

  sizes.forEach(([height, width]) => {
    it(`should return the same neighbours as before for every tile of a ${width}x${height} world`, () => {
      const mismatches: string[] = [];

      indices(height, width).forEach((index: number) =>
        [true, false].forEach((direct: boolean) => {
          const expected = oldGetNeighbours(height, width, index, direct);

          [
            getNeighbours(height, width, index, direct),
            getNeighbours(
              height,
              width,
              index,
              direct,
              new SquareTopology(width, height)
            ),
            new Generator(height, width).getNeighbours(index, direct),
          ].forEach((actual: number[]) => {
            if (JSON.stringify(actual) !== JSON.stringify(expected)) {
              mismatches.push(`${index} ${direct}: ${actual} ${expected}`);
            }
          });
        })
      );

      expect(mismatches).to.deep.equal([]);
    });

    it(`should return the same distances as before for every pair of tiles of a ${width}x${height} world`, () => {
      const generator = new Generator(height, width),
        topology = new SquareTopology(width, height),
        mismatches: string[] = [];

      indices(height, width).forEach((from: number) =>
        indices(height, width).forEach((to: number) => {
          const expected = oldDistanceFrom(height, width, from, to);

          [
            distanceFrom(height, width, from, to),
            distanceFrom(height, width, from, to, topology),
            generator.distanceFrom(from, to),
          ].forEach((actual: number) => {
            if (!Object.is(actual, expected)) {
              mismatches.push(`${from} ${to}: ${actual} ${expected}`);
            }
          });
        })
      );

      expect(mismatches).to.deep.equal([]);
    });
  });

  it('should default the direct neighbours', () => {
    expect(getNeighbours(5, 6, 14)).to.deep.equal(
      getNeighbours(5, 6, 14, true)
    );
    expect(new Generator(5, 6).getNeighbours(14)).to.deep.equal(
      getNeighbours(5, 6, 14, true)
    );
  });
});

describe('Generator#topology', () => {
  it('should be square, of the generator’s width and height, unless one is given', () => {
    const generator = new Generator(5, 6),
      topology = generator.topology();

    expect(topology).to.be.instanceOf(SquareTopology);
    // Wrapping one step off the right and bottom edges shows the dimensions.
    expect(topology.neighbour(5, 4, 'se')).to.deep.equal([0, 0]);
    expect(topology.neighbour(0, 0, 'nw')).to.deep.equal([5, 4]);
    expect(generator.topology()).to.equal(topology);
  });

  it('should use the topology it is given', () => {
    // A strip that wraps on neither axis and only has east and west, with a
    // made-up distance, so its answers cannot be the square grid's.
    const strip: ITopology<'e' | 'w'> = {
        area: (): [number, number][] => [],
        directions: () => ['e', 'w'],
        distance: (x1: number, y1: number, x2: number, y2: number): number =>
          100 + x1 + 10 * y1 + 1000 * x2 + 10000 * y2,
        edgeDirections: () => ['w'],
        neighbour: (x: number, y: number, direction: 'e' | 'w') => {
          const nextX = direction === 'e' ? x + 1 : x - 1;

          return nextX < 0 || nextX >= 6 ? null : [nextX, y];
        },
        offset: (direction: 'e' | 'w') =>
          direction === 'e' ? [1, 0] : [-1, 0],
        validate: (): void => {},
        wrapsX: (): boolean => false,
        wrapsY: (): boolean => false,
      },
      options = { topology: strip, other: 'kept' },
      generator = new Generator(5, 6, options);

    expect(generator.topology()).to.equal(strip);
    expect(generator.options()).to.equal(options);

    // (2, 1) is index 8.
    expect(generator.getNeighbours(8, false)).to.deep.equal([9, 7]);
    expect(generator.getNeighbours(8)).to.deep.equal([7]);
    // Off the edges, which this topology does not wrap.
    expect(generator.getNeighbours(6, false)).to.deep.equal([7]);
    expect(generator.getNeighbours(11, false)).to.deep.equal([10]);
    expect(generator.getNeighbours(6)).to.deep.equal([]);
    expect(getNeighbours(5, 6, 8, false, strip)).to.deep.equal([9, 7]);

    // (2, 1) to (3, 4).
    expect(generator.distanceFrom(8, 27)).to.equal(100 + 2 + 10 + 3000 + 40000);
    expect(distanceFrom(5, 6, 8, 27, strip)).to.equal(
      100 + 2 + 10 + 3000 + 40000
    );
  });
});
