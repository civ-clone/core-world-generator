"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generator = void 0;
const coordsToIndex_1 = require("./lib/coordsToIndex");
const topologies_1 = require("@civ-clone/core-world/topologies");
const distanceFrom_1 = require("./lib/distanceFrom");
const getNeighbours_1 = require("./lib/getNeighbours");
const indexToCoords_1 = require("./lib/indexToCoords");
class Generator {
    /**
     * The grid's shape is `options.topology`, an `ITopology`, if given;
     * otherwise the one `options.topologyId` names (`'square'` by default),
     * built when it is first asked for (see `topology()`).
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
     * The shape of the grid this generator lays out: the `topology` option if
     * one was given, otherwise core-world's `createTopology` of the
     * `topologyId` option (`'square'` if there is none) at this generator's
     * `width()` and `height()`, made the first time it is asked for.
     *
     * It is built at the size this generator really lays out, which can differ
     * from the size its caller asked for (civ1-earth-generator's `Earth` picks
     * the nearest of its fixed maps), and lazily, so that a subclass has
     * finished constructing first. An unknown id, or a size the topology cannot
     * make (an odd height on a grid that wraps north to south), throws
     * `createTopology`'s `Error` here, the first time it is asked for.
     */
    topology() {
        var _a;
        if (this._topology === null) {
            this._topology = (0, topologies_1.default)((_a = this._options.topologyId) !== null && _a !== void 0 ? _a : 'square', this.width(), this.height());
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