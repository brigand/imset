import {joinWithPlaceholders} from './templateUtils';
import process from './process';

module.exports = function imset(strings, ...values) {
  var {string, map} = joinWithPlaceholders(strings, values);
  var stuff = process(string);
  var {propertyAccess} = stuff;

  // clone along the path
  var last = clone(values[0]);
  var result = last;
  // note: index starts at 1
  for (var i=1; i<propertyAccess.length; i++) {
    var key = propertyAccess[i];
    if (map[key]) {
      key = map[key];
    }
    if (i === propertyAccess.length - 1 && stuff.type === 'set') {
      break;
    }
    last[key] = clone(last[key]);
    last = last[key];
  }

  if (stuff.type === 'set') {
    var lastProperty = propertyAccess[propertyAccess.length - 1];
    var value;

    // we don't need the value for increment/decrement
    if (stuff.operator !== '++' && stuff.operator !== '--') {
      value = stringToValue(stuff.value, map);
    }

    switch (stuff.operator) {
      case '=': last[lastProperty] = value; break;
      case '+=': last[lastProperty] += value; break;
      case '-=': last[lastProperty] -= value; break;
      case '*=': last[lastProperty] *= value; break;
      case '/=': last[lastProperty] /= value; break;
      case '++': last[lastProperty]++; break;
      case '--': last[lastProperty]--; break;
    }
  }

  if (stuff.type === 'call') {
    var args = stuff.methodArguments.map((x) => stringToValue(x, map));
    last[stuff.method].apply(last, args);
  }

  return result;
}

function clone(x) {
  if (Array.isArray(x)) {
    return x.slice();
  }
  else if (typeof x === 'object' && x !== null) {
    return Object.assign({}, x);
  }
  else {
    throw new TypeError('cannot clone ' + JSON.stringify(x));
  }
}

function stringToValue(string, namesToValues) {
  function fail() {
    throw new Error('Could not parse literal token: ' + string);
  }

  if (namesToValues[string] !== undefined) {
    return namesToValues[string];
  }

  if (string && !isNaN(parseFloat(string))) {
    return parseFloat(string);
  }

  if (string === '[]') {
    return [];
  }
  else if (string[0] === '[') {
    throw new Error('only a literal [] is supported, with no items');
  }

  if (string === '{}') {
    return {};
  }
  else if (string[0] === '{') {
    throw new Error('only a literal {} is supported, with no properties');
  }

  var first = string[0];
  var last = string[string.length - 1];
  var middle = string.slice(1, -1);
  if (first === '"' || first === '\'' && first === last) {
    if (first === '\'') {
      var json = '"' + middle.replace(/"/g, '\\"') + '"';
      try {
        return JSON.parse(json);
      }
      catch (e) {
        fail();
      }
    }
  }
  fail();
}


