"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generator = void 0;
const SquareTopology_1 = require("@civ-clone/core-world/SquareTopology");
const coordsToIndex_1 = require("./lib/coordsToIndex");
const distanceFrom_1 = require("./lib/distanceFrom");
const getNeighbours_1 = require("./lib/getNeighbours");
const indexToCoords_1 = require("./lib/indexToCoords");
class Generator {
    /**
     * `options.topology`, if given, is the grid's shape; otherwise it is square
     * (see `topology()`).
     */
    constructor(height, width, options = {}) {
        var _a;
        this._height = height;
        this._options = options;
        this._topology = (_a = options.topology) !== null && _a !== void 0 ? _a : null;
        this._width = width;
    }
    coordsToIndex(x, y) {
        return (0, coordsToIndex_1.default)(this._height, this._width, x, y);
    }
    distanceFrom(from, to) {
        return (0, distanceFrom_1.default)(this._height, this._width, from, to, this.topology());
    }
    generate() {
        throw new Error(`Generator#generate(): Must be overridden in '${this.constructor.name}'.`);
    }
    getNeighbours(index, directNeighbours = true) {
        return (0, getNeighbours_1.default)(this._height, this._width, index, directNeighbours, this.topology());
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
    /**
     * The shape of the grid this generator lays out: the `topology` option, or
     * a `SquareTopology` of this width and height, made the first time it is
     * asked for.
     */
    topology() {
        if (this._topology === null) {
            this._topology = new SquareTopology_1.default(this._width, this._height);
        }
        return this._topology;
    }
    width() {
        return this._width;
    }
}
exports.Generator = Generator;
exports.default = Generator;
//# sourceMappingURL=Generator.js.map