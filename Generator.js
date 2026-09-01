"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generator = void 0;
const coordsToIndex_1 = require("./lib/coordsToIndex");
const distanceFrom_1 = require("./lib/distanceFrom");
const getNeighbours_1 = require("./lib/getNeighbours");
const indexToCoords_1 = require("./lib/indexToCoords");
class Generator {
    constructor(height, width, options = {}) {
        this._height = height;
        this._options = options;
        this._width = width;
    }
    coordsToIndex(x, y) {
        return (0, coordsToIndex_1.default)(this._height, this._width, x, y);
    }
    distanceFrom(from, to) {
        return (0, distanceFrom_1.default)(this._height, this._width, from, to);
    }
    generate() {
        throw new Error(`Generator#generate(): Must be overridden in '${this.constructor.name}'.`);
    }
    getNeighbours(index, directNeighbours = true) {
        return (0, getNeighbours_1.default)(this._height, this._width, index, directNeighbours);
    }
    height() {
        return this._height;
    }
    indexToCoords(index) {
        return (0, indexToCoords_1.default)(this._height, this._width, index);
    }
    options() {
        return this._options;
    }
    width() {
        return this._width;
    }
}
exports.Generator = Generator;
exports.default = Generator;
//# sourceMappingURL=Generator.js.map