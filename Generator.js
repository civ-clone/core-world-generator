"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Generator_height, _Generator_options, _Generator_width;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generator = void 0;
const coordsToIndex_1 = require("./lib/coordsToIndex");
const distanceFrom_1 = require("./lib/distanceFrom");
const getNeighbours_1 = require("./lib/getNeighbours");
const indexToCoords_1 = require("./lib/indexToCoords");
class Generator {
    constructor(height, width, options = {}) {
        _Generator_height.set(this, void 0);
        _Generator_options.set(this, void 0);
        _Generator_width.set(this, void 0);
        __classPrivateFieldSet(this, _Generator_height, height, "f");
        __classPrivateFieldSet(this, _Generator_options, options, "f");
        __classPrivateFieldSet(this, _Generator_width, width, "f");
    }
    coordsToIndex(x, y) {
        return (0, coordsToIndex_1.default)(__classPrivateFieldGet(this, _Generator_height, "f"), __classPrivateFieldGet(this, _Generator_width, "f"), x, y);
    }
    distanceFrom(from, to) {
        return (0, distanceFrom_1.default)(__classPrivateFieldGet(this, _Generator_height, "f"), __classPrivateFieldGet(this, _Generator_width, "f"), from, to);
    }
    generate() {
        throw new Error(`Generator#generate(): Must be overridden in '${this.constructor.name}'.`);
    }
    getNeighbours(index, directNeighbours = true) {
        return (0, getNeighbours_1.default)(__classPrivateFieldGet(this, _Generator_height, "f"), __classPrivateFieldGet(this, _Generator_width, "f"), index, directNeighbours);
    }
    height() {
        return __classPrivateFieldGet(this, _Generator_height, "f");
    }
    indexToCoords(index) {
        return (0, indexToCoords_1.default)(__classPrivateFieldGet(this, _Generator_height, "f"), __classPrivateFieldGet(this, _Generator_width, "f"), index);
    }
    options() {
        return __classPrivateFieldGet(this, _Generator_options, "f");
    }
    width() {
        return __classPrivateFieldGet(this, _Generator_width, "f");
    }
}
exports.Generator = Generator;
_Generator_height = new WeakMap(), _Generator_options = new WeakMap(), _Generator_width = new WeakMap();
exports.default = Generator;
//# sourceMappingURL=Generator.js.map