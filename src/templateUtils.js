var PREFIX = 'PLACEHOLDER_';

export function joinWithPlaceholders({raw: strings}, values) {
  var result = '';
  var map = {};
  for (var i=0; i<values.length; i++) {
    result += strings[i];
    var placeholder = PREFIX + i;
    result += placeholder;
    map[placeholder] = values[i];
  }
  result += strings[strings.length - 1];
  return {string: result, map};
}
