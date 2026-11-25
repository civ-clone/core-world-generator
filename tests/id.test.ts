import Generator from '../Generator';
import { expect } from 'chai';

describe('Generator#id', (): void => {
  it('is null for a generator that says nothing of itself', (): void => {
    expect(new Generator(4, 4).id()).null;
  });

  it('is what a subclass says', (): void => {
    class Named extends Generator {
      id(): string | null {
        return 'named';
      }
    }

    expect(new Named(4, 4).id()).equal('named');
  });
});
