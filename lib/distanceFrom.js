"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distanceFrom = void 0;
const indexToCoords_1 = require("./indexToCoords");
const distanceFrom = (height, width, from, to) => {
    const [fromX, fromY] = indexToCoords_1.default(height, width, from), [toX, toY] = indexToCoords_1.default(height, width, to), map = [
        [-1, 1],
        [-1, 0],
        [-1, -1],
        [0, 1],
        [0, 0],
        [0, -1],
        [1, 1],
        [1, 0],
        [1, -1],
    ], [shortestDistance] = map
        .map(([x, y]) => [
        x * width,
        y * height,
    ])
        .map(([x, y]) => [
        fromX - toX + x,
        fromY - toY + y,
    ])
        .map((coords) => Math.hypot(...coords))
        .sort((a, b) => a - b);
    return shortestDistance;
};
exports.distanceFrom = distanceFrom;
exports.default = exports.distanceFrom;
//# sourceMappingURL=distanceFrom.js.map