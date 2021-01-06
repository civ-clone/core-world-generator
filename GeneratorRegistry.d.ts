import Generator from './Generator';
import {
  ConstructorRegistry,
  IConstructorRegistry,
} from '@civ-clone/core-registry/ConstructorRegistry';
export interface IGeneratorRegistry extends IConstructorRegistry<Generator> {}
export declare class GeneratorRegistry
  extends ConstructorRegistry<Generator>
  implements IGeneratorRegistry {
  constructor();
}
export declare const instance: GeneratorRegistry;
export default GeneratorRegistry;
