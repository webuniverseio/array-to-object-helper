module.exports = AtoO;

function AtoO(format) {
  let input;
  if (arguments.length === 2) {
    input = arguments[0];
    format = arguments[1];
  }

  if (!Array.isArray(format)) {
    throw new Error('AtoO(format), format is not an array');
  } else if (!format.length) {
    throw new Error('AtoO should have at least 1 key');
  }

  return arguments.length === 2 ? AtoOFromInput(input) : AtoOFromInput;

  function AtoOFromInput(input) {
    if (!Array.isArray(input)) {
      throw new Error('AtoO(format)(input), input is not an array');
    } else if (input.length !== format.length) {
      throw new Error('AtoO should have ' + input.length + ' keys, but got `{' + format.join(', ') + '}`');
    }
    return format
      .map((key, i) => [key, input[i]])
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
  }
}

AtoO.to = function ([format]) {
  if (![/^{/, /}$/].every(regex => regex.test(format))) {
    throw new Error('AtoO.to should be defined as an object like `{a, b}`, instead got `' + format + '`');
  }

  const arrayFormat =
    format
    .replace(/^{|}$/g, '')
    .split(',')
    .filter(x => x)
    .map(x => x.trim());
  return AtoO(arrayFormat);
};