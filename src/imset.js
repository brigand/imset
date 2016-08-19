import {joinWithPlaceholders} from './templateUtils';
import process from './process';

module.exports = function imset(strings, ...values) {
  var {strng, map} = joinWithPlaceholders(strings, values);
  return {x: 2};
}

