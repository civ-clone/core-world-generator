"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNeighbours = void 0;
const SquareTopology_1 = require("@civ-clone/core-world/SquareTopology");
const coordsToIndex_1 = require("./coordsToIndex");
const indexToCoords_1 = require("./indexToCoords");
/**
 * The indices of the tiles around `index`: those sharing an edge with it
 * (`topology.edgeDirections()`) when `directNeighbours` is set, otherwise
 * every neighbour (`topology.directions()`), in the topology's order. A
 * neighbour off an edge that does not wrap is left out.
 *
 * Without a `topology` the grid is square, so this is `n e s w` or
 * `n ne e se s sw w nw`, wrapped on both axes, as it has always been.
 */
const getNeighbours = (height, width, index, directNeighbours = true, topology = new SquareTopology_1.default(width, height)) => {
    const [x, y] = (0, indexToCoords_1.default)(height, width, index), neighbours = [];
    for (const direction of directNeighbours
        ? topology.edgeDirections()
        : topology.directions()) {
        const neighbour = topology.neighbour(x, y, direction);
        if (neighbour === null) {
            continue;
        }
        neighbours.push((0, coordsToIndex_1.default)(height, width, neighbour[0], neighbour[1]));
    }
    return neighbours;
};
exports.getNeighbours = getNeighbours;
exports.default = exports.getNeighbours;
//# sourceMappingURL=getNeighbours.js.map