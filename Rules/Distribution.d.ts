import { IRuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import Rule from '@civ-clone/core-rule/Rule';
import Terrain from '@civ-clone/core-terrain/Terrain';
export declare type IDistribution = {
  cluster?: boolean;
  clusterChance?: number;
  coverage?: number;
  fill?: boolean;
  from?: number;
  path?: boolean;
  pathChance?: number;
  to?: number;
};
export declare class Distribution extends Rule<
  [typeof Terrain, Terrain[]],
  IDistribution[]
> {}
export default Distribution;
export interface IDistributionRegistry
  extends IRuleRegistry<
    Distribution,
    [typeof Terrain, Terrain[]],
    IDistribution[]
  > {}
