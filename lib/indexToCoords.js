"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexToCoords = void 0;
const indexToCoords = (height, width, index) => {
    const total = height * width;
    while (index < 0) {
        index += total;
    }
    index = index % total;
    return [index % width, Math.floor(index / width)];
};
exports.indexToCoords = indexToCoords;
exports.default = exports.indexToCoords;
//# sourceMappingURL=indexToCoords.js.map