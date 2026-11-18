import { TopologyId } from '@civ-clone/core-world/topologies';
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
/** Throws a `RangeError`, naming `what`, unless `value` is a whole number of at least `minimum`. */
export declare const checkWhole: (
  what: string,
  name: string,
  value: number,
  minimum: number
) => void;
/** Throws a `RangeError`, naming `what`, unless `topologyId` is one of core-world's grids. */
export declare const checkTopologyId: (
  what: string,
  topologyId: string
) => void;
/**
 * Throws a `RangeError`, naming `what`, unless `topologyId`'s grid can be `width` by `height` (`createTopology`): the
 *  staggered and hexagonal grids need an even height.
 */
export declare const checkBuildable: (
  what: string,
  topologyId: TopologyId,
  width: number,
  height: number
) => void;
/** Throws a `RangeError`, naming `what`, unless `range` is whole numbers, `minPlayers` ≥ 1, with `players` within. */
export declare const checkPlayerRange: (
  what: string,
  { minPlayers, maxPlayers, players }: PlayerRange
) => void;
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
  topologyId(): TopologyId;
  width(): number;
}
export default WorldSize;
