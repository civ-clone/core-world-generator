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
export declare class WorldSize {
  private _earth;
  private _height;
  private _key;
  private _maxPlayers;
  private _minPlayers;
  private _players;
  private _topologyId;
  private _width;
  constructor(
    key: string,
    width: number,
    height: number,
    { topologyId, minPlayers, maxPlayers, players, earth }: WorldSizeOptions
  );
  earth(): boolean;
  height(): number;
  key(): string;
  maxPlayers(): number;
  minPlayers(): number;
  players(): number;
  topologyId(): string;
  width(): number;
}
export default WorldSize;
