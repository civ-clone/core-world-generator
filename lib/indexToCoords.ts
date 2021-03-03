export const indexToCoords = (
  height: number,
  width: number,
  index: number
): [number, number] => {
  const total: number = height * width;

  while (index < 0) {
    index += total;
  }

  index = index % total;

  return [index % width, Math.floor(index / width)];
};

export default indexToCoords;
