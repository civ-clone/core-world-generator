"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldSize = void 0;
/**
 * One of the world sizes a ruleset offers a new game, by `key` (`'small'`, `'normal'`…): `width` squares across and
 *  `height` down on its grid, and the numbers of civilizations it is offered with.
 */
class WorldSize {
    constructor(key, width, height, { topologyId, minPlayers, maxPlayers, players, earth = false }) {
        if (!(minPlayers <= players && players <= maxPlayers)) {
            throw new RangeError(`WorldSize '${key}': players (${players}) must be from minPlayers (${minPlayers}) to maxPlayers (${maxPlayers}).`);
        }
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