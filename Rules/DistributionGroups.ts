import { IRuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import Rule from '@civ-clone/core-rule/Rule';
import Terrain from '@civ-clone/core-terrain/Terrain';

export class DistributionGroups extends Rule<[], typeof Terrain[]> {}

export default DistributionGroups;

export interface IDistributionGroupsRegistry
  extends IRuleRegistry<DistributionGroups, [], typeof Terrain[]> {}
