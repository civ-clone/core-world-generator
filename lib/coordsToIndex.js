"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coordsToIndex = void 0;
const coordsToIndex = (height, width, x, y) => {
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
exports.coordsToIndex = coordsToIndex;
exports.default = exports.coordsToIndex;
//# sourceMappingURL=coordsToIndex.js.map