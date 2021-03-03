"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _height, _options, _width;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generator = void 0;
const coordsToIndex_1 = require("./lib/coordsToIndex");
const distanceFrom_1 = require("./lib/distanceFrom");
const getNeighbours_1 = require("./lib/getNeighbours");
const indexToCoords_1 = require("./lib/indexToCoords");
class Generator {
    constructor(height, width, options = {}) {
        _height.set(this, void 0);
        _options.set(this, void 0);
        _width.set(this, void 0);
        __classPrivateFieldSet(this, _height, height);
        __classPrivateFieldSet(this, _options, options);
        __classPrivateFieldSet(this, _width, width);
    }
    coordsToIndex(x, y) {
        return coordsToIndex_1.default(__classPrivateFieldGet(this, _height), __classPrivateFieldGet(this, _width), x, y);
    }
    distanceFrom(from, to) {
        return distanceFrom_1.default(__classPrivateFieldGet(this, _height), __classPrivateFieldGet(this, _width), from, to);
    }
    generate() {
        throw new Error(`Generator#generate(): Must be overridden in '${this.constructor.name}'.`);
    }
    getNeighbours(index, directNeighbours = true) {
        return getNeighbours_1.default(__classPrivateFieldGet(this, _height), __classPrivateFieldGet(this, _width), index, directNeighbours);
    }
    height() {
        return __classPrivateFieldGet(this, _height);
    }
    indexToCoords(index) {
        return indexToCoords_1.default(__classPrivateFieldGet(this, _height), __classPrivateFieldGet(this, _width), index);
    }
    options() {
        return __classPrivateFieldGet(this, _options);
    }
    width() {
        return __classPrivateFieldGet(this, _width);
    }
}
exports.Generator = Generator;
_height = new WeakMap(), _options = new WeakMap(), _width = new WeakMap();
exports.default = Generator;
//# sourceMappingURL=Generator.js.map