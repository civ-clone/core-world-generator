import {
  EntityRegistry,
  IEntityRegistry,
} from '@civ-clone/core-registry/EntityRegistry';
import WorldSize, { PlayerRange } from './WorldSize';
import { TopologyId } from '@civ-clone/core-world/topologies';
/**
 * A world size typed in instead of one of the sizes: the grid it's on, the bounds it must be within (each inclusive), and
 *  the numbers of civilizations a game that size is offered with. A size typed in must also be one its grid can be
 *  (`createTopology`): an even height on the staggered and hexagonal grids.
 */
export interface CustomWorldSizeLimits extends PlayerRange {
  topologyId: TopologyId;
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
  /** The fewest squares, `width × height`. */
  minArea: number;
  /** The most squares, `width × height`. */
  maxArea: number;
}
export interface IWorldSizeRegistry extends IEntityRegistry<WorldSize> {
  customLimits(): CustomWorldSizeLimits | null;
  getByKey(key: string): WorldSize | null;
  setCustomLimits(limits: CustomWorldSizeLimits | null): void;
}
/**
 * The world sizes a ruleset offers a new game, in the order they're registered, each with its own key, and what a size
 *  typed in instead may be. A ruleset that registers none leaves the choice to whatever starts the game.
 */
export declare class WorldSizeRegistry
  extends EntityRegistry<WorldSize>
  implements IWorldSizeRegistry
{
  private _customLimits;
  constructor();
  /** What a size typed in may be, or `null` when the ruleset doesn't say. */
  customLimits(): CustomWorldSizeLimits | null;
  getByKey(key: string): WorldSize | null;
  /** Refuses a size whose key is already registered, or two with the same key. */
  register(...sizes: WorldSize[]): void;
  /**
   * Refuses bounds that aren't whole numbers of at least 1, whose minimum is above their maximum, that their grid can't
   *  be, or that no size can meet.
   */
  setCustomLimits(limits: CustomWorldSizeLimits | null): void;
}
export declare const instance: WorldSizeRegistry;
export default WorldSizeRegistry;
