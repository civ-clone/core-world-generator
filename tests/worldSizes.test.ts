import WorldSize from '../WorldSize';
import WorldSizeRegistry from '../WorldSizeRegistry';
import { expect } from 'chai';

describe('WorldSize', (): void => {
  it('holds its dimensions, grid and civilizations', (): void => {
    const size = new WorldSize('normal', 50, 80, {
      topologyId: 'staggered-iso',
      minPlayers: 3,
      maxPlayers: 7,
      players: 7,
    });

    expect(size.key()).equal('normal');
    expect(size.width()).equal(50);
    expect(size.height()).equal(80);
    expect(size.topologyId()).equal('staggered-iso');
    expect(size.minPlayers()).equal(3);
    expect(size.maxPlayers()).equal(7);
    expect(size.players()).equal(7);
    expect(size.earth()).false;
  });

  it('says whether there is an Earth map its size', (): void => {
    expect(
      new WorldSize('large', 75, 120, {
        topologyId: 'staggered-iso',
        minPlayers: 3,
        maxPlayers: 7,
        players: 7,
        earth: true,
      }).earth()
    ).true;
  });

  it('refuses a default number of civilizations outside its range', (): void => {
    expect(
      () =>
        new WorldSize('small', 40, 50, {
          topologyId: 'staggered-iso',
          minPlayers: 3,
          maxPlayers: 7,
          players: 8,
        })
    ).throw(RangeError);
  });
});

describe('WorldSizeRegistry', (): void => {
  it('lists sizes in the order they were registered', (): void => {
    const registry = new WorldSizeRegistry(),
      sizes = ['small', 'normal', 'large'].map(
        (key, index) =>
          new WorldSize(key, 10 * (index + 1), 20 * (index + 1), {
            topologyId: 'square',
            minPlayers: 1,
            maxPlayers: 2,
            players: 2,
          })
      );

    registry.register(...sizes);

    expect(registry.entries()).eql(sizes);
  });

  it('has no custom limits until they are set', (): void => {
    const registry = new WorldSizeRegistry(),
      limits = {
        minWidth: 20,
        maxWidth: 250,
        minHeight: 20,
        maxHeight: 250,
        minArea: 1000,
        maxArea: 10000,
      };

    expect(registry.customLimits()).null;

    registry.setCustomLimits(limits);

    expect(registry.customLimits()).eql(limits);

    registry.setCustomLimits(null);

    expect(registry.customLimits()).null;
  });

  it('accepts only world sizes', (): void => {
    expect(() => new WorldSizeRegistry().register({} as WorldSize)).throw();
  });
});
