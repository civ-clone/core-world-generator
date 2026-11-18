"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldSize = exports.checkPlayerRange = exports.checkBuildable = exports.checkTopologyId = exports.checkWhole = void 0;
const topologies_1 = require("@civ-clone/core-world/topologies");
// The checks below are shared with `WorldSizeRegistry`, not meant for anything else.
/** Throws a `RangeError`, naming `what`, unless `value` is a whole number of at least `minimum`. */
const checkWhole = (what, name, value, minimum) => {
    if (!Number.isInteger(value) || value < minimum) {
        throw new RangeError(`${what}: ${name} (${value}) must be a whole number of at least ${minimum}.`);
    }
};
exports.checkWhole = checkWhole;
/** Throws a `RangeError`, naming `what`, unless `topologyId` is one of core-world's grids. */
const checkTopologyId = (what, topologyId) => {
    if (!topologies_1.topologyIds.includes(topologyId)) {
        throw new RangeError(`${what}: topologyId '${topologyId}' isn't one of ${topologies_1.topologyIds
            .map((id) => `'${id}'`)
            .join(', ')}.`);
    }
};
exports.checkTopologyId = checkTopologyId;
/**
 * Throws a `RangeError`, naming `what`, unless `topologyId`'s grid can be `width` by `height` (`createTopology`): the
 *  staggered and hexagonal grids need an even height.
 */
const checkBuildable = (what, topologyId, width, height) => {
    try {
        (0, topologies_1.createTopology)(topologyId, width, height);
    }
    catch (error) {
        throw new RangeError(`${what}: a '${topologyId}' world can't be ${width} by ${height}: ${error.message}`);
    }
};
exports.checkBuildable = checkBuildable;
/** Throws a `RangeError`, naming `what`, unless `range` is whole numbers, `minPlayers` ≥ 1, with `players` within. */
const checkPlayerRange = (what, { minPlayers, maxPlayers, players }) => {
    (0, exports.checkWhole)(what, 'minPlayers', minPlayers, 1);
    (0, exports.checkWhole)(what, 'maxPlayers', maxPlayers, minPlayers);
    (0, exports.checkWhole)(what, 'players', players, minPlayers);
    if (players > maxPlayers) {
        throw new RangeError(`${what}: players (${players}) must be from minPlayers (${minPlayers}) to maxPlayers (${maxPlayers}).`);
    }
};
exports.checkPlayerRange = checkPlayerRange;
/**
 * One of the world sizes a ruleset offers a new game, by `key` (`'small'`, `'normal'`…): `width` squares across and
 *  `height` down on its grid, and the numbers of civilizations it is offered with.
 */
class WorldSize {
    constructor(key, width, height, { topologyId, minPlayers, maxPlayers, players, earth = false, }) {
        const what = `WorldSize '${key}'`;
        (0, exports.checkWhole)(what, 'width', width, 1);
        (0, exports.checkWhole)(what, 'height', height, 1);
        (0, exports.checkTopologyId)(what, topologyId);
        (0, exports.checkBuildable)(what, topologyId, width, height);
        (0, exports.checkPlayerRange)(what, { minPlayers, maxPlayers, players });
        this._earth = earth;
        this._height = height;
        this._key = key;
        this._maxPlayers = maxPlayers;
        this._minPlayers = minPlayers;
        this._players = players;
        this._topologyId = topologyId;
        this._width = width;
    }
    earth() {
        return this._earth;
    }
    height() {
        return this._height;
    }
    key() {
        return this._key;
    }
    maxPlayers() {
        return this._maxPlayers;
    }
    minPlayers() {
        return this._minPlayers;
    }
    players() {
        return this._players;
    }
    topologyId() {
        return this._topologyId;
    }
    width() {
        return this._width;
    }
}
exports.WorldSize = WorldSize;
exports.default = WorldSize;
//# sourceMappingURL=WorldSize.js.map