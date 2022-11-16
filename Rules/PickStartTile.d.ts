import Player from '@civ-clone/core-player/Player';
import Rule from '@civ-clone/core-rule/Rule';
import Tile from '@civ-clone/core-world/Tile';
import World from '@civ-clone/core-world/World';
export declare class PickStartTile extends Rule<
  [World, Player, Tile[]],
  Tile
> {}
export default PickStartTile;
