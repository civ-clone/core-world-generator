"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distanceFrom = void 0;
const SquareTopology_1 = require("@civ-clone/core-world/SquareTopology");
const indexToCoords_1 = require("./indexToCoords");
/**
 * The distance between the tiles at `from` and `to`, as `topology` measures
 * it: the short way round any wrap.
 *
 * Without a `topology` the grid is square, so this is the straight-line
 * distance on a world that wraps on both axes, as it has always been.
 */
const distanceFrom = (height, width, from, to, topology = new SquareTopology_1.default(width, height)) => {
    const [fromX, fromY] = (0, indexToCoords_1.default)(height, width, from), [toX, toY] = (0, indexToCoords_1.default)(height, width, to);
    return topology.distance(fromX, fromY, toX, toY);
};
exports.distanceFrom = distanceFrom;
exports.default = exports.distanceFrom;
//# sourceMappingURL=distanceFrom.js.map