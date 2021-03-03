import indexToCoords from './indexToCoords';

export const distanceFrom = (
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
};

export default distanceFrom;
