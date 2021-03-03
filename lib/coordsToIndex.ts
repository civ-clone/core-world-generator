export const coordsToIndex = (
  height: number,
  width: number,
  x: number,
  y: number
): number => {
  while (x < 0) {
    x += width;
  }

  while (y < 0) {
    y += height;
  }

  x = x % width;
  y = y % height;

  return y * width + x;
};

export default coordsToIndex;
