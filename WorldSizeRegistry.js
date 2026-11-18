"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = exports.WorldSizeRegistry = void 0;
const EntityRegistry_1 = require("@civ-clone/core-registry/EntityRegistry");
const WorldSize_1 = require("./WorldSize");
/**
 * The world sizes a ruleset offers a new game, smallest first as they are registered, and the bounds of a size typed in
 *  instead. A ruleset that registers none leaves the choice to whatever starts the game.
 */
class WorldSizeRegistry extends EntityRegistry_1.EntityRegistry {
    constructor() {
        super(WorldSize_1.default);
        this._customLimits = null;
    }
    /** The bounds of a size typed in, or `null` when the ruleset sets none. */
    customLimits() {
        return this._customLimits;
    }
    setCustomLimits(limits) {
        this._customLimits = limits;
    }
}
exports.WorldSizeRegistry = WorldSizeRegistry;
exports.instance = new WorldSizeRegistry();
exports.default = WorldSizeRegistry;
//# sourceMappingURL=WorldSizeRegistry.js.map