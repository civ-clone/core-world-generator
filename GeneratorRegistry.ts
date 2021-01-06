import Generator from './Generator';
import {
  ConstructorRegistry,
  IConstructorRegistry,
} from '@civ-clone/core-registry/ConstructorRegistry';

export interface IGeneratorRegistry extends IConstructorRegistry<Generator> {}

export class GeneratorRegistry
  extends ConstructorRegistry<Generator>
  implements IGeneratorRegistry {
  constructor() {
    super(Generator);
  }
}

export const instance: GeneratorRegistry = new GeneratorRegistry();

export default GeneratorRegistry;
