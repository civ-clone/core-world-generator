"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = exports.WorldSizeRegistry = void 0;
const EntityRegistry_1 = require("@civ-clone/core-registry/EntityRegistry");
const WorldSize_1 = require("./WorldSize");
/**
 * The world sizes a ruleset offers a new game, in the order they're registered, each with its own key, and what a size
 *  typed in instead may be. A ruleset that registers none leaves the choice to whatever starts the game.
 */
class WorldSizeRegistry extends EntityRegistry_1.EntityRegistry {
    constructor() {
        super(WorldSize_1.default);
        this._customLimits = null;
    }
    /** What a size typed in may be, or `null` when the ruleset doesn't say. */
    customLimits() {
        return this._customLimits;
    }
    getByKey(key) {
        var _a;
        return (_a = this.entries().find((size) => size.key() === key)) !== null && _a !== void 0 ? _a : null;
    }
    /** Refuses anything but a size, a size whose key is already registered, or two with the same key. */
    register(...sizes) {
        // Anything but a size is refused as any registry refuses it, before its key is asked for.
        sizes.forEach((size) => {
            if (!this.accepts(size)) {
                super.register(size);
            }
        });
        sizes.forEach((size, index) => {
            const existing = this.getByKey(size.key());
            if ((existing !== null && existing !== size) ||
                sizes.some((other, otherIndex) => otherIndex < index && other !== size && other.key() === size.key())) {
                throw new TypeError(`WorldSizeRegistry: a size '${size.key()}' is already registered.`);
            }
        });
        super.register(...sizes);
    }
    /**
     * Refuses bounds that aren't whole numbers of at least 1, whose minimum is above their maximum, that their grid can't
     *  be, or that no size can meet.
     */
    setCustomLimits(limits) {
        if (limits !== null) {
            const what = 'WorldSizeRegistry custom limits';
            (0, WorldSize_1.checkTopologyId)(what, limits.topologyId);
            (0, WorldSize_1.checkPlayerRange)(what, limits);
            ['Width', 'Height', 'Area'].forEach((name) => {
                (0, WorldSize_1.checkWhole)(what, `min${name}`, limits[`min${name}`], 1);
                (0, WorldSize_1.checkWhole)(what, `max${name}`, limits[`max${name}`], limits[`min${name}`]);
            });
            (0, WorldSize_1.checkBuildable)(what, limits.topologyId, limits.minWidth, limits.minHeight);
            (0, WorldSize_1.checkBuildable)(what, limits.topologyId, limits.maxWidth, limits.maxHeight);
            if (limits.minArea > limits.maxWidth * limits.maxHeight ||
                limits.maxArea < limits.minWidth * limits.minHeight) {
                throw new RangeError(`${what}: no size from ${limits.minWidth} by ${limits.minHeight} to ${limits.maxWidth} by ${limits.maxHeight} has from ${limits.minArea} to ${limits.maxArea} squares.`);
            }
        }
        // A copy, so the limits can't be changed past these checks.
        this._customLimits = limits === null ? null : Object.freeze({ ...limits });
    }
}
exports.WorldSizeRegistry = WorldSizeRegistry;
exports.instance = new WorldSizeRegistry();
exports.default = WorldSizeRegistry;
//# sourceMappingURL=WorldSizeRegistry.js.map