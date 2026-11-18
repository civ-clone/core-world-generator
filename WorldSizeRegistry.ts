import {
  EntityRegistry,
  IEntityRegistry,
} from '@civ-clone/core-registry/EntityRegistry';
import WorldSize from './WorldSize';

/** The bounds a world size typed in must be within, each inclusive. */
export interface CustomWorldSizeLimits {
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
  setCustomLimits(limits: CustomWorldSizeLimits | null): void;
}

/**
 * The world sizes a ruleset offers a new game, smallest first as they are registered, and the bounds of a size typed in
 *  instead. A ruleset that registers none leaves the choice to whatever starts the game.
 */
export class WorldSizeRegistry
  extends EntityRegistry<WorldSize>
  implements IWorldSizeRegistry
{
  private _customLimits: CustomWorldSizeLimits | null = null;

  constructor() {
    super(WorldSize);
  }

  /** The bounds of a size typed in, or `null` when the ruleset sets none. */
  customLimits(): CustomWorldSizeLimits | null {
    return this._customLimits;
  }

  setCustomLimits(limits: CustomWorldSizeLimits | null): void {
    this._customLimits = limits;
  }
}

export const instance: WorldSizeRegistry = new WorldSizeRegistry();

export default WorldSizeRegistry;
