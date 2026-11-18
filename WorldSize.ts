import {
  TopologyId,
  createTopology,
  topologyIds,
} from '@civ-clone/core-world/topologies';

/** The numbers of civilizations a game is offered with. */
export interface PlayerRange {
  /** The fewest civilizations, at least 1. */
  minPlayers: number;
  /** The most civilizations. */
  maxPlayers: number;
  /** How many civilizations a game starts with, unless another number is chosen. */
  players: number;
}

export interface WorldSizeOptions extends PlayerRange {
  /** The grid the size is for: one of core-world's `topologyIds`. */
  topologyId: TopologyId;
  /** Whether there is an Earth map this size. */
  earth?: boolean;
}

// The checks below are shared with `WorldSizeRegistry`, not meant for anything else.

/** Throws a `RangeError`, naming `what`, unless `value` is a whole number of at least `minimum`. */
export const checkWhole = (
  what: string,
  name: string,
  value: number,
  minimum: number
): void => {
  if (!Number.isInteger(value) || value < minimum) {
    throw new RangeError(
      `${what}: ${name} (${value}) must be a whole number of at least ${minimum}.`
    );
  }
};

/** Throws a `RangeError`, naming `what`, unless `topologyId` is one of core-world's grids. */
export const checkTopologyId = (what: string, topologyId: string): void => {
  if (!topologyIds.includes(topologyId as TopologyId)) {
    throw new RangeError(
      `${what}: topologyId '${topologyId}' isn't one of ${topologyIds
        .map((id) => `'${id}'`)
        .join(', ')}.`
    );
  }
};

/**
 * Throws a `RangeError`, naming `what`, unless `topologyId`'s grid can be `width` by `height` (`createTopology`): the
 *  staggered and hexagonal grids need an even height.
 */
export const checkBuildable = (
  what: string,
  topologyId: TopologyId,
  width: number,
  height: number
): void => {
  try {
    createTopology(topologyId, width, height);
  } catch (error) {
    throw new RangeError(
      `${what}: a '${topologyId}' world can't be ${width} by ${height}: ${
        (error as Error).message
      }`
    );
  }
};

/** Throws a `RangeError`, naming `what`, unless `range` is whole numbers, `minPlayers` ≥ 1, with `players` within. */
export const checkPlayerRange = (
  what: string,
  { minPlayers, maxPlayers, players }: PlayerRange
): void => {
  checkWhole(what, 'minPlayers', minPlayers, 1);
  checkWhole(what, 'maxPlayers', maxPlayers, minPlayers);
  checkWhole(what, 'players', players, minPlayers);

  if (players > maxPlayers) {
    throw new RangeError(
      `${what}: players (${players}) must be from minPlayers (${minPlayers}) to maxPlayers (${maxPlayers}).`
    );
  }
};

/**
 * One of the world sizes a ruleset offers a new game, by `key` (`'small'`, `'normal'`…): `width` squares across and
 *  `height` down on its grid, and the numbers of civilizations it is offered with.
 */
export class WorldSize {
  private _earth: boolean;
  private _height: number;
  private _key: string;
  private _maxPlayers: number;
  private _minPlayers: number;
  private _players: number;
  private _topologyId: TopologyId;
  private _width: number;

  constructor(
    key: string,
    width: number,
    height: number,
    {
      topologyId,
      minPlayers,
      maxPlayers,
      players,
      earth = false,
    }: WorldSizeOptions
  ) {
    const what = `WorldSize '${key}'`;

    if (typeof key !== 'string' || key.trim() === '') {
      throw new RangeError(`${what}: the key must be a word.`);
    }

    checkWhole(what, 'width', width, 1);
    checkWhole(what, 'height', height, 1);
    checkTopologyId(what, topologyId);
    checkBuildable(what, topologyId, width, height);
    checkPlayerRange(what, { minPlayers, maxPlayers, players });

    this._earth = earth;
    this._height = height;
    this._key = key;
    this._maxPlayers = maxPlayers;
    this._minPlayers = minPlayers;
    this._players = players;
    this._topologyId = topologyId;
    this._width = width;
  }

  earth(): boolean {
    return this._earth;
  }

  height(): number {
    return this._height;
  }

  key(): string {
    return this._key;
  }

  maxPlayers(): number {
    return this._maxPlayers;
  }

  minPlayers(): number {
    return this._minPlayers;
  }

  players(): number {
    return this._players;
  }

  topologyId(): TopologyId {
    return this._topologyId;
  }

  width(): number {
    return this._width;
  }
}

export default WorldSize;
