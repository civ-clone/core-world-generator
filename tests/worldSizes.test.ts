import WorldSize, { WorldSizeOptions } from '../WorldSize';
import WorldSizeRegistry, {
  CustomWorldSizeLimits,
  instance,
} from '../WorldSizeRegistry';
import { expect } from 'chai';

const options: WorldSizeOptions = {
    topologyId: 'staggered-iso',
    minPlayers: 3,
    maxPlayers: 7,
    players: 7,
  },
  limits: CustomWorldSizeLimits = {
    topologyId: 'staggered-iso',
    minWidth: 20,
    maxWidth: 250,
    minHeight: 20,
    maxHeight: 250,
    minArea: 1000,
    maxArea: 10000,
    minPlayers: 3,
    maxPlayers: 7,
    players: 7,
  };

describe('WorldSize', (): void => {
  it('holds its dimensions, grid and civilizations', (): void => {
    const size = new WorldSize('normal', 50, 80, options);

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
    expect(new WorldSize('large', 75, 120, { ...options, earth: true }).earth())
      .true;
  });

  (
    [
      ['a width of 0', [0, 80, {}]],
      ['a negative height', [50, -2, {}]],
      ['a fractional width', [50.5, 80, {}]],
      ['a height that is NaN', [50, NaN, {}]],
      ['an unknown grid', [50, 80, { topologyId: 'staggerd-iso' }]],
      ['an odd height on the staggered grid', [50, 81, {}]],
      [
        'an odd height on the hexagonal grid',
        [74, 55, { topologyId: 'hex-odd-r' }],
      ],
      ['no civilizations at least', [50, 80, { minPlayers: 0 }]],
      ['fewer at most than at least', [50, 80, { maxPlayers: 2 }]],
      ['a default above the most', [50, 80, { players: 8 }]],
      ['a default below the fewest', [50, 80, { players: 2 }]],
      ['a fractional default', [50, 80, { players: 4.5 }]],
    ] as [string, [number, number, Partial<WorldSizeOptions>]][]
  ).forEach(([name, [width, height, changes]]): void => {
    it(`refuses ${name}`, (): void => {
      expect(
        () =>
          new WorldSize('small', width, height, {
            ...options,
            ...changes,
          } as WorldSizeOptions)
      ).throw(RangeError);
    });
  });
});

describe('WorldSizeRegistry', (): void => {
  it('lists sizes in the order they were registered, and finds each by key', (): void => {
    const registry = new WorldSizeRegistry(),
      sizes = ['small', 'normal', 'large'].map(
        (key, index) =>
          new WorldSize(key, 10 * (index + 1), 20 * (index + 1), options)
      );

    registry.register(...sizes);

    expect(registry.entries()).eql(sizes);
    expect(registry.getByKey('normal')).equal(sizes[1]);
    expect(registry.getByKey('huge')).null;
  });

  it('refuses a second size with a key already registered', (): void => {
    const registry = new WorldSizeRegistry(),
      normal = new WorldSize('normal', 50, 80, options);

    registry.register(normal);

    expect(() =>
      registry.register(new WorldSize('normal', 40, 100, options))
    ).throw(TypeError);
    expect(() =>
      new WorldSizeRegistry().register(
        new WorldSize('small', 40, 50, options),
        new WorldSize('small', 40, 50, options)
      )
    ).throw(TypeError);

    // The same size again is left as it is, as any registry leaves it.
    registry.register(normal);

    expect(registry.entries()).eql([normal]);
  });

  it('has no custom limits until they are set', (): void => {
    const registry = new WorldSizeRegistry();

    expect(registry.customLimits()).null;

    registry.setCustomLimits(limits);

    expect(registry.customLimits()).eql(limits);

    registry.setCustomLimits(null);

    expect(registry.customLimits()).null;
  });

  (
    [
      ['a minimum above its maximum', { minWidth: 300 }],
      ['a bound of 0', { minHeight: 0 }],
      ['a fractional bound', { maxArea: 1000.5 }],
      ['an unknown grid', { topologyId: 'hex' }],
      ['a default above the most civilizations', { players: 8 }],
      ['fewer civilizations at most than at least', { maxPlayers: 2 }],
      ['a fractional fewest civilizations', { minPlayers: 2.5 }],
      ['an odd least height on the staggered grid', { minHeight: 21 }],
      ['an odd most height on the staggered grid', { maxHeight: 249 }],
      [
        'more squares at least than the largest size has',
        { minWidth: 10, maxWidth: 20, minHeight: 10, maxHeight: 20 },
      ],
      ['fewer squares at most than the smallest size has', { maxArea: 300 }],
    ] as [string, Partial<CustomWorldSizeLimits>][]
  ).forEach(([name, changes]): void => {
    it(`refuses custom limits with ${name}`, (): void => {
      expect(() =>
        new WorldSizeRegistry().setCustomLimits({
          ...limits,
          ...changes,
        } as CustomWorldSizeLimits)
      ).throw(RangeError);
    });
  });

  it('keeps its own copy of the custom limits', (): void => {
    const registry = new WorldSizeRegistry(),
      given = { ...limits };

    registry.setCustomLimits(given);
    given.minWidth = -5;

    expect(registry.customLimits()!.minWidth).equal(20);
  });

  it('lists the same size registered twice in one call once', (): void => {
    const registry = new WorldSizeRegistry(),
      size = new WorldSize('normal', 50, 80, options);

    registry.register(size, size);

    expect(registry.entries()).eql([size]);
  });

  it('accepts only world sizes', (): void => {
    expect(() => new WorldSizeRegistry().register({} as WorldSize)).throw();
  });

  it('has a shared instance', (): void => {
    expect(instance).instanceOf(WorldSizeRegistry);
  });
});
