"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNeighbours = void 0;
const coordsToIndex_1 = require("./coordsToIndex");
const indexToCoords_1 = require("./indexToCoords");
const getNeighbours = (height, width, index, directNeighbours = true) => {
    const [x, y] = indexToCoords_1.default(height, width, index), n = coordsToIndex_1.default(height, width, x, y - 1), ne = coordsToIndex_1.default(height, width, x + 1, y - 1), e = coordsToIndex_1.default(height, width, x + 1, y), se = coordsToIndex_1.default(height, width, x + 1, y), s = coordsToIndex_1.default(height, width, x, y + 1), sw = coordsToIndex_1.default(height, width, x - 1, y + 1), w = coordsToIndex_1.default(height, width, x - 1, y), nw = coordsToIndex_1.default(height, width, x - 1, y - 1);
    return directNeighbours ? [n, e, s, w] : [n, ne, e, se, s, sw, w, nw];
};
exports.getNeighbours = getNeighbours;
exports.default = exports.getNeighbours;
//# sourceMappingURL=getNeighbours.js.map