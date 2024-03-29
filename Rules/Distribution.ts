import Rule from '@civ-clone/core-rule/Rule';
import Terrain from '@civ-clone/core-terrain/Terrain';

export type IDistribution = {
  cluster?: boolean;
  clusterChance?: number;
  coverage?: number;
  fill?: boolean;
  from?: number;
  path?: boolean;
  pathChance?: number;
  to?: number;
};

export class Distribution extends Rule<
  [typeof Terrain, Terrain[]],
  IDistribution[]
> {}

export default Distribution;
