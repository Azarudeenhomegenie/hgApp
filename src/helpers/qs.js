const qs = require('qs')
// Constants
const DEFAULT_PARSE_OPTIONS = {
  ignoreQueryPrefix: true,
}
const DEFAULT_STRINGIFY_OPTIONS = {
  arrayFormat: 'repeat',
}

module.exports = {
  ...qs,
  parse: (str, options, ...restArgs) => qs.parse(
    str,
    { ...DEFAULT_PARSE_OPTIONS, ...options },
    ...restArgs,
  ),
  stringify: (value, options, ...restArgs) => qs.stringify(
    value,
    { ...DEFAULT_STRINGIFY_OPTIONS, ...options },
    ...restArgs,
  ),
}
