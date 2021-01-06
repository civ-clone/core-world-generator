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
        while (x < 0) {
            x += this.width();
        }
        while (y < 0) {
            y += this.height();
        }
        x = x % this.width();
        y = y % this.height();
        return y * this.width() + x;
    }
    distanceFrom(from, to) {
        const [fromX, fromY] = this.indexToCoords(from), [toX, toY] = this.indexToCoords(to), map = [
            [-1, 1],
            [-1, 0],
            [-1, -1],
            [0, 1],
            [0, 0],
            [0, -1],
            [1, 1],
            [1, 0],
            [1, -1],
        ], [shortestDistance] = map
            .map(([x, y]) => [
            x * this.width(),
            y * this.height(),
        ])
            .map(([x, y]) => [
            fromX - toX + x,
            fromY - toY + y,
        ])
            .map((coords) => Math.hypot(...coords))
            .sort((a, b) => a - b);
        return shortestDistance;
    }
    generate() {
        throw new Error(`Generator#generate(): Must be overridden in '${this.constructor.name}'.`);
    }
    height() {
        return __classPrivateFieldGet(this, _height);
    }
    indexToCoords(index) {
        const total = this.height() * this.width();
        while (index < 0) {
            index += total;
        }
        index = index % total;
        return [index % this.width(), Math.floor(index / this.width())];
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