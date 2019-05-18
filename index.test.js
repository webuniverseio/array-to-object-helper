describe('Array to Object', () => {
  const AtoO = require('./');
  const {to} = require('./');
  const input123 = [1, 2, 3];

  test('GIVEN format OR input are not arrays THEN throw', () => {
    expect(() => AtoO()())
      .toThrow('AtoO(format), format is not an array');
    expect(() => AtoO(['a'])())
      .toThrow('AtoO(format)(input), input is not an array');
  });
  test('GIVEN X keys WHEN input.length = X THEN return object', () => {
    expect(AtoO(['one', 'two', 'three'])(input123))
      .toEqual({one: 1, two: 2, three: 3});
  });
  test('GIVEN 0 keys WHEN input.length = 0 THEN throw', () => {
    expect(() => AtoO([])([]))
      .toThrow('AtoO should have at least 1 key');
  });
  test('GIVEN X keys WHEN input.length = Y THEN throw', () => {
    expect(() => AtoO(['one', 'two'])(input123))
      .toThrow('AtoO should have 3 keys, but got `{one, two}`');
    expect(() => AtoO([])(input123))
      .toThrow('AtoO should have at least 1 key');
  });
  test('GIVEN 2 arguments are passed THEN treat first argument as array, second as format', () => {
    expect(AtoO(input123, ['a', 'b', 'c']))
    .toEqual({a: 1, b: 2, c: 3});
  });
  test('GIVEN .to() is used AND X keys WHEN input.length = X THEN return object', () => {
    expect(toFormat(input123, to`{one, two, three}`))
      .toEqual({one: 1, two: 2, three: 3});

    expect(toFormat(input123, to`{
      $,2,
      x-three
    }`)).toEqual({$: 1, 2: 2, 'x-three': 3});

    expect(toFormat([1], to`{one,}`)).toEqual({one: 1});
    expect(toFormat([1], to`{one two three}`)).toEqual({'one two three': 1});
  });
  test('GIVEN .to() is used AND X keys WHEN input.length = Y THEN throw', () => {
    expect(() => toFormat(input123, to`{one, x-two,}`))
      .toThrow('AtoO should have 3 keys, but got `{one, x-two}`');
  });
  test('GIVEN .to() is used WHEN format is wrong THEN throw', () => {
    expect(() => toFormat(input123, to`one, x-two`))
      .toThrow('AtoO.to should be defined as an object like `{a, b}`, instead got `one, x-two`');
  });

  function toFormat(input, toFn) {
    return [input].map(toFn)[0];
  }
});