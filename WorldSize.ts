export interface WorldSizeOptions {
  /** The grid the size is for: one of core-world's `topologyIds`. */
  topologyId: string;
  /** The fewest civilizations a game this size is offered with. */
  minPlayers: number;
  /** The most civilizations a game this size is offered with. */
  maxPlayers: number;
  /** How many civilizations a game this size starts with, unless another number is chosen. */
  players: number;
  /** Whether there is an Earth map this size. */
  earth?: boolean;
}

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
  private _topologyId: string;
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
    if (!(minPlayers <= players && players <= maxPlayers)) {
      throw new RangeError(
        `WorldSize '${key}': players (${players}) must be from minPlayers (${minPlayers}) to maxPlayers (${maxPlayers}).`
      );
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

  topologyId(): string {
    return this._topologyId;
  }

  width(): number {
    return this._width;
  }
}

export default WorldSize;
