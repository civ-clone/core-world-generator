import {
  EntityRegistry,
  IEntityRegistry,
} from '@civ-clone/core-registry/EntityRegistry';
import WorldSize, {
  PlayerRange,
  checkPlayerRange,
  checkTopologyId,
  checkWhole,
} from './WorldSize';
import { TopologyId } from '@civ-clone/core-world/topologies';

/**
 * A world size typed in instead of one of the sizes: the grid it's on, the bounds it must be within (each inclusive), and
 *  the numbers of civilizations a game that size is offered with.
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
export class WorldSizeRegistry
  extends EntityRegistry<WorldSize>
  implements IWorldSizeRegistry
{
  private _customLimits: CustomWorldSizeLimits | null = null;

  constructor() {
    super(WorldSize);
  }

  /** What a size typed in may be, or `null` when the ruleset doesn't say. */
  customLimits(): CustomWorldSizeLimits | null {
    return this._customLimits;
  }

  getByKey(key: string): WorldSize | null {
    return this.entries().find((size) => size.key() === key) ?? null;
  }

  /** Refuses a size whose key is already registered, or two with the same key. */
  register(...sizes: WorldSize[]): void {
    sizes.forEach((size, index) => {
      const existing = this.getByKey(size.key());

      if (
        (existing !== null && existing !== size) ||
        sizes.some(
          (other, otherIndex) =>
            otherIndex < index && other !== size && other.key() === size.key()
        )
      ) {
        throw new TypeError(
          `WorldSizeRegistry: a size '${size.key()}' is already registered.`
        );
      }
    });

    super.register(...sizes);
  }

  /** Refuses bounds that aren't whole numbers of at least 1, or whose minimum is above their maximum. */
  setCustomLimits(limits: CustomWorldSizeLimits | null): void {
    if (limits !== null) {
      const what = 'WorldSizeRegistry custom limits';

      checkTopologyId(what, limits.topologyId);
      checkPlayerRange(what, limits);

      (['Width', 'Height', 'Area'] as const).forEach((name) => {
        checkWhole(what, `min${name}`, limits[`min${name}`], 1);
        checkWhole(
          what,
          `max${name}`,
          limits[`max${name}`],
          limits[`min${name}`]
        );
      });
    }

    this._customLimits = limits;
  }
}

export const instance: WorldSizeRegistry = new WorldSizeRegistry();

export default WorldSizeRegistry;
